import React, { useState } from "react";
import styled, { css } from "styled-components";

// 공유앨범 카드 이미지
import ImgPost1 from "../assets/img-post-example-1.svg";
import ImgPost2 from "../assets/img-post-example-2.svg";
import ImgPost3 from "../assets/img-post-example-3.svg";
import ImgPost4 from "../assets/img-post-example-4.svg";
import ImgPost5 from "../assets/img-post-example-5.svg";

export default function ShareAlbumCarousel() {
  const albumImages = [ImgPost1, ImgPost2, ImgPost3, ImgPost4, ImgPost5];
  const [activeCardIndex, setActiveCardIndex] = useState(2); // 가운데 카드

  const getCardPosition = (index) => {
    const total = albumImages.length;
    let diff = index - activeCardIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return "center";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    if (diff === -2) return "farLeft";
    if (diff === 2) return "farRight";
    return "hidden";
  };

  return (
    <AlbumCarousel>
      {albumImages.map((src, index) => {
        const position = getCardPosition(index);
        if (position === "hidden") return null;

        return (
          <AlbumCardWrapper
            key={index}
            $position={position}
            onClick={() => setActiveCardIndex(index)}
          >
            <AlbumCardImage src={src} alt={`album-${index + 1}`} />
          </AlbumCardWrapper>
        );
      })}
    </AlbumCarousel>
  );
}

// 카드들이 겹쳐지는 영역
const AlbumCarousel = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  height: 28rem;
  margin-top: 7rem;
`;

// 카드 바깥 래퍼
const AlbumCardWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 33.52px 0 rgba(0, 0, 0, 0.08);
  transition: transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease,
    z-index 0.5s ease, width 0.5s ease, height 0.5s ease;
  cursor: pointer;
  opacity: 0;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: transparent;
    transition: background 0.5s ease;
    pointer-events: none;
  }

  /* 중앙 카드 */
  ${({ $position }) =>
    $position === "center" &&
    css`
      width: 48.22444rem;
      height: 30.97975rem;
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 1;
      z-index: 5;

      &::after {
        background: transparent;
      }
    `}

  /* 한 칸 떨어진 카드 (left/right) */
  ${({ $position }) =>
    ($position === "left" || $position === "right") &&
    css`
      width: 38.144rem;
      height: 24.504rem;
      transform: translateX(
          ${$position === "left" ? "calc(-50% - 20rem)" : "calc(-50% + 20rem)"}
        )
        translateY(3.4rem) scale(0.96);
      opacity: 1;
      z-index: 4;

      &::after {
        background: rgba(0, 0, 0, 0.2);
      }
    `}

  /* 두 칸 떨어진 카드 (farLeft/farRight) */
  ${({ $position }) =>
    ($position === "farLeft" || $position === "farRight") &&
    css`
      width: 26.712rem;
      height: 17.164rem;
      transform: translateX(
          ${$position === "farLeft"
            ? "calc(-50% - 35rem)"
            : "calc(-50% + 35rem)"}
        )
        translateY(7rem) scale(0.9);
      opacity: 1;
      z-index: 3;

      &::after {
        background: rgba(0, 0, 0, 0.55);
      }
    `}
`;

// 실제 이미지는 래퍼 안에서 100% 채우기
const AlbumCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
