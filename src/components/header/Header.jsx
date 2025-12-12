// src/components/header/Header.jsx
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Row } from "../../styles/flex";
import { color, typo } from "../../styles/tokens";
import { clearAuthTokens, getAccessToken, logoutUser } from "../../api/auth";
import { getProfileInfo } from "../../api/user";
import { fetchNotifications } from "../../api/notification";
import MiniProfile from "./MiniProflie";
import AlarmPanel from "../alarm/AlarmPanel";
import alarm from "../../assets/bell-icon-gray.svg";
import alarmclick from "../../assets/bell-icon-yellow.svg";
import LogoutBox from "./LogoutBox";

export default function Header({ showAuthButtons }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);

  const [profileInfo, setProfileInfo] = useState({
    name: "로그인",
    myProfile: null,
    notiCount: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isLogoutBoxOpen, setIsLogoutBoxOpen] = useState(false);

  // 알림을 불러오는 함수 (재사용을 위해 useCallback으로 감쌈)
  const loadNotifications = useCallback(async () => {
    // 토큰이 없으면 요청할 필요가 없으므로 바로 종료
    if (!getAccessToken()) {
      setNotifications([]);
      return;
    }
    
    try {
      const data = await fetchNotifications();
      // 알림이 성공적으로 로드되면 상태 업데이트
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("알림 불러오기 실패:", err);
      // 실패 시 알림 상태를 초기화하거나 빈 배열로 설정
      setNotifications([]);
    }
  }, []); // 의존성 배열은 비워둠

  const fetchProfileInfo = async () => {
    const token = getAccessToken();

    if (!token) {
      // 로그아웃 상태
      setIsLoggedIn(false);
      setProfileInfo({
        name: "로그인",
        myProfile: null,
        notiCount: 0,
      });
      setNotifications([]); // ✅ 로그아웃 시 알림 초기화
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
      
      // ✅ 프로필 로드 성공 후 알림 로드 함수 호출
      loadNotifications(); 
      
    } catch (error) {
      console.warn("헤더 프로필 정보 불러오기 실패:", error);
      // 로그인 실패/토큰 만료 시
      setProfileInfo({
        name: "로그인",
        myProfile: null,
        notiCount: 0,
      });
      setIsLoggedIn(false);
      setNotifications([]); // ✅ 실패 시 알림 초기화
    }
  };


  useEffect(() => {
    fetchProfileInfo();
  }, [location.pathname]);

  // 'authChanged' 이벤트 발생 시 프로필 및 알림 정보를 다시 불러옵니다.
  useEffect(() => {
    const handleAuthChanged = () => {
      fetchProfileInfo();
    };
    window.addEventListener("authChanged", handleAuthChanged);
    return () => window.removeEventListener("authChanged", handleAuthChanged);
  }, []);

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
    return () =>
      window.removeEventListener("myProfileUpdated", handleProfileUpdated);
  }, []);
  


  const menuItems = [
    { label: "홈", path: "/home" },
    { label: "추모관 검색하기", path: "/enter" },
    { label: "추모관 개설하기", path: "/open" },
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
    if (item.label === "나의 추모관") {
      navigate(item.path, { state: { from: "myHall" } });
    } else {
      navigate(item.path);
    }
  };

  const handleAlarmClick = () => {
    setIsAlarmOpen((prev) => !prev);
    setIsLogoutBoxOpen(false);
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인 상태가 아니면 로그인 페이지로 이동
      return;
    }
    setIsLogoutBoxOpen((prev) => !prev);
    setIsAlarmOpen(false);
  };

  useEffect(() => {
    if (isAlarmOpen) {
      setIsLogoutBoxOpen(false);
    }
  }, [isAlarmOpen]);

  useEffect(() => {
    setIsLogoutBoxOpen(false);
    setIsAlarmOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Wrapper>
        <Logo src={logo} onClick={() => navigate("/home")} />

        {!showAuthButtons && (
          <>
            <Box>
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
            </Box>

            <div style={{ width: "6.8rem" }} />

            <OpenBox>
              <AlarmWrapper>
                <AlarmIcon
                  src={isAlarmOpen ? alarmclick : alarm}
                  onClick={handleAlarmClick}
                  data-ignore-close="true"
                />

                {/* 알림이 있을 때만 빨간 점 표시 */}
                {notifications.length > 0 && <AlarmBadge />}

                {isAlarmOpen &&
                  ReactDOM.createPortal(
                    <AlarmPanel 
                      notifications={notifications} // 알림 목록을 AlarmPanel로 전달할 수 있습니다.
                      onClose={() => setIsAlarmOpen(false)} 
                    />,
                    document.getElementById("portal-root")
                  )}
              </AlarmWrapper>

              <div onClick={handleProfileClick} data-ignore-close="true">
                <MiniProfile
                  name={profileInfo.name} // 로그인 상태에 따라 이름 표시
                  profileImg={profileInfo.myProfile}
                  isLogin={isLoggedIn}
                />
              </div>
            </OpenBox>
          </>
        )}

        {showAuthButtons && (
          <ButtonGroup>
            <LoginButton onClick={() => navigate("/login")}>
              로그인
            </LoginButton>
            <RegisterButton onClick={() => navigate("/register")}>
              회원가입
            </RegisterButton>
          </ButtonGroup>
        )}
      </Wrapper>

      {isLogoutBoxOpen &&
        ReactDOM.createPortal(
          <LogoutBox
            name={profileInfo.name}
            profileImg={profileInfo.myProfile}
            onLogout={async () => {
              try {
                await logoutUser();
              } catch (e) {
                console.error("로그아웃 실패:", e);
              } finally {
                clearAuthTokens();
                window.dispatchEvent(new Event("authChanged")); // 'authChanged' 이벤트를 발생시켜 Header 컴포넌트가 상태를 재확인하도록 함
                navigate("/");
                alert("로그아웃 되었습니다.");
              }
            }}
            onClose={() => setIsLogoutBoxOpen(false)}
          />,
          document.getElementById("portal-root")
        )}
    </>
  );
}

/* ================== styled-components ================== */

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.25rem;
  background: white;
  z-index: 10;
  border-bottom: 1px solid var(--5, #e9e9e9);
`;

const Logo = styled.img`
  width: 6.875rem;
  height: 2.76788rem;
  cursor: pointer;
`;

const Box = styled.div`
  margin: 0 2rem;
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
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
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
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
`;

const NavButton = styled.div`
  ${typo("h4")};
  color: ${({ $active }) =>
    $active ? color("black.80") : color("black.30")};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.25s ease;
`;

const AlarmIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const OpenBox = styled.div`
  position: absolute;
  right: 5.25rem;
  display: flex;
  gap: 2.12rem;
  flex-direction: row;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

const AlarmWrapper = styled.div`
  position: relative;
`;

/* ✅ 텍스트 없는 빨간 점 뱃지 */
const AlarmBadge = styled.div`
  position: absolute;
  top: 0.21rem;
  right: 0.21rem;
  width: 0.625rem;
  height: 0.625rem;
  background-color: #d74d4d;
  border-radius: 50%;
`;