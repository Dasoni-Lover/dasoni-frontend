import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NanumOeHarMeoNiGeurSsi from "../assets/fonts/NanumOeHarMeoNiGeurSsi.ttf";
import Header from "../components/header/Header";

export default function GlobalStyle({ children }) {
  const location = useLocation();

  // 페이지별 컨텐츠 최대 너비 유지
  const CONTENT_MAX_WIDTH_BY_PATH = {
    "/": 600,
    "/login": 502,
    "/register": 918,
  };

  const getContentMaxWidth = (path) => CONTENT_MAX_WIDTH_BY_PATH[path] || 1096;
  const contentMaxWidth = getContentMaxWidth(location.pathname);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  // 로그인/회원가입/랜딩에서는 헤더 인증 버튼 보여주기
  const showAuthButtons =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <FontGlobalStyle />
      <Wrapper>
        <Header showAuthButtons={showAuthButtons} />
        {/* /login일 때만 배경 FFBC67 */}
        <MainContent $isLogin={isLoginPage} $isRegister={isRegisterPage}>
          <ContentWrapper $contentMaxWidth={contentMaxWidth}>
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
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ $isLogin, $isRegister }) =>
    $isRegister
      ? "radial-gradient(650.38% 156.37% at 0% 3.41%, #FFC085 9.49%, #FFE2C7 29.81%, #FFF 82.69%)"
      : $isLogin
      ? "#FFBC67"
      : "transparent"};
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ $contentMaxWidth }) => `${$contentMaxWidth}px`};
  margin: 0 auto;

  margin-top: 6.25rem;
`;

const FooterWrapper = styled.footer`
  position: relative;
`;
