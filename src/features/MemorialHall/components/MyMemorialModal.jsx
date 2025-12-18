import React from "react";
import styled from "styled-components";
import { typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function MyMemorialModal({ isOpen, onCreateClick }) {
  if (!isOpen) return null;

  const nav = useNavigate();

  return (
    <Overlay>
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
          <Button
            onClick={() => {
              nav("/example");
            }}
            text="예시 추모관 둘러보기"
            color="white"
          />
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
      90deg,
      #fff1f2 9.13%,
      #fff6eb 76.44%,
      #ffefe5 100%
    ),
    #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  margin-top: 6.25rem; /* Header 높이 보정 */
  height: calc(100% - 6.25rem);
  pointer-events: all;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 52.4375rem;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  ${typo("h2")}
  margin-bottom: 0.44rem;
  text-align: center;
`;

const SubText = styled.p`
  ${typo("bodym2")}
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5rem;
  gap: 0.75rem;
`;
