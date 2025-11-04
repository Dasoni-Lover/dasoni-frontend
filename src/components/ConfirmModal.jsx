import React from "react";
import styled from "styled-components";
import { typo, color } from "../styles/tokens";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      {/* 안쪽 클릭은 닫히지 않도록 */}
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}

        <ButtonGroup>
          <Button
            text={confirmText}
            size="L"
            color="main"
            onClick={onConfirm}
          />

          <Button text={cancelText} size="L" color="white" onClick={onCancel} />
        </ButtonGroup>
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
  justify-content: center;
  z-index: 3000;
`;

const ModalContainer = styled.div`
  width: 35rem;
  padding: 5.25rem 4.75rem 2.75rem 4.75rem;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h2`
  ${typo("h2")};
  color: ${color("black.80")};
  text-align: center;
  margin-bottom: 0.7rem;
`;

const Description = styled.p`
  ${typo("bodym2")};
  color: ${color("black.80")};
  text-align: center;
  margin-bottom: 5.5rem;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
