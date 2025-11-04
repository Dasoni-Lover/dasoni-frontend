import React from "react";
import styled from "styled-components";
import closebtn from "../../assets/close-btn.png"; 
import {color,typo} from "../../styles/tokens"
import { AlarmList } from "./AlarmList";

const AlarmPanel = ({ onClose }) => {
  return (
    <Panel>
      <Header>
        <Title>알림</Title>
        <CloseButton onClick={onClose}>
          <img src={closebtn} alt="닫기" />
        </CloseButton>
      </Header>
      <AlarmList/>
    </Panel>
  );
};

export default AlarmPanel;

const Panel = styled.div`
  position: fixed;
  top: 6.25rem;
  left: 300px; /* 사이드바 바로 오른쪽 */
  width: 31.25rem;
  height: calc(100vh - 6.25rem);
  border: 1px solid var(--outline, #F2E8DF);
  background: var(--0, #FFF);
  box-shadow: 4px 0 16.4px 0 rgba(0, 0, 0, 0.05);
  padding: 1.875rem 0;
  box-sizing: border-box;
  z-index: 9;
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
 display: flex;
width: 31.25rem;
padding: 0 1.25rem 0 2rem;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
box-sizing: border-box;

`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  margin-right: 0.38rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

