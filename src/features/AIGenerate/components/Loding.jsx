import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import loding1 from "../assets/loding1-icon.svg";
import loding2 from "../assets/loding2-icon.svg";
import loding3 from "../assets/loding3-icon.svg";
import loding4 from "../assets/loding4-icon.svg";
import loding5 from "../assets/loding5-icon.svg";

export default function Loding({ isOpen, onCancel }) {
  const images = [loding1, loding2, loding3, loding4, loding5];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 400); // 0.4초 간격으로 변경

    return () => clearInterval(interval);
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <TextWrapper>
          <Title>
            요청에 따라 이미지를 생성 <br />하고 있어요
          </Title>
          <Content>소중한 기억을 복원해 드릴게요.</Content>
        </TextWrapper>

        <ImgWrapper>
          <Img src={images[index]} alt={`loading-${index + 1}`} />
        </ImgWrapper>
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
  display: flex;
  padding: 5.25rem 4.75rem 2.75rem 4.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-sizing: border-box;
  border-radius: 1.25rem;
  background: #fff;
`;

const TextWrapper = styled.div`
  width: 100%;
  gap: 0.69rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
  text-align: center;
`;

const Content = styled.div`
  ${typo("bodym2")};
  color: ${color("black.80")};
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23.3125rem;
  height: 16.3125rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
