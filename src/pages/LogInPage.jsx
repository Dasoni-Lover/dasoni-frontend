// src/pages/LogInPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import Button from "../components/Button";
import { InputFieldWhite } from "../components/InputFieldWhite";
import { loginUser, setAuthTokens } from "../api/auth";
import ImgLetter from "../features/Onboarding/assets/img-letter.svg";
import ImgRainbowHouse from "../features/Onboarding/assets/img-rainbow-house.svg";

export default function LogInPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect");

  const [logId, setLogId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(false);

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

      // 토큰 저장 헬퍼 사용
      setAuthTokens(data);

      // 헤더 즉시 갱신 트리거
      window.dispatchEvent(new Event("authChanged"));

      alert("로그인에 성공했습니다.");
      if (redirect) navigate(redirect, { replace: true });
      else navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Wrapper>
      <OutBox>
        {/* 박스 기준으로 절대 위치 + 카드 뒤 레이어 */}
        <LetterImg src={ImgLetter} />
        <HouseImg src={ImgRainbowHouse} />

        {/* 실제 카드 박스 */}
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
            {error ? (
              <ErrorMsg>아이디 또는 비밀번호가 일치하지 않아요</ErrorMsg>
            ) : null}
            <Button
              text={isLoggingIn ? "로그인 중..." : "로그인"}
              onClick={handleLogin}
              disabled={isLoggingIn}
              style={{ marginTop: "0.62rem", marginBottom: "1.25rem" }}
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
  margin: auto 0;

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

/**
 * OutBox는 "포지셔닝 컨테이너"
 * - position: relative 로 두고
 * - 자식인 이미지들을 absolute로 배치
 * - 카드(Box)는 그 위에 z-index로 올림
 */
const OutBox = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

/**
 * ✉️ 편지 이미지 — OutBox 기준 absolute
 * z-index: 0 → 카드(Box)보다 아래
 */
const LetterImg = styled.img`
  position: absolute;
  z-index: 0;
  right: -25%;
  bottom: 20%;
`;

/**
 * 🏠 무지개 집 이미지 — OutBox 기준 absolute
 */
const HouseImg = styled.img`
  position: absolute;
  z-index: 0;
  left: -70%;
  top: 10%;
`;

/**
 * 📦 실제 흰색 카드
 * - 배경/테두리/패딩 모두 여기로 이동
 * - z-index: 1 로 이미지 위에 놓임
 */
const Box = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: 25.5rem;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;

  padding: 2.1875rem 2.875rem;
  border-radius: 1rem;
  border: 1px solid #f4f4f4;
  background: rgba(255, 255, 255, 0.78);
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

const ErrorMsg = styled.div`
  ${typo("h4")};
  color: ${color("red")};
`;
