import React from "react";
import styled from "styled-components";

export default function ConfirmModal({
  isOpen,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      {/* 안쪽 클릭은 닫히지 않도록 */}
      <ModalContainer onClick={(e) => e.stopPropagation()}>
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
  width: 34rem;
  padding: 5.25rem 4.75rem 2.75rem 4.75rem;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

