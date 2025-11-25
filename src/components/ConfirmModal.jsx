import React from "react";
import styled from "styled-components";
import { typo, color } from "../styles/tokens";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  title,
  description,
  subImage = null,
  subText = null,
  confirmText = "확인",
  cancelText = null,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title $hasDescription={!!description}>{title}</Title>

        {description && (
          <Description $hasSub={!!(subImage || subText)}>
            {description}
          </Description>
        )}

        {(subImage || subText) && (
          <InfoBox>
            {subImage && <InfoImage src={subImage} alt="info" />}
            {subText && <InfoText>{subText}</InfoText>}
          </InfoBox>
        )}

        <ButtonGroup>
          <Button text={confirmText} size="L" onClick={onConfirm} />
          {cancelText ? (
            <Button
              text={cancelText}
              size="L"
              color="white"
              onClick={onCancel}
            />
          ) : null}
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
  z-index: 100000000;
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

const Title = styled.h2`
  ${typo("h2")};
  color: ${color("black.80")};
  text-align: center;
  margin-bottom: ${({ $hasDescription }) =>
    $hasDescription ? "0.7rem" : "5.25rem"};
`;

const Description = styled.p`
  ${typo("bodym2")};
  color: ${color("black.80")};
  text-align: center;
  margin-bottom: ${({ $hasSub }) => ($hasSub ? "2rem" : "5rem")};
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  height: 3.125rem;
`;

const InfoImage = styled.img`
  width: 3.125rem;
  height: 3.125rem;
`;

const InfoText = styled.p`
  ${typo("h3")};
  color: ${color("black.50")};
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
