import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Row } from "../../styles/flex";
import { color, typo } from "../../styles/tokens";
import { clearAuthTokens, getAccessToken, logoutUser } from "../../api/auth";
import { getProfileInfo } from "../../api/user";
import MiniProfile from "./MiniProflie";
import IconLogout from "../../assets/icon-logout.svg";

export default function Header({ showAuthButtons }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileInfo, setProfileInfo] = useState({
    name: "로그인",
    myProfile: null,
    notiCount: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 프로필 정보 가져오는 함수 분리
  const fetchProfileInfo = async () => {
    const token = getAccessToken();

    if (!token) {
      setIsLoggedIn(false);
      setProfileInfo({
        name: "로그인",
        myProfile: null,
        notiCount: 0,
      });
      return;
    }

    try {
      const data = await getProfileInfo();
      setProfileInfo({
        name: data?.name || "로그인",
        myProfile: data?.myProfile || null,
        notiCount: typeof data?.notiCount === "number" ? data.notiCount : 0,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.warn("헤더 프로필 정보 불러오기 실패:", error);
      setProfileInfo({
        name: "로그인",
        myProfile: null,
        notiCount: 0,
      });
      setIsLoggedIn(false);
    }
  };

  // 1) 경로 바뀔 때마다 토큰/프로필 다시 확인
  useEffect(() => {
    fetchProfileInfo();
  }, [location.pathname]);

  // 2) 로그인/로그아웃 전역 이벤트 구독(즉시 반영)
  useEffect(() => {
    const handleAuthChanged = () => {
      fetchProfileInfo();
    };

    window.addEventListener("authChanged", handleAuthChanged);
    return () => window.removeEventListener("authChanged", handleAuthChanged);
  }, []);

  // 프로필 변경 전역 이벤트 구독
  useEffect(() => {
    const handleProfileUpdated = (e) => {
      const newUrl = e.detail?.profileUrl;
      if (!newUrl) return;

      setProfileInfo((prev) => ({
        ...prev,
        myProfile: newUrl,
      }));
    };

    window.addEventListener("myProfileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("myProfileUpdated", handleProfileUpdated);
    };
  }, []);

  const menuItems = [
    { label: "홈", path: "/home" },
    { label: "입장하기", path: "/enter" },
    { label: "개설하기", path: "/open" },
    { label: "나의 추모관", path: "/memorial" },
  ];

  const getIsActive = (item) => {
    if (item.label === "홈") {
      return location.pathname === "/" || location.pathname === "/home";
    }

    if (item.label === "나의 추모관") {
      const fromMyHall = location.state?.from === "myHall";
      return location.pathname === "/memorial" && fromMyHall;
    }

    return location.pathname === item.path;
  };

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn("로그아웃 실패(서버):", error);
    } finally {
      clearAuthTokens();
      // 전역 이벤트로 헤더 즉시 초기화
      window.dispatchEvent(new Event("authChanged"));

      navigate("/");
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <Wrapper>
      <Logo src={logo} onClick={() => navigate("/home")} />

      {!showAuthButtons && (
        <>
          <Row $gap={"4.3rem"}>
            {menuItems.map((item) => (
              <NavButton
                key={item.path}
                onClick={() => handleMenuClick(item)}
                $active={getIsActive(item)}
              >
                {item.label}
              </NavButton>
            ))}
          </Row>

          <Row>
            <MiniProfile
              name={isLoggedIn ? profileInfo.name : "로그인 해주세요"}
              profileImg={profileInfo.myProfile}
              isLogin={isLoggedIn}
            />
            <LogoutWrapper>
              <LogoutText onClick={handleLogoutClick}>
                <img src={IconLogout} alt="logout icon" />
                logout
              </LogoutText>
            </LogoutWrapper>
          </Row>
        </>
      )}

      {showAuthButtons && (
        <ButtonGroup>
          <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
          <RegisterButton onClick={() => navigate("/register")}>
            회원가입
          </RegisterButton>
        </ButtonGroup>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4.38rem;
  background: white;
  z-index: 999;
  border-bottom: 1px solid var(--5, #e9e9e9);
`;

const Logo = styled.img`
  width: 6.875rem;
  height: 2.76788rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
`;

const LoginButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid var(--5, #e9e9e9);
  background: #fff;

  color: var(--80, #0e0e0e);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;

  cursor: pointer;
`;

const RegisterButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid var(--70, #313131);
  background: var(--70, #313131);

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;

  cursor: pointer;
`;

const NavButton = styled.div`
  ${typo("h4")};
  color: ${({ $active }) => ($active ? color("black.80") : color("black.30"))};

  cursor: pointer;
  white-space: nowrap;
  transition: color 0.25s ease;
`;

const LogoutWrapper = styled.div`
  display: flex;
  gap: 0.65rem;
`;

const LogoutText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  ${typo("h3")};
  color: ${color("black.30")};
  border-radius: 0.25rem;
  width: 13.25rem;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    color: ${color("black.70")};
  }
`;
