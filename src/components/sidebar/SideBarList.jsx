// src/components/sidebar/SideBarList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MiniAlarm from "./MiniAlarm";
import MiniProflie from "./MiniProflie";
import { color, typo } from "../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, clearAuthTokens, getAccessToken } from "../../api/auth";
import { getSidebarInfo } from "../../api/user";
import IconLogout from "../../assets/icon-logout.svg";

const SideBarList = ({ onAlarmClick, isAlarmOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 사이드바 상단 표시 정보 상태
  const [sidebarInfo, setSidebarInfo] = useState({
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
      setSidebarInfo({
        name: "로그인",
        myProfile: null,
        notiCount: 0,
      });
      return;
    }

    const fetchSidebarInfo = async () => {
      try {
        const data = await getSidebarInfo(); // { name, myProfile, notiCount }
        setSidebarInfo({
          name: data?.name || "로그인",
          myProfile: data?.myProfile || null,
          notiCount: typeof data?.notiCount === "number" ? data.notiCount : 0,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.warn("사이드바 정보 불러오기 실패:", error);
        setSidebarInfo({
          name: "로그인",
          myProfile: null,
          notiCount: 0,
        });
        setIsLoggedIn(false);
      }
    };

    fetchSidebarInfo();
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

  // ✅ 로그아웃 버튼 전용 핸들러 (맨 아래에서 사용)
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

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      navigate("/register");
    }
  };

  return (
    <Container>
      <Wrapper1>
        {/* 로그인/프로필 영역 - 로그아웃일 땐 "로그인"으로 보이고 클릭 시 로그인 페이지로 */}
        <LoginRow onClick={handleLoginClick} $clickable={!isLoggedIn}>
          <MiniProflie
            name={isLoggedIn ? sidebarInfo.name : "로그인 해주세요"}
            profileImg={sidebarInfo.myProfile}
            isLogin={isLoggedIn}
          />
        </LoginRow>

        {/* 로그인 상태에서만 알림 버튼 노출 */}
        {isLoggedIn && (
          <MiniAlarm
            onClick={onAlarmClick}
            isActive={isAlarmOpen}
            count={sidebarInfo.notiCount}
          />
        )}
      </Wrapper1>

      {/* ✅ 로그인 상태일 때: 메뉴 + (맨 아래) 로그아웃 */}
      {isLoggedIn ? (
        <>
          <Wrapper2>
            {menuItems.map((item) => (
              <Text
                key={item.path}
                onClick={() => handleMenuClick(item)}
                $active={getIsActive(item)}
              >
                {item.label}
              </Text>
            ))}
          </Wrapper2>

          {/* 🔻 여기서부터는 사이드바 제일 아래 영역 */}
          <LogoutWrapper>
            <LogoutText onClick={handleLogoutClick}>
              <img src={IconLogout} />
              로그아웃
            </LogoutText>
          </LogoutWrapper>
        </>
      ) : (
        // ✅ 로그아웃 상태일 때: "회원가입" 한 줄만 노출
        <Wrapper2>
          <AuthMenuText onClick={handleRegisterClick}>회원가입</AuthMenuText>
        </Wrapper2>
      )}
    </Container>
  );
};

export default SideBarList;

/* 🎨 styled-components */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  height: 100%; /* 🔸 상위에서 높이 주면 로그아웃이 진짜 맨 아래로 감 */
`;

const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0 2rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-bottom: 1.079px solid #e9e9e9;
`;

// 프로필(로그인) 영역 전체를 클릭 가능하게 감싸는 래퍼
const LoginRow = styled.div`
  width: 100%;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  flex-shrink: 0;
  align-self: stretch;
`;

const Text = styled.div`
  display: flex;
  padding: 0.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  ${typo("h3")};
  color: ${({ $active }) => ($active ? color("black.70") : color("black.30"))};
  border-radius: 0.25rem;
  width: 13.25rem;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    color: ${color("black.70")};
  }
`;

// 로그아웃 상태에서 "회원가입" 텍스트 스타일
const AuthMenuText = styled.div`
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  ${typo("h3")};
  color: ${color("black.50")};
  width: 13.25rem;
  box-sizing: border-box;
`;

// 🔻 로그아웃 버튼을 사이드바 제일 아래로 보내는 래퍼
const LogoutWrapper = styled.div`
  display: flex;
  margin-top: auto; /* 핵심: 위 요소들과 최대한 거리 벌리기 */
  gap: 0.65rem;
`;

// 🔻 실제 로그아웃 버튼 스타일
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
