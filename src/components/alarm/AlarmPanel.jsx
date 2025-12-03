import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import { color, typo } from "../../styles/tokens";
import { AlarmList } from "./AlarmList";

const AlarmPanel = ({ onClose }) => {
  const panelRef = useRef(null);

  //바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target &&
        e.target.closest &&
        e.target.closest("[data-ignore-close]")
      ) {
        return;
      }

      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <Panel ref={panelRef}>
      <Header>
        <Title>알림</Title>
        <Button
          text="닫기"
          width="6.25rem"
          color="white"
          size="S"
          onClick={onClose}
        />
      </Header>
      <Wrapper>
        <AlarmList />
      </Wrapper>
    </Panel>
  );
};

export default AlarmPanel;

const Panel = styled.div`
  position: fixed;
  top: 5.06rem;
  right: 13.75rem;
  width: 27.4375rem;
  max-height: 33.25rem;
  border-radius: 1.875rem;
  border: 1px solid var(--outline, #f2e8df);
  background: var(--0, #fff);
  box-shadow: -4px 18px 41.4px 0 rgba(0, 0, 0, 0.11);
  padding-top: 1.875rem;
  z-index: 9;
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  width: 27.4375rem;
  padding: 0 2.5rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1; /* 남는 공간 꽉 채움 */
  box-sizing: border-box;
  overflow: hidden; /* 내부 스크롤만 사용 */
  border-radius: 0 0 1.875rem 1.875rem;
`;
