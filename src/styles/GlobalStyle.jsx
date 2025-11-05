import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import { useLocation } from "react-router-dom";

export default function GlobalStyle({ children }) {
  const location = useLocation();

  // 특정 경로에서는 사이드바 닫기
  const shouldSidebarBeClosed =
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/";

  const [isOpen, setIsOpen] = useState(!shouldSidebarBeClosed);

  // 경로가 바뀔 때마다 열림/닫힘 상태 업데이트
  useEffect(() => {
    setIsOpen(!shouldSidebarBeClosed);
  }, [location.pathname]);

  // 상단 로그인/회원가입 버튼 노출할 경로
  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up";

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
