import React from "react";
import styled from "styled-components";
import { Letter } from "./Letter";

export default function LetterModal({
  isOpen,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
        <Letter/>
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

