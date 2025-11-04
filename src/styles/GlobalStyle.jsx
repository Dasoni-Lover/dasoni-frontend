import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import { useLocation } from "react-router-dom"; // ✅ 현재 경로 감지용

export default function GlobalStyle({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // 현재 경로가 '/homepage'일 때만 헤더 버튼 보이게
  const showAuthButtons = location.pathname === "/homepage";

  return (
    <Wrapper $isOpen={isOpen}>
      <Header showAuthButtons={showAuthButtons} />
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <ContentWrapper $isOpen={isOpen}>{children}</ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
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
