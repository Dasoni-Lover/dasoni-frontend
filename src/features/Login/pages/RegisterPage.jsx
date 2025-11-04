import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";
import { InputFieldWhite } from "../../../components/InputFieldWhite";
import Button from "../../../components/Button";
import profileimg from "../assets/default-profile-img.svg";
import DatePicker from "../../../components/DatePicker";
import dropdownicon from "../../../assets/row-icon.svg";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("성별을 선택해 주세요");
  const dropdownRef = useRef(null);

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
              <ProfileImg src={profileimg} />
              <SelectButton>프로필사진 설정하기</SelectButton>
            </ProfileWrapper>

            <MainWrapper>
              <Half>
                <InputBox>
                  <Type>아이디</Type>
                  <InputFieldWhite
                    placeholder="아이디를 설정해 주세요"
                    width="100%"
                  />
                </InputBox>
                <InputBox>
                  <Type>비밀번호</Type>
                  <InputFieldWhite
                    placeholder="비밀번호를 설정해 주세요"
                    width="100%"
                  />
                </InputBox>
                <InputBox>
                  <Type>비밀번호 확인</Type>
                  <InputFieldWhite
                    placeholder="비밀번호를 다시 한 번 입력해 주세요"
                    width="100%"
                  />
                </InputBox>
              </Half>

              <Half>
                <InputBox>
                  <Type>이름</Type>
                  <InputFieldWhite
                    placeholder="이름을 실명으로 입력해 주세요"
                    width="100%"
                  />
                </InputBox>

                {/* 성별 드롭다운 */}
                <InputBox ref={dropdownRef}>
                  <Type>성별</Type>
                  <DropdownContainer>
                    <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
                      <span>{selectedGender}</span>
                      <Icon src={dropdownicon} alt="dropdown icon" $isOpen={isOpen} />
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
            <Button text="회원가입" onClick={() => navigate("/loginpage")} />
            <MiniWrapper>
              <Question>이미 계정이 있으신가요?</Question>
              <RegisterButton onClick={() => navigate("/loginpage")}>
                로그인
              </RegisterButton>
            </MiniWrapper>
          </ClickBox>
        </Box>
      </OutBox>
    </Wrapper>
  );
};

export default RegisterPage;

/* ------------------- 스타일 ------------------- */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4.31rem;
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
  fill: #F2F2F2;
`;

const SelectButton = styled.div`
  color: #308dff;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
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
  border: 1px solid #A8A8A8;
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
  color: #7c7c7c;
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
