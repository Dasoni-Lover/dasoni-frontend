import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styled, { createGlobalStyle } from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/Footer"; // ✅ 추가
import { useLocation } from "react-router-dom";
import NanumOeHarMeoNiGeurSsi from "../assets/fonts/NanumOeHarMeoNiGeurSsi.ttf";

export default function GlobalStyle({ children }) {
  const location = useLocation();

  // 1️경로별 콘텐츠 기준 너비 설정
  const CONTENT_MAX_WIDTH_BY_PATH = {
    "/": 600,
    "/login": 502,
    "/register": 918,
  };

  const getContentMaxWidth = (path) => CONTENT_MAX_WIDTH_BY_PATH[path] || 1096;
  const contentMaxWidth = getContentMaxWidth(location.pathname);

  const shouldSidebarBeClosed =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const [isOpen, setIsOpen] = useState(!shouldSidebarBeClosed);
  const [shouldShiftContent, setShouldShiftContent] = useState(false);

  useEffect(() => {
    setIsOpen(!shouldSidebarBeClosed);
  }, [location.pathname, shouldSidebarBeClosed]);

  useEffect(() => {
    const handleResize = () => {
      const SIDEBAR_OPEN_WIDTH = 300 + 40;
      const SIDEBAR_CLOSED_WIDTH = 60;
      const viewportWidth = window.innerWidth;
      const sidebarWidth = isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH;
      const horizontalMargin = Math.max(0, viewportWidth - contentMaxWidth);
      const leftMargin = horizontalMargin / 2;
      const willCoverContent = leftMargin < sidebarWidth;
      setShouldShiftContent(willCoverContent);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, contentMaxWidth]);

  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <FontGlobalStyle />
      <Wrapper $isOpen={isOpen} $shouldShiftContent={shouldShiftContent}>
        <Header showAuthButtons={showAuthButtons} />
        <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <MainContent>
          <ContentWrapper
            $isOpen={isOpen}
            $shouldShiftContent={shouldShiftContent}
          >
            {children}
          </ContentWrapper>

          {/* ✅ 푸터 추가 */}
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </MainContent>
      </Wrapper>
    </>
  );
}

const FontGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum OeHarMeoNiGeurSsi';
    src: url(${NanumOeHarMeoNiGeurSsi}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 100vh; /* ✅ 화면 전체 높이 확보 */

  /* 사이드바 열림 여부에 따른 패딩 */
  padding-left: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "0";
    return $isOpen ? "calc(300px + 40px)" : "60px";
  }};
`;

const MainContent = styled.div`
  flex: 1; /* ✅ Header 제외 나머지 영역 확장 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 내용 + 푸터 분리 */
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "center";
    return $isOpen ? "flex-start" : "center";
  }};
  width: 100%;
  transition: all 0.5s ease;
  margin-top: 6.25rem;
`;

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 1; /* ✅ 사이드바보다 아래로 */
`;
