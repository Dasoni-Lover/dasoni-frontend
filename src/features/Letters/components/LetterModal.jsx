import React from "react";
import styled from "styled-components";
import { Letter } from "./Letter";

export default function LetterModal({ isOpen, onCancel, data }) {
  if (!isOpen || !data) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Letter data={data} />
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
