import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import SideBar from "../components/sidebar/SideBar";
import { useLocation } from "react-router-dom";

export default function GlobalStyle({ children }) {
  const location = useLocation();

  // 1️경로별 콘텐츠 기준 너비 설정
  const CONTENT_MAX_WIDTH_BY_PATH = {
    "/": 600, // FirstPage 같이 좁은 랜딩
    "/login": 502,
    "/register": 918,

    // "/memorial-home": 1096,
    // "/something": 900,
    // 필요한 페이지마다 하나씩 추가
  };

  const getContentMaxWidth = (path) => CONTENT_MAX_WIDTH_BY_PATH[path] || 1096; // 기본값 1096

  const contentMaxWidth = getContentMaxWidth(location.pathname);

  // 특정 경로에서는 사이드바 닫기
  const shouldSidebarBeClosed =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const [isOpen, setIsOpen] = useState(!shouldSidebarBeClosed);

  // 사이드바가 내용을 밀어야 하는지 여부
  const [shouldShiftContent, setShouldShiftContent] = useState(false);

  // 경로가 바뀔 때마다 열림/닫힘 상태 업데이트
  useEffect(() => {
    setIsOpen(!shouldSidebarBeClosed);
  }, [location.pathname, shouldSidebarBeClosed]);

  // 화면 크기 + 사이드바 상태 + 페이지별 maxWidth 기반으로 계산
  useEffect(() => {
    const handleResize = () => {
      const SIDEBAR_OPEN_WIDTH = 300 + 40; // 사이드바 + 여유
      const SIDEBAR_CLOSED_WIDTH = 60;

      const viewportWidth = window.innerWidth;
      const sidebarWidth = isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH;

      // 페이지 디자인 기준 너비 사용
      const horizontalMargin = Math.max(0, viewportWidth - contentMaxWidth);
      const leftMargin = horizontalMargin / 2;

      // 왼쪽 여백보다 사이드바가 크면 → 컨텐츠를 덮음 → 밀어야 함
      const willCoverContent = leftMargin < sidebarWidth;

      setShouldShiftContent(willCoverContent);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, contentMaxWidth]);

  // 상단 로그인/회원가입 버튼 노출할 경로
  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <Wrapper $isOpen={isOpen} $shouldShiftContent={shouldShiftContent}>
      <Header showAuthButtons={showAuthButtons} />
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
      <ContentWrapper $isOpen={isOpen} $shouldShiftContent={shouldShiftContent}>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  /* 진짜 덮을 때만 패딩 주고, 아니면 0 */
  padding-left: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "0";
    return $isOpen ? "calc(300px + 40px)" : "60px";
  }};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "center"; // 안 밀어도 되면 가운데
    return $isOpen ? "flex-start" : "center";
  }};

  width: 100%;
  transition: all 0.5s ease;
  margin-top: 6.25rem;

  @media (max-width: 1200px) {
  }
`;
