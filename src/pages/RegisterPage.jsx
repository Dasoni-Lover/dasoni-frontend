import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import { InputFieldWhite } from "../components/InputFieldWhite";
import Button from "../components/Button";
import profileimg from "../features/Onboarding/assets/default-profile-img.svg";
import DatePicker from "../components/DatePicker";
import dropdownicon from "../assets/row-icon.svg";
import { checkDuplicateId, registerUser } from "../api/user";
import { getPresignedUrlForImage, uploadFileToS3 } from "../api/files";
import ConfirmModal from "../components/ConfirmModal";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("성별을 선택해 주세요");
  const dropdownRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ 프로필 이미지 상태
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(profileimg);
  const fileInputRef = useRef(null);

  // ✅ 입력값 상태
  const [logId, setLogId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  // ✅ ID 중복확인 상태
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [hasCheckedId, setHasCheckedId] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(null);

  // ✅ 회원가입 진행 상태
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedGender(option);
    setIsOpen(false);
  };

  // 날짜 → "YYYY.MM.DD" 포맷
  const formatDate = (d) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // ✅ ID 입력 변경 시, 이전 중복확인 상태 초기화
  const handleChangeLogId = (e) => {
    setLogId(e.target.value);
    setHasCheckedId(false);
    setIsIdAvailable(null);
  };

  // ✅ 프로필 선택 핸들러
  const handleProfileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setProfileImageFile(file);

    // 미리보기용 URL
    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
  };

  // ✅ ID 중복확인 API
  const handleCheckId = async () => {
    if (!logId.trim()) {
      alert("아이디를 먼저 입력해 주세요.");
      return;
    }

    try {
      setIsCheckingId(true);
      const data = await checkDuplicateId(logId.trim()); // ← user.js 사용

      setHasCheckedId(true);
      setIsIdAvailable(data.isAvailable);
    } catch (error) {
      console.error(error);
      alert("ID 중복확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingId(false);
    }
  };

  // ✅ 회원가입 API
  const handleRegister = async () => {
    if (!logId.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    if (!hasCheckedId || isIdAvailable === false) {
      alert("아이디 중복확인을 완료해 주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }
    if (selectedGender !== "남성" && selectedGender !== "여성") {
      alert("성별을 선택해 주세요.");
      return;
    }
    if (!date) {
      alert("생일을 선택해 주세요.");
      return;
    }

    const birthday = formatDate(date);
    // true: 여자, false: 남자
    const genderBool = selectedGender === "여성";

    setIsRegistering(true);
    try {
      let myProfile = "";

      if (profileImageFile) {
        // ✅ 공용 유틸 사용
        const { uploadUrl, fileUrl, contentType } =
          await getPresignedUrlForImage(profileImageFile);

        await uploadFileToS3(uploadUrl, profileImageFile, contentType);
        myProfile = fileUrl;
      }

      const body = {
        name: name.trim(),
        gender: genderBool,
        birthday,
        logId: logId.trim(),
        password,
        myProfile,
      };

      const data = await registerUser(body); // ← user.js 사용
      console.log("register response:", data);

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      if (error.message === "이미지 업로드에 실패했습니다.") {
        alert(
          "프로필 이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요."
        );
      } else if (error.response?.data?.message) {
        alert(`회원가입 실패: ${error.response.data.message}`);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Wrapper>
      <OutBox>
        <Box>
          <TextWrapper>
            <Title>기억이 머무는 다솜 마을에 오신 걸 환영해요</Title>
            <Content>회원가입하여 추모관 서비스를 이용해 보세요</Content>
          </TextWrapper>

          <Container>
            <ProfileWrapper>
              {/* ✅ 기본 이미지는 그대로, 선택하면 preview로 변경 */}
              <ProfileImg src={profilePreview} />
              <SelectButton onClick={() => fileInputRef.current?.click()}>
                프로필사진 설정하기
              </SelectButton>
              {/* ✅ 숨겨진 파일 input (UI 안 바뀜) */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileChange}
              />
            </ProfileWrapper>

            <MainWrapper>
              <Half>
                <InputBox>
                  <Type>아이디</Type>
                  <IdCheck>
                    <InputFieldWhite
                      placeholder="아이디를 설정해 주세요"
                      width="auto"
                      value={logId}
                      onChange={handleChangeLogId}
                      border={isIdAvailable === false ? "red" : undefined}
                    />
                    <ButtonSize>
                      <Button
                        text={isCheckingId ? "확인중..." : "중복확인"}
                        size="S"
                        active={!hasCheckedId}
                        onClick={handleCheckId}
                      />
                    </ButtonSize>
                  </IdCheck>
                  {hasCheckedId ? (
                    <CheckedMessage $isAvailable={isIdAvailable}>
                      {isIdAvailable
                        ? "사용할 수 있는 아이디에요"
                        : "사용할 수 없는 아이디에요"}
                    </CheckedMessage>
                  ) : null}
                </InputBox>
                <InputBox>
                  <Type>비밀번호</Type>
                  <InputFieldWhite
                    placeholder="비밀번호를 설정해 주세요"
                    width="100%"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputBox>
                <InputBox>
                  <Type>비밀번호 확인</Type>
                  <InputFieldWhite
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    width="100%"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </InputBox>
              </Half>

              <Half>
                <InputBox>
                  <Type>이름</Type>
                  <InputFieldWhite
                    placeholder="이름을 실명으로 입력해 주세요"
                    width="100%"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputBox>

                {/* 성별 드롭다운 */}
                <InputBox ref={dropdownRef}>
                  <Type>성별</Type>
                  <DropdownContainer>
                    <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
                      <span>{selectedGender}</span>
                      <Icon
                        src={dropdownicon}
                        alt="dropdown icon"
                        $isOpen={isOpen}
                      />
                    </DropdownButton>

                    {isOpen && (
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleSelect("남성")}>
                          남성
                        </DropdownItem>
                        <DropdownItem onClick={() => handleSelect("여성")}>
                          여성
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </DropdownContainer>
                </InputBox>

                <InputBox>
                  <Type>생일</Type>
                  <DatePicker
                    selected={date}
                    onChange={setDate}
                    borderColor="#A8A8A8"
                  />
                </InputBox>
              </Half>
            </MainWrapper>
          </Container>

          <ClickBox>
            <Button
              text={isRegistering ? "회원가입 중..." : "회원가입"}
              onClick={handleRegister}
              disabled={isRegistering}
            />
            <MiniWrapper>
              <Question>이미 계정이 있으신가요?</Question>
              <RegisterButton onClick={() => navigate("/login")}>
                로그인
              </RegisterButton>
            </MiniWrapper>
          </ClickBox>
        </Box>
      </OutBox>
      <ConfirmModal
        isOpen={isSuccess}
        title="성공적으로 회원가입을 마쳤어요"
        description="다소니 마을에 오신 것을 환영해요"
        confirmText="로그인 하러가기"
        onConfirm={() => {
          navigate("/login");
        }}
      />
    </Wrapper>
  );
}

/* ------------------- 스타일 ------------------- */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4.31rem;
  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;

const OutBox = styled.div`
  display: inline-flex;
  padding: 2.1875rem 2.875rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid #f4f4f4;
  background: #f8f8f8;
`;

const Box = styled.div`
  display: flex;
  width: 51.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.75rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;
`;

const Title = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  color: #7a7a7a;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 130%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;
  align-self: stretch;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 9.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImg = styled.img`
  height: 9.375rem;
  align-self: stretch;
  aspect-ratio: 1/1;
  fill: #f2f2f2;
`;

const SelectButton = styled.div`
  color: #308dff;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const IdCheck = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.44rem;
`;

const CheckedMessage = styled.div`
  ${typo("bodym")};
  color: ${({ $isAvailable }) =>
    $isAvailable === false ? color("red") : color("black.30")};
`;

const ButtonSize = styled.div`
  width: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
`;

const Half = styled.div`
  display: flex;
  width: 24.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4375rem;
  width: 100%;
`;

const Type = styled.div`
  color: #0e0e0e;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 130%;
`;

/* 드롭다운 스타일 */
const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background: white;
  border: 1px solid #a8a8a8;
  border-radius: 6px;
  color: ${color("black.70")};
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 3.25rem;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 30%;
`;

const DropdownItem = styled.div`
  text-align: left;
  padding: 0.6rem 0.7rem;
  ${typo("bodym")};
  color: #7a7a7c;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ClickBox = styled.div`
  display: flex;
  width: 24.5rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Question = styled.div`
  color: #7a7a7a;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 130%;
`;

const RegisterButton = styled.div`
  ${typo("bodym")};
  color: #308dff;
  cursor: pointer;
`;
