import React from "react";
import styled from "styled-components";
import MiniAlarm from "./MiniAlarm";
import MiniProflie from "./MiniProflie";
import { color, typo } from "../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";

const SideBarList = ({ onAlarmClick, isAlarmOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "홈", path: "/homepage" },
    { label: "입장하기", path: "/memorial" }, //임시
    { label: "개설하기", path: "/open" },
    { label: "나의 추모관", path: "/memorial-my" },
    { label: "로그아웃", path: "/" },
  ];

  const getIsActive = (item) => {
    if (item.label === "홈") {
      //  "/" 또는 "/homepage"일 때 홈 활성화
      return location.pathname === "/" || location.pathname === "/homepage";
    }
    if (item.label === "로그아웃") {
      // 로그아웃은 active 표시 안 함
      return false;
    }
    return location.pathname === item.path;
  };

  return (
    <Container>
      <Wrapper1>
        <MiniProflie />
        <MiniAlarm onClick={onAlarmClick} isActive={isAlarmOpen} />
      </Wrapper1>

      <Wrapper2>
        {menuItems.map((item) => (
          <Text
            key={item.path}
            onClick={() => navigate(item.path)}
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
