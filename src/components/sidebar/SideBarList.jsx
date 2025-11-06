// src/components/sidebar/SideBarList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MiniAlarm from "./MiniAlarm";
import MiniProflie from "./MiniProflie";
import { color, typo } from "../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, clearAuthTokens, getAccessToken } from "../../api/auth";
import { getSidebarInfo } from "../../api/hall";

const SideBarList = ({ onAlarmClick, isAlarmOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 사이드바 상단 표시 정보 상태
  const [sidebarInfo, setSidebarInfo] = useState({
    name: "로그인 해주세요",
    myProfile: null,
    notiCount: 0,
  });

  // 마운트 시 / 로그인 상태일 때 사이드바 정보 불러오기
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      // 토큰 없으면 그대로 기본값 유지
      return;
    }

    const fetchSidebarInfo = async () => {
      try {
        const data = await getSidebarInfo(); // { name, myProfile, notiCount }
        setSidebarInfo({
          name: data?.name || "로그인 해주세요",
          myProfile: data?.myProfile || null,
          notiCount: typeof data?.notiCount === "number" ? data.notiCount : 0,
        });
      } catch (error) {
        console.warn("사이드바 정보 불러오기 실패:", error);
        // 권한 문제 등으로 실패하면 로그인 안 된 것처럼 기본값으로
        setSidebarInfo({
          name: "로그인 해주세요",
          myProfile: null,
          notiCount: 0,
        });
      }
    };

    fetchSidebarInfo();
  }, []);

  const menuItems = [
    { label: "홈", path: "/homepage" },
    { label: "입장하기", path: "/enter" },
    { label: "개설하기", path: "/open" },
    { label: "나의 추모관", path: "/memorial-my" },
    { label: "로그아웃", path: "/" },
  ];

  const getIsActive = (item) => {
    if (item.label === "홈") {
      return location.pathname === "/" || location.pathname === "/homepage";
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
      }
      return;
    }

    // 일반 메뉴 이동
    navigate(item.path);
  };

  return (
    <Container>
      <Wrapper1>
        {/*  프로필/이름, 알림 개수를 API 데이터로 내려주기 */}
        <MiniProflie
          name={sidebarInfo.name}
          profileImg={sidebarInfo.myProfile}
        />
        <MiniAlarm
          onClick={onAlarmClick}
          isActive={isAlarmOpen}
          count={sidebarInfo.notiCount}
        />
      </Wrapper1>

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
    </Container>
  );
};

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
  padding: 0.5rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-bottom: 1.079px solid #e9e9e9;
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

export default SideBarList;
