import React, { useState, useEffect } from "react";
import styled from "styled-components";
import closebtn from "../../assets/close-btn.png";
import openbtn from "../../assets/sidebar-dark-icon.svg";
import SideBarList from "../sidebar/SideBarList";
import AlarmPanel from "../alarm/AlarmPanel";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const toggleAlarm = () => setIsAlarmOpen((prev) => !prev);
  const closeAlarm = () => setIsAlarmOpen(false);

  // 사이드바 닫히면 알림창도 자동 닫기
  useEffect(() => {
    if (!isOpen) setIsAlarmOpen(false);
  }, [isOpen]);

  return (
    <>
      <Wrapper $isOpen={isOpen}>
        <ToggleButton
          $isOpen={isOpen}
          onClick={toggleSidebar}
          aria-label="사이드바 토글"
        >
          <img
            src={isOpen ? closebtn : openbtn}
            alt="toggle"
            className={isOpen ? "close" : "open"}
          />
        </ToggleButton>

        {isOpen && (
          <Menu>
            <SideBarList onAlarmClick={toggleAlarm} isAlarmOpen={isAlarmOpen} />
          </Menu>
        )}
      </Wrapper>

      {/* ✅ 알림 패널 표시 */}
      {isAlarmOpen && <AlarmPanel onClose={closeAlarm} />}
    </>
  );
};

export default SideBar;

const Wrapper = styled.div`
  position: fixed;
  top: 6.25rem;
  left: 0;
  width: ${({ $isOpen }) => ($isOpen ? "300px" : "60px")};
  height: calc(100vh - 6.25rem);

  border-radius: 0 0.625rem 0.625rem 0;
  background: ${({ $isOpen }) => ($isOpen ? "var(--0, #fff)" : "transparent")};
  border-top: ${({ $isOpen }) =>
    $isOpen ? "2px solid var(--5, #E9E9E9);" : "none"};
  border-right: ${({ $isOpen }) =>
    $isOpen ? "2px solid var(--5, #E9E9E9);" : "none"};
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? "2px solid var(--5, #E9E9E9);" : "none"};
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "0 0 24.4px 0 rgba(0, 0, 0, 0.11);" : "none"};

  transition: all 0.2s ease;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")};
  justify-content: flex-start;
  gap: ${({ $isOpen }) => ($isOpen ? "23.91px" : "0")};
  flex-shrink: 0;
  padding: ${({ $isOpen }) =>
    $isOpen ? "44.244px 30.705px 30px 31.295px" : "30px 40px"};
  box-sizing: border-box;
`;

const ToggleButton = styled.button`
  align-self: ${({ $isOpen }) => ($isOpen ? "flex-end" : "center")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s ease;

  img {
    display: block;

    &.close {
      width: 2.428rem;
      height: 2.428rem;
    }

    &.open {
      width: 2rem;
      height: 2.0625rem;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

/* 🔻 메뉴 영역이 남은 세로 공간을 꽉 채우도록 */
const Menu = styled.div`
  width: 100%;
  flex: 1;
  display: flex; /* 내부의 SideBarList가 height: 100%를 먹을 수 있게 */
`;
