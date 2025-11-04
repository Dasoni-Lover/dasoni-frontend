import React from "react";
import alarmicon from "../../assets/alarm-icon.png";
import styled from "styled-components";
import { color } from "../../styles/tokens";

const MiniAlarm = ({ onClick, isActive }) => {
  return (
    <Container onClick={onClick} $isActive={isActive}>
      <Box>
        <AlarmIcon src={alarmicon} alt="알림 아이콘" />
        <Text $isActive={isActive}>알림</Text>
      </Box>
      <Count>0</Count>
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
  background: ${({ $isActive }) => ($isActive ? "#313131" : "transparent")};


  &:hover {
    background: #313131;
  }

  /* 부모 hover 시 자식(Text) 색 변경 */
  &:hover ${() => Text} {
    color: ${color("white")};
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
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.07913rem;
  font-weight: 500;
  line-height: 145%;
  color: ${({ $isActive }) =>
    $isActive ? color("white") : color("black.50")};
  transition: color 0.2s ease;
`;

const Count = styled.p`
  color: var(--50, #7a7a7a);
  font-family: Pretendard;
  font-size: 19.424px;
  font-weight: 500;
`;

export default MiniAlarm;
