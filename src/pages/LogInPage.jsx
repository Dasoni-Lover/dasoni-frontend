// src/pages/LogInPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import Button from "../components/Button";
import { InputFieldWhite } from "../components/InputFieldWhite";
import { loginUser, setAuthTokens } from "../api/auth";

export default function LogInPage() {
  const navigate = useNavigate();

  const [logId, setLogId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!logId.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    const body = {
      logId: logId.trim(),
      password,
    };

    try {
      setIsLoggingIn(true);

      const data = await loginUser(body); // { access_token, refresh_token }
      console.log("login response:", data);

      // ✅ 토큰 저장 헬퍼 사용
      setAuthTokens(data);

      alert("로그인에 성공했습니다.");
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.response?.data?.message) {
        alert(`로그인 실패: ${error.response.data.message}`);
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Wrapper>
      <OutBox>
        <Box>
          <TextWrapper>
            <Title>기억이 머무는 다솜 마을에 오신 걸 환영해요</Title>
            <Content>로그인하여 추모관 서비스를 이용해 보세요</Content>
          </TextWrapper>

          <MainWrapper>
            <InputBox>
              <Type>아이디</Type>
              <InputFieldWhite
                placeholder="아이디를 입력해 주세요"
                width="100%"
                value={logId}
                onChange={(e) => setLogId(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <Type>비밀번호</Type>
              <InputFieldWhite
                placeholder="비밀번호를 입력해 주세요"
                width="100%"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputBox>
          </MainWrapper>

          <ClickBox>
            <Button
              text={isLoggingIn ? "로그인 중..." : "로그인"}
              onClick={handleLogin}
              disabled={isLoggingIn}
            />

            <MiniWrapper>
              <Question>다소니가 처음이신가요?</Question>
              <RegisterButton onClick={() => navigate("/register")}>
                회원가입
              </RegisterButton>
            </MiniWrapper>
          </ClickBox>
        </Box>
      </OutBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 11.44rem;

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const OutBox = styled.div`
  display: inline-flex;
  padding: 2.1875rem 2.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
  border: 1px solid #f4f4f4;
  background: #f8f8f8;
`;

const Box = styled.div`
  display: flex;
  width: 25.5rem;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;
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
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 24.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4375rem;
  align-self: stretch;
`;

const Type = styled.div`
  color: var(--80, #0e0e0e);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  align-self: stretch;
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
  color: var(--50, #7a7a7a);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const RegisterButton = styled.div`
  ${typo("bodym")};
  color: #308dff;
  cursor: pointer;
`;
