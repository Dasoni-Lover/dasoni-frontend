// src/features/Landing/components/PostPart.jsx
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import FeatureInfo from "./FeatureInfo";

// 편지 예시 이미지들
import ImgLetter1 from "../assets/img-letter-example-1.svg";
import ImgLetter2 from "../assets/img-letter-example-2.svg";
import ImgLetter3 from "../assets/img-letter-example-3.svg";
import ImgLetter4 from "../assets/img-letter-example-4.svg";
import ImgLetter5 from "../assets/img-letter-example-5.svg";
import ImgLetter6 from "../assets/img-letter-example-6.svg";

import ImgTape from "../assets/img-tape.png";
import ImgWheelLeft from "../assets/img-wheel-left.png";
import ImgWheelRight from "../assets/img-wheel-right.png";

import SampleVoice from "../assets/sample-voice.mp3";
import PlayIcon from "../assets/icon-play.svg";
import PauseIcon from "../assets/icon-pause.svg";

import { Row, Column } from "../../../styles/flex";

const letterImages = [
  ImgLetter1,
  ImgLetter2,
  ImgLetter3,
  ImgLetter4,
  ImgLetter5,
  ImgLetter6,
];

export default function PostPart() {
  // ✅ 섹션별 트리거
  const [isWriteVisible, setIsWriteVisible] = useState(false);
  const [isResponseVisible, setIsResponseVisible] = useState(false);

  const writeRef = useRef(null);
  const responseRef = useRef(null);

  useEffect(() => {
    const target = writeRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsWriteVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const target = responseRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsResponseVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  // 🎵 오디오 플레이어 상태 (LettersSection과 동일)
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleProgressClick = (e) => {
    if (!duration || !audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <>
      <WriteLetterSection ref={writeRef}>
        <FadeInItem $visible={isWriteVisible} $delay="0s">
          <FeatureInfo
            title="편지 쓰기"
            main="보고픈 마음을 담아 고인께 편지를 남겨보세요"
          />
        </FadeInItem>

        {/* ✅ 마퀴/absolute 레이아웃 유지 위해: ExampleWrapper는 그대로 두고,
            안쪽 요소들은 AbsoluteFade로 "좌표 기준 유지"하면서 페이드만 */}
        <ExampleWrapper>
          <AbsoluteFade $visible={isWriteVisible} $delay="0.15s">
            {letterImages.map((src, index) => (
              <LetterItem key={index} $index={index}>
                <LetterImg src={src} alt={`letter-example-${index + 1}`} />
              </LetterItem>
            ))}
          </AbsoluteFade>
        </ExampleWrapper>
      </WriteLetterSection>

      <ResponseLetterSection ref={responseRef}>
        <FadeInItem $visible={isResponseVisible} $delay="0s">
          <FeatureInfo
            align="left"
            title="편지 답장"
            main="고인의 목소리로 재현한 AI 음성 편지를 받을 수 있어요"
            sub={`고인이 보고 싶은 날, \n 편지에 대한 답장으로  AI 음성 편지를 배달해 드릴게요. \n 나를 부르던 다정한 애칭, 우리가 나눴던 사소한 추억들을 그리운 모습과 목소리로 다시 만날 수 있어요.`}
          />
        </FadeInItem>

        <FadeInItem $visible={isResponseVisible} $delay="0.2s">
          <Row
            $align={"center"}
            $justify={"space-between"}
            style={{ paddingRight: "30rem", marginTop: "10rem" }}
          >
            <Column $align={"start"}>
              <LetterInfoText>음성 편지를 들어보세요</LetterInfoText>
              <VoicePlayerWrapper $visible={isResponseVisible}>
                <PlayerPlayButton
                  src={isPlaying ? PauseIcon : PlayIcon}
                  alt={isPlaying ? "일시 정지" : "재생"}
                  onClick={handlePlayPause}
                />
                <PlayerTime>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </PlayerTime>
                <PlayerProgressWrapper onClick={handleProgressClick}>
                  <PlayerProgress
                    value={duration ? (currentTime / duration) * 100 : 0}
                  >
                    <PlayerProgressCircle />
                  </PlayerProgress>
                </PlayerProgressWrapper>

                <audio ref={audioRef} src={SampleVoice} preload="metadata" />
              </VoicePlayerWrapper>
            </Column>

            {/* ✅ 기존 TapeImg 자리에 "테이프+휠+이퀄라이저" 적용 (레이아웃은 Row 그대로) */}
            <TapeWrapper>
              <WaveBars aria-hidden="true">
                {Array.from({ length: 50 }).map((_, idx) => (
                  <WaveBar key={idx} $delay={idx} $speed={0.9 + (idx % 5)} />
                ))}
              </WaveBars>

              <TapeImg src={ImgTape} alt="tape" />
              <TapeWheelLeft src={ImgWheelLeft} alt="left-wheel" />
              <TapeWheelRight src={ImgWheelRight} alt="right-wheel" />
            </TapeWrapper>
          </Row>
        </FadeInItem>
      </ResponseLetterSection>
    </>
  );
}

/* ---------------- 애니메이션 (추가) ---------------- */

const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
  will-change: transform, opacity;
`;

/* ✅ absolute 레이아웃(마퀴/position absolute) 깨지지 않게 하는 페이드 wrapper */
const AbsoluteFade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
  will-change: transform, opacity;

  & > * {
    pointer-events: auto;
  }
`;

/* ---------------- 기존 styled ---------------- */

const WriteLetterSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 원본 CSS의 marquee 애니메이션 */
const marquee = keyframes`
  100% {
    transform: translateX(
      calc(
        (var(--items) * (var(--carousel-item-width) + var(--carousel-item-gap))) * -1
      )
    );
  }
`;

// 편지 예시들이 들어가는 영역 (carousel 컨테이너)
const ExampleWrapper = styled.div`
  /* CSS 변수 설정 */
  --items: 6;
  --carousel-duration: 40s;

  @media (min-width: 600px) {
    --carousel-duration: 80s;
  }

  --carousel-width: 100%;
  /* 이동 거리 계산용 값(실제 카드 크기가 아니라 애니메이션 거리용으로만 사용됨) */
  --carousel-item-width: 100%;
  --carousel-item-height: 38rem;
  --carousel-item-gap: 2.5rem;

  position: relative;
  width: var(--carousel-width);
  height: var(--carousel-item-height);
  margin-top: 4rem;
  overflow: hidden;

  mask-image: linear-gradient(
    to right,
    transparent,
    black 10% 90%,
    transparent
  );

  /* hover 시 모든 카드 애니메이션 정지 */
  &:hover > article {
    animation-play-state: paused;
  }
`;

// 개별 편지 (이미지만 흘러가도록 카드 스타일 제거)
const LetterItem = styled.article`
  position: absolute;
  top: 0;
  left: calc(100% + var(--carousel-item-gap));
  width: auto;
  height: auto;

  /* 애니메이션 설정 */
  will-change: transform;
  animation-name: ${marquee};
  animation-duration: var(--carousel-duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  ${({ $index }) => `
    --i: ${$index};
    animation-delay: calc(
      var(--carousel-duration) / var(--items) * var(--i) * -1
    );
  `}
`;

// 편지 한 장 이미지 (원본 크기 그대로)
const LetterImg = styled.img`
  display: block;
  width: auto;
  height: 38rem;
`;

const ResponseLetterSection = styled.div`
  width: 100%;
  padding-top: 5rem;
  padding-left: 20rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 15rem;
`;

const LetterInfoText = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 161%; /* 2.415rem */
`;

/* ---------------- 테이프(휠+이퀄라이저) 추가 ---------------- */

const TapeWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: visible;
`;

const TapeImg = styled.img`
  width: 20rem;
  display: block;
  z-index: 0;
`;

const tapeWheelSpin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const TapeWheelLeft = styled.img`
  position: absolute;
  left: 106.5%;
  top: 50%;
  width: 2.78rem;

  /* ✅ 대략적인 위치: 필요하면 숫자만 미세 조정 */
  transform: translate(-50%, -50%);
  margin-left: -185px;

  animation: ${tapeWheelSpin} 2.2s linear infinite;
`;

const TapeWheelRight = styled.img`
  position: absolute;
  right: 16%;
  top: 50%;
  width: 2.78rem;

  transform: translate(-50%, -50%);
  margin-left: -95px;

  animation: ${tapeWheelSpin} 2.2s linear infinite;
`;

/* ✅ 이퀄라이저 막대: 가운데 기준 위/아래로 늘어남 */
const barBounce = keyframes`
  0%   { transform: scaleY(0.4); }
  20%  { transform: scaleY(1.3); }
  40%  { transform: scaleY(0.85); }
  60%  { transform: scaleY(1.15); }
  80%  { transform: scaleY(0.9); }
  100% { transform: scaleY(0.7); }
`;

const WaveBars = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 40rem; /* ✅ 테이프(20rem)보다 넓게: 원하는 만큼 조절 */
  height: 12rem; /* ✅ 막대 높이 여유(원하는 느낌으로 조절) */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  pointer-events: none;
  z-index: 0;
  /* ✅ 테이프 위에 막대가 보이게 하려면 1,
      테이프 뒤에 깔려야 하면 0 유지 (현재는 0 유지) */
`;

const WaveBar = styled.div`
  width: 0.4rem;
  height: 9.25rem;
  border-radius: 18.75rem;
  background: rgba(253, 185, 145, 0.43);

  transform-origin: center;
  transform: scaleY(0.7);

  animation: ${barBounce} ${({ $speed }) => $speed || 1.9}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => `${$delay * 0.06}s`};
`;

/* 🎵 LettersSection과 동일 스타일 플레이어 */
const VoicePlayerWrapper = styled.div`
  width: 30rem;
  max-width: 320px;
  height: 4rem;
  margin: 20px 0 0 0; /* ✅ 텍스트 아래 여백만 */
  border: 0.5px solid #d2d2d2;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;

  audio {
    display: none;
  }
`;

const PlayerPlayButton = styled.img`
  flex-shrink: 0;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  cursor: pointer;
`;

const PlayerTime = styled.div`
  color: var(--100, #000);
  font-family: Pretendard;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  margin-right: 1rem;
`;

const PlayerProgressWrapper = styled.div`
  flex: 1;
  height: 0.4375rem;
  border-radius: 1.25rem;
  background: var(--50, #7a7a7a);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const PlayerProgress = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #0e0e0e;
  border-radius: 1.25rem;
  transition: width 0.1s linear;
  position: relative;
`;

const PlayerProgressCircle = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 0.8125rem;
  height: 0.8125rem;
  background: #0e0e0e;
  border-radius: 50%;
`;
