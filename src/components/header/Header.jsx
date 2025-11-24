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

  // 헤더 상단 표시 정보 상태
  const [profileInfo, setProfileInfo] = useState({
    name: "로그인", // ▶ 로그아웃 기본 텍스트
    myProfile: null,
    notiCount: 0,
  });

  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 마운트 시 / 로그인 상태일 때 사이드바 정보 불러오기
  useEffect(() => {
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

    const fetchProfileInfo = async () => {
      try {
        const data = await getProfileInfo(); // { name, myProfile, notiCount }
        setProfileInfo({
          name: data?.name || "로그인",
          myProfile: data?.myProfile || null,
          notiCount: typeof data?.notiCount === "number" ? data.notiCount : 0,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.warn("사이드바 정보 불러오기 실패:", error);
        setProfileInfo({
          name: "로그인",
          myProfile: null,
          notiCount: 0,
        });
        setIsLoggedIn(false);
      }
    };

    fetchProfileInfo();
  }, []);

  // ✅ 프로필 변경 전역 이벤트 구독
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

  // ✅ 로그아웃을 제외한 일반 메뉴만
  const menuItems = [
    { label: "홈", path: "/home" },
    { label: "입장하기", path: "/enter" },
    { label: "개설하기", path: "/open" },
    { label: "나의 추모관", path: "/memorial-my" },
  ];

  const getIsActive = (item) => {
    if (item.label === "홈") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === item.path;
  };

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser(); // 서버 로그아웃
    } catch (error) {
      console.warn("로그아웃 실패(서버):", error);
    } finally {
      clearAuthTokens(); // 클라이언트 토큰 삭제
      navigate("/");
      alert("로그아웃 되었습니다.");
      window.location.reload(); // 사이드바 즉시 초기화
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
                <img src={IconLogout} />
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

// 실제 로그아웃 버튼 스타일
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
