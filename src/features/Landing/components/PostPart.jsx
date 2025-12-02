// src/features/Landing/components/PostPart.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import FeatureInfo from "./FeatureInfo";

// 편지 예시 이미지들
import ImgLetter1 from "../assets/img-letter-example-1.svg";
import ImgLetter2 from "../assets/img-letter-example-2.svg";
import ImgLetter3 from "../assets/img-letter-example-3.svg";
import ImgLetter4 from "../assets/img-letter-example-4.svg";
import ImgLetter5 from "../assets/img-letter-example-5.svg";
import ImgLetter6 from "../assets/img-letter-example-6.svg";
import ImgTape from "../assets/img-tape.svg";
import { Row } from "../../../styles/flex";

const letterImages = [
  ImgLetter1,
  ImgLetter2,
  ImgLetter3,
  ImgLetter4,
  ImgLetter5,
  ImgLetter6,
];

export default function PostPart() {
  return (
    <>
      <WriteLetterSection>
        <FeatureInfo
          title="편지 쓰기"
          main="보고픈 마음을 담아 고인께 편지를 남겨보세요"
        />

        <ExampleWrapper>
          {letterImages.map((src, index) => (
            <LetterItem key={index} $index={index}>
              <LetterImg src={src} alt={`letter-example-${index + 1}`} />
            </LetterItem>
          ))}
        </ExampleWrapper>
      </WriteLetterSection>

      <ResponseLetterSection>
        <FeatureInfo
          align="left"
          title="편지 답장"
          main="고인의 목소리로 재현한 AI 음성 편지를 받을 수 있어요"
          sub={`고인이 보고 싶은 날, \n 편지에 대한 답장으로  AI 음성 편지를 배달해 드릴게요. \n 나를 부르던 다정한 애칭, 우리가 나눴던 사소한 추억들을 그리운 모습과 목소리로 다시 만날 수 있어요.`}
        />
        <Row
          $align={"center"}
          $justify={"space-between"}
          style={{ paddingRight: "10rem", marginTop: "10rem" }}
        >
          <LetterInfoText>
            실제 故ㅇㅇㅇ씨의 음성으로 재현한 테스트 편지입니다.
          </LetterInfoText>
          <TapeImg src={ImgTape} />
        </Row>
      </ResponseLetterSection>
    </>
  );
}

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
  --carousel-item-width: 56rem;
  --carousel-item-height: 32rem;
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
  height: auto; /* 👉 SVG 원본 크기 유지 */
`;

const ResponseLetterSection = styled.div`
  width: 100%;
  padding-top: 5rem;
  padding-left: 14rem;
  width: 100%;
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

const TapeImg = styled.img`
  width: 45.8125rem;
`;
