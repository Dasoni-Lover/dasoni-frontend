// src/pages/RegisterPage.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import { InputFieldWhite } from "../components/InputFieldWhite";
import Button from "../components/Button";
import ImgProfile from "../features/Onboarding/assets/default-profile-img.svg";
import DatePicker from "../components/DatePicker";
import dropdownicon from "../assets/row-icon.svg";
import { checkDuplicateId, registerUser } from "../api/user";
import { getPresignedUrlForImage, uploadFileToS3 } from "../api/files";
import ConfirmModal from "../components/ConfirmModal";
import { Column } from "../styles/flex";
import { PointText } from "../components/PointText";
import ImgRainbowHouse from "../features/Onboarding/assets/img-rainbow-house.svg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("성별을 선택해 주세요");
  const dropdownRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ 프로필 이미지 상태
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(ImgProfile);
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
      const data = await checkDuplicateId(logId.trim());

      setHasCheckedId(true);
      setIsIdAvailable(data.isAvailable);
    } catch (error) {
      console.error(error);
      alert("ID 중복확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingId(false);
    }
  };

  // ✅ 비밀번호 일치 여부
  const isPasswordMatch =
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    password === passwordConfirm;

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

      const data = await registerUser(body);
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

  // 회원가입 버튼 활성화 조건
  const isFormValid =
    name.trim() &&
    logId.trim() &&
    hasCheckedId &&
    isIdAvailable === true &&
    password &&
    passwordConfirm &&
    password === passwordConfirm &&
    (selectedGender === "남성" || selectedGender === "여성") &&
    date;

  return (
    <Wrapper>
      <HouseImg src={ImgRainbowHouse} />
      <OutBox>
        <Box>
          <TextWrapper>
            <Title>회원가입</Title>
            <Content>기억이 머무는 다솜 마을에 오신 걸 환영해요</Content>
          </TextWrapper>

          <Container>
            <MainWrapper>
              <InputBox>
                <PointText question="이름" bold={true} width="8.75rem" />
                <InputFieldWhite
                  placeholder="이름을 실명으로 입력해 주세요"
                  width="100%"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputBox>

              {/* 성별 드롭다운 */}
              <InputBox ref={dropdownRef}>
                <PointText question="성별" bold={true} width="8.75rem" />
                <DropdownContainer>
                  <DropdownButton
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    $isPlaceholder={selectedGender === "성별을 선택해 주세요"} // 🔥 추가
                  >
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
                        남자
                      </DropdownItem>
                      <DropdownItem onClick={() => handleSelect("여성")}>
                        여자
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </DropdownContainer>
              </InputBox>

              {/* 생일 */}
              <InputBox>
                <PointText question="생일" bold={true} width="8.75rem" />
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  borderColor="#A8A8A8"
                  width="15.6rem"
                  maxDate={new Date()} // ✅ 오늘 이후 날짜 선택 불가
                />
              </InputBox>

              {/* 아이디 + 중복확인 + 메시지 영역 */}
              <Column style={{ width: "100%" }}>
                <InputBox>
                  <PointText question="아이디" bold={true} width="8.75rem" />
                  <InputFieldWhite
                    placeholder="아이디를 설정해 주세요"
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
                </InputBox>

                {/* 항상 일정 높이 확보 */}
                <CheckedMessagePlaceholder>
                  {hasCheckedId && (
                    <CheckedMessage $isAvailable={isIdAvailable}>
                      {isIdAvailable
                        ? "사용할 수 있는 아이디에요"
                        : "사용할 수 없는 아이디에요"}
                    </CheckedMessage>
                  )}
                </CheckedMessagePlaceholder>
              </Column>

              <InputBox>
                <PointText question="비밀번호" bold={true} width="8.75rem" />
                <InputFieldWhite
                  placeholder="비밀번호를 설정해 주세요"
                  width="100%"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputBox>

              {/* ✅ 비밀번호 확인 + 일치 메시지 영역 */}
              <Column style={{ width: "100%" }}>
                <InputBox>
                  <PointText
                    question="비밀번호 확인"
                    bold={true}
                    width="8.75rem"
                  />
                  <InputFieldWhite
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    width="100%"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </InputBox>

                {/* 항상 일정 높이 확보 */}
                <PasswordMessagePlaceholder>
                  {isPasswordMatch && (
                    <CheckedMessage $isAvailable={true}>
                      비밀번호가 일치해요
                    </CheckedMessage>
                  )}
                </PasswordMessagePlaceholder>
              </Column>

              <InputBox>
                <Type>프로필 사진</Type>
                <ProfileWrapper>
                  <ProfileImg
                    src={profilePreview}
                    onClick={() => fileInputRef.current?.click()}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleProfileChange}
                  />
                </ProfileWrapper>
              </InputBox>
            </MainWrapper>
          </Container>

          <ClickBox>
            <Button
              text={isRegistering ? "회원가입 중..." : "회원가입"}
              onClick={handleRegister}
              disabled={isRegistering}
              active={isFormValid && !isRegistering}
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto 0;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;

const HouseImg = styled.img`
  position: absolute;
  z-index: 1;
  left: -50%;
  top: 10%;
`;

const OutBox = styled.div`
  display: inline-flex;
  padding: 2.5rem 7.5rem 5rem 3.125rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px solid ${color("black.10")};
  background: #fff;
`;

const Box = styled.div`
  display: flex;
  width: 51.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.75rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;

const Title = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
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
  width: 12.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImg = styled.img`
  height: 12.5rem;
  align-self: stretch;
  aspect-ratio: 1/1;
  fill: #f2f2f2;
  cursor: pointer;
  object-fit: cover;
`;

const CheckedMessage = styled.div`
  ${typo("bodym")};
  color: ${({ $isAvailable }) =>
    $isAvailable === false ? color("red") : "#22874F"};
  margin-left: 8.75rem;
  margin-top: 0.5rem;
`;

/** ✅ 메시지 영역 높이를 항상 확보하는 래퍼 */
const CheckedMessagePlaceholder = styled.div`
  height: 1.75rem; /* 한 줄 메시지 + marginTop 감안해서 약간 넉넉하게 */
  display: flex;
  align-items: flex-start;
`;

const PasswordMessagePlaceholder = styled(CheckedMessagePlaceholder)``;

const ButtonSize = styled.div`
  width: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  align-self: stretch;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Type = styled.div`
  ${typo("bodym2")};
  color: ${color("black.70")};
  width: 8.75rem;
`;

/* 드롭다운 스타일 */
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background: white;
  border: 1px solid ${color("black.10")};
  border-radius: 6px;
  color: ${color("black.10")};
  font-size: 1rem;
  cursor: pointer;
  color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? color("black.10") : color("black.70")};
`;

const Icon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 3.25rem;
  right: 0;
  background: white;
  border: 1px solid #a8a8a8;
  border-radius: 0.25rem;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
  z-index: 10;
  width: 100%;
`;

const DropdownItem = styled.div`
  text-align: left;
  padding: 0.6rem 0.7rem;
  ${typo("bodym")};
  color: #7a7a7c;
  cursor: pointer;
  border-bottom: 1px solid #a8a8a8;

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
  margin-top: 4.75rem;
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
