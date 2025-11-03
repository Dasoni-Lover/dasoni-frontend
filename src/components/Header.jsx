import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export default function Header() {
  return (
    <HeaderWrap role="banner">
      <Inner>
        <Title>다소니</Title>
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
`;

const Title = styled.div`
  ${typo("h1")};
  color: ${color("black.80")};
`;
