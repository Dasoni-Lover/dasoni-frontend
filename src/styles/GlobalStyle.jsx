import React, { useState, useEffect, createContext } from "react";
import Header from "../components/Header";
import styled, { createGlobalStyle } from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NanumOeHarMeoNiGeurSsi from "../assets/fonts/NanumOeHarMeoNiGeurSsi.ttf";

// ✅ 사이드바 상태를 전역으로 공유하기 위한 Context
export const SidebarContext = createContext();

export default function GlobalStyle({ children }) {
  const location = useLocation();

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
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
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

          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            )}
        </MainContent>
      </Wrapper>
    </SidebarContext.Provider>
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
  min-height: 100vh;
  padding-left: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "0";
    // 🔥 콘텐츠를 사이드바 영역 오른쪽에서부터 시작하게
    return $isOpen ? "300px" : "60px"; // 열려있으면 300, 닫혀도 60 확보
  }};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ $shouldShiftContent }) =>
    $shouldShiftContent ? "flex-start" : "center"};
  width: 100%;
  transition: all 0.5s ease;
  margin-top: 6.25rem;
  padding-left: ${({ $isOpen, $shouldShiftContent }) =>
    $isOpen && $shouldShiftContent ? "2rem" : "0"};
`;

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 1;
`;
