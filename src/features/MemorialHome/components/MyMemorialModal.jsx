import React, { useContext } from "react";
import styled from "styled-components";
import { typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import { SidebarContext } from "../../../styles/GlobalStyle"; // ✅ Context import

export default function MyMemorialModal({ isOpen, onCreateClick }) {
  const { isOpen: sidebarOpen } = useContext(SidebarContext); // ✅ 사이드바 상태 사용

  if (!isOpen) return null;

  return (
    <Overlay $sidebarOpen={sidebarOpen}>
      <ModalContainer>
        <Title>
          훗날, 남겨질 나의 소중한 사람들에게 꼭 전하고 싶은 진심이 있나요?
        </Title>
        <SubText>
          나의 추모관을 개설하면 사랑하는 이들을 위해 안부를 남기고, <br />
          기억하고 싶은 내 삶의 순간을 기록할 수 있어요
        </SubText>

        <ButtonContainer>
          <Button onClick={onCreateClick} text="나의 추모관 개설하기" />
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center; /* ✅ 사이드바 열림 시 왼쪽으로 이동 */
  z-index: 3000;
  width: ${({ $sidebarOpen }) =>
    $sidebarOpen ? "calc(100% - 18.75rem)" : "100%"};
  height: calc(100% - 6.25rem);
  margin-top: 6.25rem;
  margin-left:  ${({ $sidebarOpen }) =>
    $sidebarOpen ? "18.75rem" : "0"};
  transition: all 0.3s ease;
  pointer-events: all;
  z-index: 5;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 52.4375rem;
  flex-direction: column;
  align-items: center;
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? "12rem" : "0")};
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  ${typo("h2")};
  color: white;
  margin-bottom: 0.44rem;
  text-align: center;
`;

const SubText = styled.p`
  ${typo("bodym2")};
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5rem;
`;
