// src/components/sidebar/MiniAlarm.jsx
import React, { useState } from "react";
import alarmGrey from "../../assets/icon-bell-grey.svg";
import alarmBlack from "../../assets/icon-bell-black.svg";
import styled from "styled-components";
import { color } from "../../styles/tokens";

const MiniAlarm = ({ onClick, isActive, count = 0 }) => {
  const [isHover, setIsHover] = useState(false);

  const displayCount = typeof count === "number" && count > 0 ? count : 0;

  const iconSrc = isActive || isHover ? alarmBlack : alarmGrey;

  return (
    <Container
      onClick={onClick}
      $isActive={isActive}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box>
        <AlarmIcon src={iconSrc} alt="알림 아이콘" />
        <Text $isActive={isActive || isHover}>알림</Text>
      </Box>
      <Count $isActive={isActive || isHover}>{displayCount}</Count>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 2.9375rem;
  padding: 0.625rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 0.1875rem;
  background: ${({ $isActive }) => ($isActive ? "#FFF4E6" : "transparent")};
  border-left: ${({ $isActive }) =>
    $isActive ? "2px solid var(--main, #FFBC67)" : "transparent"};

  &:hover {
    border-left: 2px solid ${color("main")};
    background: #fff4e6;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const AlarmIcon = styled.img`
  width: 1.079rem;
  height: 1.079rem;
  transition: opacity 0.2s ease;
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.07913rem;
  font-weight: 500;
  line-height: 145%;
  color: ${({ $isActive }) =>
    $isActive ? color("black.80") : color("black.50")};
  transition: color 0.2s ease;
`;

const Count = styled.p`
  color: ${({ $isActive }) =>
    $isActive ? color("black.80") : color("black.50")};
  font-family: Pretendard;
  font-size: 19.424px;
  font-weight: 500;
  transition: color 0.2s ease;
`;

export default MiniAlarm;
