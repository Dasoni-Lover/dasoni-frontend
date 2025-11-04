import styled from 'styled-components'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { color, typo } from '../../../styles/tokens'
import { InputField } from "../../../components/InputField"
import Button from "../../../components/Button"
import profileimg from "../../../assets/profile-img.png"
import DatePicker from "../../../components/DatePicker"


export const RegisterPage = () => {
  const navigate = useNavigate(); 
  const [date, setDate] = useState(null);

  return (
    <Wrapper>
      <OutBox>
        <Box>
          <TextWrapper>
            <Title>기억이 머무는 다솜 마을에 오신 걸 환영해요</Title>
            <Content>로그인하여 추모관 서비스를 이용해 보세요</Content>
          </TextWrapper>
          <Container>
          <ProfileWrapper>
            <ProfileImg src={profileimg}/>
            <SelectButton>프로필사진 설정하기</SelectButton>
          </ProfileWrapper>
          <MainWrapper>
            <Half>
              <InputBox>
              <Type>아이디</Type>
              <InputField placeholder="아이디를 설정해 주세요" width="100%" />
              </InputBox>
              <InputBox>
                <Type>비밀번호</Type>
                <InputField placeholder="비밀번호를 설정해 주세요" width="100%" />
              </InputBox>
              <InputBox>
                <Type>비밀번호 확인</Type>
                <InputField placeholder="비밀번호를 다시 한 번 입력해 주세요" width="100%" />
              </InputBox>
            </Half>
            <Half>
              <InputBox>
              <Type>이름</Type>
              <InputField placeholder="이름을 실명으로 입력해 주세요" width="100%" />
              </InputBox>
              <InputBox>
                <Type>성별</Type>
                <InputField placeholder="성별을 선택해 주세요" width="100%" />
              </InputBox>
              <InputBox>
                <Type>생일</Type>
                
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  placeholder="YYYY/M/D"
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
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4.31rem;
`

const OutBox = styled.div`
  display: inline-flex;
  padding: 2.1875rem 2.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
  border: 1px solid #f4f4f4;
  background: #f8f8f8;
`

const Box = styled.div`
  display: flex;
  width: 51.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.75rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;
`

const Title = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`

const Content = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`
const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;
  align-self: stretch;
`

const ProfileWrapper=styled.div`
  display: flex;
  width: 9.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
const ProfileImg=styled.img`
  height: 9.375rem;
  align-self: stretch;
  aspect-ratio: 1/1;
  fill: #F2F2F2;
`

const SelectButton=styled.div`
  color: #308DFF;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  cursor: pointer;
`


const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
`
const Half=styled.div`
  display: flex;
  width: 24.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 0.4375rem;
  align-self: stretch;
  width: 100%;
`

const Type = styled.div`
  color: var(--80, #0e0e0e);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  align-self: stretch;
`

const ClickBox = styled.div`
  display: flex;
  width: 24.5rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`

const Question = styled.div`
  color: var(--50, #7a7a7a);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`

const RegisterButton = styled.div`
  ${typo("bodym")};
  color: #308dff;
  cursor: pointer;
`