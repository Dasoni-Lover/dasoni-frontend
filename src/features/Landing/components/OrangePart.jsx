// src/features/Landing/components/OrangePart.jsx
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import FeatureInfo from "./FeatureInfo";
import ShareAlbumCarousel from "./ShareAlbumCarousel";

import ImgRequest1 from "../assets/img-request-example-1.svg";
import ImgRequest2 from "../assets/img-request-example-2.svg";
import ImgResponse1 from "../assets/img-response-example-1.svg";
import ImgResponse2 from "../assets/img-response-example-2.svg";

import ImgMockup from "../assets/img-mockup.png";
import ImgLinkBubble from "../assets/img-link-share-bubble.png";
import ImgSns from "../assets/img-sns.png";

import ImgSpeechBubble from "../assets/img-speech-bubble.svg";
import ImgSpeechBubble2 from "../assets/img-speech-bubble-2.svg";

import { color, typo } from "../../../styles/tokens";

export default function OrangePart() {
  // ✅ 섹션별 애니메이션 트리거
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isAIVisible, setIsAIVisible] = useState(false);
  const [isLinkVisible, setIsLinkVisible] = useState(false);

  const shareRef = useRef(null);
  const aiRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const target = shareRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsShareVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const target = aiRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsAIVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const target = linkRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsLinkVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  // ✅ 말풍선 개수 / 위치 / 속도 / 딜레이 / 크기 / 이미지(src) 커스텀
  const bubbles = [
    {
      left: "4%",
      size: "7.0rem",
      duration: "7.2s",
      delay: "0.6s",
      src: ImgSpeechBubble,
    },
    {
      left: "10%",
      size: "12.8rem",
      duration: "12.6s",
      delay: "2.2s",
      src: ImgSpeechBubble2,
    },
    {
      left: "18%",
      size: "8.6rem",
      duration: "8.6s",
      delay: "1.3s",
      src: ImgSpeechBubble,
    },
    {
      left: "26%",
      size: "15.2rem",
      duration: "11.0s",
      delay: "0.2s",
      src: ImgSpeechBubble2,
    },
    {
      left: "36%",
      size: "6.2rem",
      duration: "7.0s",
      delay: "3.0s",
      src: ImgSpeechBubble2,
    },
    {
      left: "44%",
      size: "10.4rem",
      duration: "10.2s",
      delay: "1.0s",
      src: ImgSpeechBubble,
    },
    {
      left: "54%",
      size: "16.0rem",
      duration: "12.0s",
      delay: "2.8s",
      src: ImgSpeechBubble,
    },
    {
      left: "62%",
      size: "8.0rem",
      duration: "8.1s",
      delay: "4.2s",
      src: ImgSpeechBubble2,
    },
    {
      left: "70%",
      size: "13.4rem",
      duration: "12.4s",
      delay: "1.7s",
      src: ImgSpeechBubble,
    },
    {
      left: "78%",
      size: "6.8rem",
      duration: "7.4s",
      delay: "3.6s",
      src: ImgSpeechBubble2,
    },
    {
      left: "86%",
      size: "17.2rem",
      duration: "13.0s",
      delay: "0.8s",
      src: ImgSpeechBubble2,
    },
    {
      left: "92%",
      size: "9.2rem",
      duration: "9.0s",
      delay: "2.4s",
      src: ImgSpeechBubble,
    },
  ];

  return (
    <>
      {/* 공유앨범 섹션 */}
      <ShareAlbumSection ref={shareRef}>
        <ShareAlbumInner>
          <FadeInItem $visible={isShareVisible} $delay="0s">
            <FeatureInfo
              title="공유앨범"
              main="고인과의 추억이 담긴 사진을 앨범에 올려주세요"
              sub="추모관에 방문한 추모객들과 함께 따뜻했던 추억을 나눌 수 있어요"
            />
          </FadeInItem>

          <FadeInItem $visible={isShareVisible} $delay="0.12s">
            <ShareAlbumCarousel />
          </FadeInItem>
        </ShareAlbumInner>
      </ShareAlbumSection>

      {/* AI 사진 생성 */}
      <AIGenerationSection ref={aiRef}>
        <FadeInItem $visible={isAIVisible} $delay="0s">
          <FeatureInfo
            highlight={true}
            title="AI 사진 생성"
            main="함께한 순간의 사진이 남아있지 않아 아쉬우신가요?"
            sub={`혹은 함께하지 못해 상상만 했던 순간이 있나요? \n 기억 속의 장면을 AI로 직접 만들어 보세요.`}
          />
        </FadeInItem>

        <FadeInItem $visible={isAIVisible} $delay="0.14s">
          <ExampleWrapper>
            <FadeInItem $visible={isAIVisible} $delay="0.18s">
              <RequestImg src={ImgRequest1} />
            </FadeInItem>

            <FadeInItem $visible={isAIVisible} $delay="0.26s">
              <ResponseBox>
                <ResponseImgWrapper>
                  <ResponseImg src={ImgResponse1} />
                </ResponseImgWrapper>
              </ResponseBox>
            </FadeInItem>

            <FadeInItem $visible={isAIVisible} $delay="0.34s">
              <RequestImg src={ImgRequest2} />
            </FadeInItem>

            <FadeInItem $visible={isAIVisible} $delay="0.42s">
              <ResponseBox>
                <ResponseImgWrapper>
                  <ResponseImg src={ImgResponse2} />
                </ResponseImgWrapper>
              </ResponseBox>
            </FadeInItem>
          </ExampleWrapper>
        </FadeInItem>
      </AIGenerationSection>

      {/* 링크 공유 */}
      <LinkShareSection ref={linkRef}>
        {/* ✅ 배경 말풍선 레이어 */}
        <BubblesLayer aria-hidden="true">
          {bubbles.map((b, idx) => (
            <FloatingBubble
              key={idx}
              src={b.src}
              alt=""
              $left={b.left}
              $size={b.size}
              $duration={b.duration}
              $delay={b.delay}
            />
          ))}
        </BubblesLayer>

        <FadeInItem $visible={isLinkVisible} $delay="0s" $z={4}>
          <FeatureInfo
            title="링크 공유"
            main="추모관 링크를 공유해 주세요"
            sub={`추모관 링크를 공유해, 고인을 사랑했던 이들과 소중한 추억을 함께 모아보세요.\n기억을 나누는 순간들이 서로에게 따뜻한 위로가 되어줄 거예요`}
            subcolor="white"
          />
        </FadeInItem>

        <FadeInItem $visible={isLinkVisible} $delay="0.14s" $z={4}>
          <MockupImg src={ImgMockup} />
        </FadeInItem>

        <FadeInItem $visible={isLinkVisible} $delay="0.24s" $z={4}>
          <LinkBubbleImg src={ImgLinkBubble} />
        </FadeInItem>

        <FadeInItem $visible={isLinkVisible} $delay="0.34s" $z={4}>
          <SnsImg src={ImgSns} />
        </FadeInItem>
      </LinkShareSection>
    </>
  );
}

/* ---------------- styled ---------------- */

const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};

  ${({ $z }) =>
    $z &&
    `
    position: relative;
    z-index: ${$z};
  `}
`;

const ShareAlbumSection = styled.div`
  height: 57rem;
  align-self: stretch;
  display: flex;
  justify-content: center;
  background: #ffffff;
`;

const ShareAlbumInner = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AIGenerationSection = styled.div`
  height: 120.3125rem;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff7ee;
`;

const ExampleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 88.25rem;
  padding-top: 5rem;
`;

const RequestImg = styled.img`
  width: 44.75rem;
  height: 23.3125rem;
  align-self: end;
`;

const ResponseBox = styled.div`
  width: 20rem;
  padding: 1.65rem 1.65rem 1.65rem 8.25rem;
  border-radius: 1.875rem;
  border: 1px solid #e9e9e9;
  background: #ffbc67;
`;

const ResponseImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;
  border-radius: 1.25rem;

  &::after {
    content: "마우스를 올려보세요";
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    ${typo("h3")}
    color: ${color("black.70")};
    opacity: 1;
    transition: opacity 0.4s ease-in-out;
  }

  &:hover::after {
    opacity: 0;
  }
`;

const ResponseImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* ✅ 링크 공유 섹션 */
const LinkShareSection = styled.div`
  position: relative;
  width: 100%;
  height: 51.875rem;
  display: flex;
  flex-direction: column;
  background: #ffbc67;
  align-items: center;
  overflow: hidden; /* ⭐ 말풍선이 밖으로 나가면 안 보이게 */
`;

/* ✅ 말풍선 레이어(배경) */
const BubblesLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

/* ✅ 아래에서 위로 올라오며 나타났다 사라지는 애니메이션 */
const floatUp = keyframes`
  0% {
    transform: translateY(0) scale(0.85);
    opacity: 0;
  }
  10% {
    opacity: 0.18;
    transform: translateY(-20px) scale(1);
  }
  70% {
    opacity: 0.14;
  }
  100% {
    transform: translateY(-520px) scale(1);
    opacity: 0;
  }
`;

/* ✅ 크기/속도/딜레이/좌표만으로 다양하게 보이게 */
const FloatingBubble = styled.img`
  position: absolute;
  bottom: -140px;
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: auto;

  opacity: 0.14;
  filter: blur(0px);

  animation-name: ${floatUp};
  animation-duration: ${({ $duration }) => $duration};
  animation-delay: ${({ $delay }) => $delay};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  will-change: transform, opacity;
`;

/* ✅ 기존 컨텐츠는 말풍선보다 위 */
const MockupImg = styled.img`
  position: absolute;
  width: 51rem;
  margin-right: 450px;
  bottom: 0;
  z-index: 1;
`;

const LinkBubbleImg = styled.img`
  width: 32.0625rem;
  position: absolute;
  bottom: 10%;
  z-index: 2;
`;

const SnsImg = styled.img`
  width: 9rem;
  bottom: 9%;
  margin-right: 100px;
  position: absolute;
  z-index: 3;
`;
