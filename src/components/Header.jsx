import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export default function Header({ showAuthButtons = false }) {
  return (
    <HeaderWrap role="banner">
      <Inner>
        <Title>다소니</Title>

        {showAuthButtons && ( //true일 때만 버튼 표시
          <ButtonGroup>
            <Button>로그인</Button>
            <Button $primary>회원가입</Button>
          </ButtonGroup>
        )}
      </Inner>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  background: #ffffff;
  border-bottom: 1px solid #7a7a7a;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  margin: 0;
  padding: 1rem 2rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  ${typo("h1")};
  color: ${color("black.80")};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #ccc")};
  background-color: ${({ $primary }) => ($primary ? "#000" : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#000")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
