// src/components/Toast.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import IconWarning from "../assets/icon-warning.svg";

export default function Toast({ text, isOpen, onClose, duration = 2000 }) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  return (
    <ToastWrapper $open={isOpen}>
      <ToastInner>
        <Icon src={IconWarning} alt="알림 아이콘" />
        <ToastText>{text}</ToastText>
      </ToastInner>
    </ToastWrapper>
  );
}

const ToastWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 8rem;
  z-index: 99999;
  transform: translate(-50%, 0);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease-in;
`;

const ToastInner = styled.div`
  display: flex;
  width: 57.6875rem;
  padding: 1.25rem 1.875rem;
  align-items: center;
  gap: 1rem;

  border-radius: 0.625rem;
  border: 1px solid var(--5, #e9e9e9);
  background: #fff4e6;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
`;

const Icon = styled.img``;

const ToastText = styled.div`
  ${typo("bodyb")};
  color: ${color("black.70")};
  white-space: nowrap;
`;
