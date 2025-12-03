import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NanumOeHarMeoNiGeurSsi from "../assets/fonts/NanumOeHarMeoNiGeurSsi.ttf";
import Header from "../components/header/Header";

export default function GlobalStyle({ children }) {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  const CONTENT_MAX_WIDTH_BY_PATH = {
    "/": 600,
    "/login": 502,
    "/register": 918,
  };

  const getContentMaxWidth = (path) => CONTENT_MAX_WIDTH_BY_PATH[path] || 82.5;
  const contentMaxWidth = getContentMaxWidth(location.pathname);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const showAuthButtons = isLandingPage || isLoginPage || isRegisterPage;

  return (
    <>
      <FontGlobalStyle />
      <Wrapper>
        <Header showAuthButtons={showAuthButtons} />

        {/* ⭐ LandingPage('/')일 때는 MainContent를 적용하지 않는다 */}
        {isLandingPage ? (
          <>{children}</>
        ) : (
          <MainContent $isLogin={isLoginPage} $isRegister={isRegisterPage}>
            <ContentWrapper $contentMaxWidth={contentMaxWidth}>
              {children}
            </ContentWrapper>

            {!isLoginPage && !isRegisterPage && (
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            )}
          </MainContent>
        )}
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
  max-width: ${({ $contentMaxWidth }) => `${$contentMaxWidth}rem`};
  margin: 0 auto;

  margin-top: 6.25rem;
`;

const FooterWrapper = styled.footer`
  position: relative;
  margin-top: auto; /* ⭐ 컨텐츠가 적을 땐 바닥으로, 많으면 아래로 밀리게 */
`;
