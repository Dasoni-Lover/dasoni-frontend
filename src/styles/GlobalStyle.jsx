// src/styles/GlobalStyle.jsx
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

  // 콘텐츠를 "밀어야 하는지" 여부
  const [shouldShiftContent, setShouldShiftContent] = useState(false);

  // 경로가 바뀔 때마다 열림/닫힘 상태 업데이트
  useEffect(() => {
    setIsOpen(!shouldSidebarBeClosed);
  }, [location.pathname, shouldSidebarBeClosed]);

  // 화면 크기 + 사이드바 상태에 따라 "밀 필요가 있는지" 계산
  useEffect(() => {
    const handleResize = () => {
      // 사이드바 관련 가정 값들
      const SIDEBAR_OPEN_WIDTH = 300 + 40; // 실제 사이드바 폭(300px) + 여유(40px)
      const SIDEBAR_CLOSED_WIDTH = 60; // 접혔을 때 폭
      const CONTENT_MAX_WIDTH = 1096; // 메인 컨텐츠 최대 폭(페이지에서 쓰는 값 기준)

      const viewportWidth = window.innerWidth;
      const sidebarWidth = isOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH;

      // 메인 컨텐츠가 가운데 정렬되어 있다고 가정할 때, 남는 양 옆 여백
      const horizontalMargin = Math.max(0, viewportWidth - CONTENT_MAX_WIDTH);
      const leftMargin = horizontalMargin / 2;

      // 왼쪽 여백보다 사이드바가 더 넓으면 → 컨텐츠를 가리게 됨 → 밀어야 함
      const willCoverContent = leftMargin < sidebarWidth;

      setShouldShiftContent(willCoverContent);
    };

    handleResize(); // 최초 1번 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // 상단 로그인/회원가입 버튼 노출할 경로
  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up";

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

  /*  실제로 컨텐츠를 가리는 경우에만 padding-left로 밀기 */
  padding-left: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "0"; // 겹쳐서 올려놓기
    return $isOpen ? "calc(300px + 40px)" : "60px";
  }};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* 밀 필요 없으면 가운데 정렬 유지, 밀어야 하면 기존 로직 사용 */
  align-items: ${({ $isOpen, $shouldShiftContent }) => {
    if (!$shouldShiftContent) return "center";
    return $isOpen ? "flex-start" : "center";
  }};

  width: 100%;
  transition: all 0.5s ease;
  margin-top: 6.25rem;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;
