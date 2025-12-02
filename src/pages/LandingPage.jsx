// src/pages/LandingPage.jsx
import React, { useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Column } from "../styles/flex";

import ImgFrame from "../features/Landing/assets/img-frame-flower.svg";
import ImgRainbow from "../features/Landing/assets/img-rainbow.svg";
import ImgBlueHouse from "../features/Landing/assets/img-blue-house.svg";
import ImgOrangeHouse from "../features/Landing/assets/img-orange-house.svg";
import ImgPostBox from "../features/Landing/assets/img-post-box.svg";

import OrangePart from "../features/Landing/components/OrangePart";
import BluePart from "../features/Landing/components/BluePart";
import PostPart from "../features/Landing/components/PostPart";

export default function LandingPage() {
  const [bgMode, setBgMode] = useState("orange"); // 초기 배경

  return (
    <>
      <Container>
        {/* 배경 레이어들 */}
        <BackgroundLayer $variant="orange" $active={bgMode === "orange"} />
        <BackgroundLayer $variant="blue" $active={bgMode === "blue"} />
        <BackgroundLayer $variant="post" $active={bgMode === "post"} />

        {/* 메인 소개 */}
        <InfoSection>
          <FrameImg src={ImgFrame} />
          <Column $gap={"2.25rem"}>
            <InfoText>
              순우리말로 ‘사랑하는 사람’을 뜻하는 다소니는
              <br />
              사랑하는 사람을 추모하는 <b>온라인 추모 공간</b>입니다
            </InfoText>
            <Button width="24.5rem" text="예시 추모관 둘러보기" />
          </Column>
        </InfoSection>

        <HoverGuideText>마우스를 올려보세요!</HoverGuideText>

        {/* 상단 호버 UI */}
        <HoverSection>
          <RainbowImg src={ImgRainbow} />

          <BlueHouseImg
            src={ImgBlueHouse}
            $active={bgMode === "blue"}
            onMouseEnter={() => setBgMode("blue")}
          />

          <OrangeHouseImg
            src={ImgOrangeHouse}
            $active={bgMode === "orange"}
            onMouseEnter={() => setBgMode("orange")}
          />

          <PostBoxImg
            src={ImgPostBox}
            $active={bgMode === "post"}
            onMouseEnter={() => setBgMode("post")}
          />
        </HoverSection>

        {/* 선택된 배경에 따라 섹션 렌더링 */}
        {bgMode === "orange" && <OrangePart />}
        {bgMode === "blue" && <BluePart />}
        {bgMode === "post" && <PostPart />}
      </Container>
      <Footer />
    </>
  );
}

/* --------- styled-components --------- */

const Container = styled.div`
  position: relative;
  overflow: hidden; /* 배경 레이어 튀어나오는 것 방지 */

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.25rem;

  /* 높이는 내용만큼 + 최소 1뷰포트 */
  min-height: 100vh;

  background: transparent;
`;

/*  배경 레이어 - opacity로 페이드 전환 + 1920x6195 기준 그라디언트 */
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  /* 100vw x 6195 기준 사이즈로 그라데이션 지정 */
  background-repeat: no-repeat;
  background-size: 100vw 6195px;
  background-position: top center;

  ${({ $variant }) =>
    $variant === "orange" &&
    css`
      background-image: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 56.83%,
          #ffc085 89.65%
        ),
        linear-gradient(#d9d9d9, #d9d9d9);
    `}

  ${({ $variant }) =>
    $variant === "blue" &&
    css`
      background-image: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 67.81%,
          #a877c4 100%
        ),
        linear-gradient(#d9d9d9, #d9d9d9);
    `}

  ${({ $variant }) =>
    $variant === "post" &&
    css`
      background-image: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 69.43%,
          #f4938c 87.92%
        ),
        linear-gradient(#d9d9d9, #d9d9d9);
    `}

  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const FrameImg = styled.img`
  width: 21rem;
  height: 21rem;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 15rem;
`;

const InfoText = styled.div`
  color: #313131;
  font-family: Pretendard;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 150%;
`;

const HoverSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 30rem;
`;

const HoverGuideText = styled.div`
  color: #7a7a7a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 162%;
`;

/* 호버 세 개의 공통 로직 */
const HoverBase = css`
  position: absolute;
  opacity: 0.3;
  filter: grayscale(20%);
  transition: all 0.35s ease;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      transform: translateY(-4px) scale(1.05);
      opacity: 1;
      filter: grayscale(0%);
      z-index: 2;
    `}
`;

const RainbowImg = styled.img`
  position: absolute;
  opacity: 0.3;
`;

const BlueHouseImg = styled.img`
  ${HoverBase};
  top: -2.1875rem;
  right: 5.9375rem;
`;

const OrangeHouseImg = styled.img`
  ${HoverBase};
  top: -1.5625rem;
  left: 2.8125rem;
`;

const PostBoxImg = styled.img`
  ${HoverBase};
  top: 3.4375rem;
  left: 11.875rem;
`;
