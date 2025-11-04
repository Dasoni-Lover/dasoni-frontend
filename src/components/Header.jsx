import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header({ showAuthButtons }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/homepage")}>다소니</Logo>

      {showAuthButtons && (
        <ButtonGroup>
          <LoginButton onClick={() => navigate("/loginpage")}>로그인</LoginButton>
          <RegisterButton onClick={() => navigate("/registerpage")}>회원가입</RegisterButton>
        </ButtonGroup>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  background: white;
  border-bottom: 1px solid #eee;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
`;

const LoginButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid var(--5, #E9E9E9);
  background: #FFF;

  color: var(--80, #0E0E0E);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;

  cursor: pointer;
`;

const RegisterButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid var(--70, #313131);
  background: var(--70, #313131);

  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;

  cursor: pointer;
`;
