import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header({ showAuthButtons }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo onClick={() => navigate("/")}>다소니</Logo>

      {showAuthButtons && (
        <ButtonGroup>
          <Button onClick={() => navigate("/loginpage")}>로그인</Button>
          <Button onClick={() => navigate("/registerpage")}>회원가입</Button>
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
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #333;
  }
`;
