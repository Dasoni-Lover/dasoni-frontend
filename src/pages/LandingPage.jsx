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
import FeatureInfo from "../features/Landing/components/FeatureInfo";
import ShareAlbumCarousel from "../features/Landing/components/ShareAlbumCarousel"; // ✅ 추가

export default function LandingPage() {
  const [bgMode, setBgMode] = useState("default");

  return (
    <>
      <Container $bgMode={bgMode}>
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

        <HoverSection>
          <RainbowImg src={ImgRainbow} />

          <BlueHouseImg
            src={ImgBlueHouse}
            onMouseEnter={() => setBgMode("blue")}
            onMouseLeave={() => setBgMode("default")}
          />

          <OrangeHouseImg
            src={ImgOrangeHouse}
            onMouseEnter={() => setBgMode("orange")}
            onMouseLeave={() => setBgMode("default")}
          />

          <PostBoxImg
            src={ImgPostBox}
            onMouseEnter={() => setBgMode("post")}
            onMouseLeave={() => setBgMode("default")}
          />
        </HoverSection>

        {/* 공유앨범 섹션 */}
        <ShareAlbumSection>
          <ShareAlbumInner>
            <FeatureInfo
              title="공유앨범"
              main="고인과의 추억이 담긴 사진을 앨범에 올려주세요"
              sub="추모관에 방문한 추모객들과 함께 따뜻했던 추억을 나눌 수 있어요"
            />

            {/* 👉 캐러셀 컴포넌트 사용 */}
            <ShareAlbumCarousel />
          </ShareAlbumInner>
        </ShareAlbumSection>

        <AIGenerationSection>
          <FeatureInfo
            highlight={true}
            title="AI 사진 생성"
            main="함께한 순간의 사진이 남아있지 않아 아쉬우신가요?"
            sub={`혹은 함께하지 못해 상상만 했던 순간이 있나요? \n 기억 속의 장면을 AI로 직접 만들어 보세요.`}
          />
        </AIGenerationSection>

        <LinkShareSection>
          <FeatureInfo
            title="링크 공유"
            main="추모관 링크를 공유해 주세요"
            sub={`지인들과 함께 추모할 수 있어요 \n그리움은 나눌수록 따뜻한 위로가 됩니다`}
          />
        </LinkShareSection>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6.25rem;
  height: 324rem;
  transition: background 0.35s ease;

  ${({ $bgMode }) =>
    $bgMode === "default" &&
    css`
      background: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 56.83%,
          #ffc085 89.65%
        ),
        #d9d9d9;
    `}

  ${({ $bgMode }) =>
    $bgMode === "orange" &&
    css`
      background: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 56.83%,
          #ffc085 89.65%
        ),
        #d9d9d9;
    `}

  ${({ $bgMode }) =>
    $bgMode === "blue" &&
    css`
      background: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 67.81%,
          #a877c4 100%
        ),
        #d9d9d9;
    `}

  ${({ $bgMode }) =>
    $bgMode === "post" &&
    css`
      background: radial-gradient(
          279.82% 89.28% at 52.53% 69.51%,
          #fff 69.43%,
          #f4938c 87.92%
        ),
        #d9d9d9;
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

const HoverBase = css`
  position: absolute;
  opacity: 0.3;
  filter: grayscale(20%);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.05);
    opacity: 1;
    filter: grayscale(0%);
    z-index: 10;
  }
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

/* 공유앨범 섹션 스타일 */
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
  background: #fff7ee;
`;

const LinkShareSection = styled.div`
  height: 51.875rem;
  align-self: stretch;
  background: #fff;
`;
