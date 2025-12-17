// src/pages/LandingPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Column } from "../styles/flex";
import { useNavigate } from "react-router-dom";

import ImgFrame from "../features/Landing/assets/img-frame-flower.svg";
import ImgRainbow from "../features/Landing/assets/img-rainbow.svg";
import ImgBlueHouse from "../features/Landing/assets/img-blue-house.svg";
import ImgOrangeHouse from "../features/Landing/assets/img-orange-house.svg";
import ImgPostBox from "../features/Landing/assets/img-post-box.svg";

import OrangePart from "../features/Landing/components/OrangePart";
import BluePart from "../features/Landing/components/BluePart";
import PostPart from "../features/Landing/components/PostPart";

/** 이미지 로드 + 디코딩까지 완료되면 resolve */
function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();

    const img = new Image();
    img.src = src;

    const done = async () => {
      // decode()가 있으면 "그리기 준비"까지 기다릴 수 있어서 첫 프레임 버벅임이 훨씬 줄어듦
      if (img.decode) await img.decode();

      resolve();
    };

    img.onload = done;
    img.onerror = () => resolve();
  });
}

export default function LandingPage() {
  const [bgMode, setBgMode] = useState("orange"); // 초기 배경
  const [assetsReady, setAssetsReady] = useState(false);
  const nav = useNavigate();

  // ✅ 이 페이지에서 "첫 렌더에 바로 보이는" 이미지들만 우선 프리로드
  const preloadTargets = useMemo(
    () => [ImgFrame, ImgRainbow, ImgBlueHouse, ImgOrangeHouse, ImgPostBox],
    []
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 로드 + 디코딩까지 전부 기다린 다음에만 애니메이션/노출 시작
      await Promise.all(preloadTargets.map((src) => preloadImage(src)));

      if (!cancelled) setAssetsReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [preloadTargets]);

  return (
    <>
      <Container>
        {/* 배경 레이어들 */}
        <BackgroundLayer
          $variant="orange"
          $active={bgMode === "orange"}
          $ready={assetsReady}
        />
        <BackgroundLayer
          $variant="blue"
          $active={bgMode === "blue"}
          $ready={assetsReady}
        />
        <BackgroundLayer
          $variant="post"
          $active={bgMode === "post"}
          $ready={assetsReady}
        />

        {/* ✅ 준비 전에는 화면을 숨기고(레이아웃 유지), 준비 후에만 등장 + 애니메이션 */}
        <PageContent $ready={assetsReady}>
          {/* 1) InfoSection 먼저 페이드인 */}
          <IntroFade $ready={assetsReady}>
            <InfoSection>
              <FrameImg src={ImgFrame} alt="frame" draggable={false} />
              <Column $gap={"2.25rem"}>
                <InfoText>
                  순우리말로 ‘사랑하는 사람’을 뜻하는 다소니는
                  <br />
                  사랑하는 사람을 추모하는 <b>온라인 추모 공간</b>입니다
                </InfoText>
                <Button
                  width="24.5rem"
                  text="예시 추모관 둘러보기"
                  onClick={() => {
                    nav("/example");
                  }}
                />
              </Column>
            </InfoSection>
          </IntroFade>

          {/* 2) HoverGuideText + HoverSection을 묶어서 "시간차 페이드인" */}
          <HoverGroupFade $ready={assetsReady}>
            <HoverGuideText $ready={assetsReady}>
              마우스를 올려보세요!
            </HoverGuideText>

            {/* 상단 호버 UI */}
            <HoverSection $ready={assetsReady}>
              <RainbowImg src={ImgRainbow} alt="rainbow" draggable={false} />

              <BlueHouseImg
                src={ImgBlueHouse}
                alt="blue-house"
                draggable={false}
                $active={bgMode === "blue"}
                onMouseEnter={() => setBgMode("blue")}
              />

              <OrangeHouseImg
                src={ImgOrangeHouse}
                alt="orange-house"
                draggable={false}
                $active={bgMode === "orange"}
                onMouseEnter={() => setBgMode("orange")}
              />

              <PostBoxImg
                src={ImgPostBox}
                alt="post-box"
                draggable={false}
                $active={bgMode === "post"}
                onMouseEnter={() => setBgMode("post")}
              />
            </HoverSection>
          </HoverGroupFade>

          {/* 선택된 배경에 따라 섹션 렌더링 */}
          {bgMode === "orange" && <OrangePart />}
          {bgMode === "blue" && <BluePart />}
          {bgMode === "post" && <PostPart />}
        </PageContent>

        {/* ✅ 로딩 중이면 아주 가벼운 오버레이(원하면 제거 가능) */}
        {!assetsReady && (
          <LoadingOverlay aria-hidden="true">
            <LoadingDot />
          </LoadingOverlay>
        )}
      </Container>

      <Footer />
    </>
  );
}

/* --------- styled-components --------- */

const introFadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const hoverFadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floaty = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const guideGlow = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(0.9); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const Container = styled.div`
  position: relative;
  overflow: hidden; /* 배경 레이어 튀어나오는 것 방지 */

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.25rem;
  min-height: 100vh;

  background: transparent;
`;

/* ✅ 준비 전엔 화면 안 보이게(레이아웃 유지) */
const PageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  visibility: ${({ $ready }) => ($ready ? "visible" : "hidden")};
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
`;

/* 배경 레이어 - opacity로 페이드 전환 */
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  background-repeat: no-repeat;
  background-size: 100vw 6195px;
  background-position: top center;

  ${({ $variant }) =>
    $variant === "orange" &&
    css`
      background: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 56.83%,
          #ffc085 89.65%
        ),
        #d9d9d9;
    `}

  ${({ $variant }) =>
    $variant === "blue" &&
    css`
      background-image: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 70%,
          #a877c4 100%
        ),
        linear-gradient(#d9d9d9, #d9d9d9);
    `}

  ${({ $variant }) =>
    $variant === "post" &&
    css`
      background-image: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 70%,
          #f4938c 87.92%
        ),
        linear-gradient(#d9d9d9, #d9d9d9);
    `}

  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: ${({ $ready }) => ($ready ? "opacity 0.3s ease-in-out" : "none")};
`;

/* InfoSection 페이드인 래퍼 */
const IntroFade = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${introFadeIn} 0.7s ease-out both;
    `}
`;

/* ✅ HoverGuideText + HoverSection 묶음 페이드인(시간차) */
const HoverGroupFade = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $ready }) =>
    $ready
      ? css`
          opacity: 0;
          animation: ${hoverFadeIn} 0.7s ease-out both;
          animation-delay: 0.55s;
        `
      : css`
          opacity: 0;
        `}
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

const HoverGuideText = styled.div`
  color: #7a7a7a;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 162%;

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${guideGlow} 1.8s ease-in-out infinite;
    `}
`;

/* 상단 호버 UI */
const HoverSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 30rem;

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${floaty} 3.6s ease-in-out infinite;
      will-change: transform;
    `}
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
  top: -2.5rem;
  right: 7.8rem;
`;

const OrangeHouseImg = styled.img`
  ${HoverBase};
  top: -1.5625rem;
  left: 3rem;
`;

const PostBoxImg = styled.img`
  ${HoverBase};
  top: 7rem;
  left: 15.3rem;
`;

/* 로딩 오버레이 (원하면 빼도 됨) */
const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const LoadingDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.25);
  animation: ${dotPulse} 0.9s ease-in-out infinite;
`;
