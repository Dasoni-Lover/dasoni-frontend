// src/components/sidebar/SideBarList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MiniAlarm from "./MiniAlarm";
import MiniProflie from "./MiniProflie";
import { color, typo } from "../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, clearAuthTokens, getAccessToken } from "../../api/auth";
import { getSidebarInfo } from "../../api/user";

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

  const menuItems = [
    { label: "홈", path: "/home" },
    { label: "입장하기", path: "/enter" },
    { label: "개설하기", path: "/open" },
    { label: "나의 추모관", path: "/memorial-my" },
    { label: "로그아웃", path: "/" },
  ];

  const getIsActive = (item) => {
    if (item.label === "홈") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    if (item.label === "로그아웃") {
      return false; // 로그아웃은 active 표시 안 함
    }
    return location.pathname === item.path;
  };

  const handleMenuClick = async (item) => {
    // 로그아웃 메뉴 클릭
    if (item.label === "로그아웃") {
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
      return;
    }

    // 일반 메뉴 이동
    navigate(item.path);
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
            name={isLoggedIn ? sidebarInfo.name : "로그인"}
            profileImg={sidebarInfo.myProfile}
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

      {/* ✅ 로그인 상태일 때: 기존 메뉴 전체 노출 */}
      {isLoggedIn ? (
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
  height: 12.125rem;
  padding: 0 0.27rem;
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
  color: ${({ $active }) => ($active ? color("black.80") : color("black.50"))};
  background-color: ${({ $active }) => ($active ? "#FFBC67" : "transparent")};
  border-radius: 0.25rem;
  width: 13.25rem;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    color: ${color("black.80")};
    background-color: #ffbc67;
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
