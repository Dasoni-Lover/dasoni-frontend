import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";

export default function GlobalStyle({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper $isOpen={isOpen}>
      <Header />
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <ContentWrapper $isOpen={isOpen}>{children}</ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  /* 사이드바 열림/닫힘에 따른 좌측 여백 */
  padding-left: ${({ $isOpen }) => ($isOpen ? "calc(300px + 40px)" : "60px")};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")};
  width: 100%;
  transition: all 0.5s ease;
  margin-top: 6.25rem;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;
