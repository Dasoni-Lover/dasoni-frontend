import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NanumOeHarMeoNiGeurSsi from "../assets/fonts/NanumOeHarMeoNiGeurSsi.ttf";
import Header from "../components/header/Header";
import { getAccessToken } from "../api/auth";

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

  // ✅ 로그인 상태를 state로 들고가야 "로그인 직후" UI가 즉시 반영됨
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));

  useEffect(() => {
    // 라우트 바뀔 때도 한 번 동기화
    setIsLoggedIn(Boolean(getAccessToken()));
  }, [location.pathname]);

  useEffect(() => {
    // Header에서 쓰는 것처럼 authChanged 이벤트에 반응
    const handleAuthChanged = () => {
      setIsLoggedIn(Boolean(getAccessToken()));
    };

    window.addEventListener("authChanged", handleAuthChanged);
    return () => window.removeEventListener("authChanged", handleAuthChanged);
  }, []);

  // ✅ 로그인 안 되어있을 때만 true
  const showAuthButtons = !isLoggedIn;

  return (
    <>
      <FontGlobalStyle />
      <Wrapper>
        <Header showAuthButtons={showAuthButtons} />

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
  margin-top: auto;
`;
