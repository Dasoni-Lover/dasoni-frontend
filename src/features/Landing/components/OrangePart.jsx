// src/features/Landing/components/OrangePart.jsx
import React from "react";
import styled from "styled-components";
import FeatureInfo from "./FeatureInfo";
import ShareAlbumCarousel from "./ShareAlbumCarousel";

import ImgRequest1 from "../assets/img-request-example-1.svg";
import ImgResponse1 from "../assets/img-response-example-1.svg";
import { color, typo } from "../../../styles/tokens";

export default function OrangePart() {
  return (
    <>
      {/* 공유앨범 섹션 */}
      <ShareAlbumSection>
        <ShareAlbumInner>
          <FeatureInfo
            title="공유앨범"
            main="고인과의 추억이 담긴 사진을 앨범에 올려주세요"
            sub="추모관에 방문한 추모객들과 함께 따뜻했던 추억을 나눌 수 있어요"
          />
          <ShareAlbumCarousel />
        </ShareAlbumInner>
      </ShareAlbumSection>

      {/* AI 사진 생성 */}
      <AIGenerationSection>
        <FeatureInfo
          highlight={true}
          title="AI 사진 생성"
          main="함께한 순간의 사진이 남아있지 않아 아쉬우신가요?"
          sub={`혹은 함께하지 못해 상상만 했던 순간이 있나요? \n 기억 속의 장면을 AI로 직접 만들어 보세요.`}
        />

        <ExampleWrapper>
          <RequestImg src={ImgRequest1} />
          <ResponseBox>
            <ResponseImgWrapper>
              <ResponseImg src={ImgResponse1} />
            </ResponseImgWrapper>
          </ResponseBox>

          <RequestImg src={ImgRequest1} />
          <ResponseBox>
            <ResponseImgWrapper>
              <ResponseImg src={ImgResponse1} />
            </ResponseImgWrapper>
          </ResponseBox>
        </ExampleWrapper>
      </AIGenerationSection>

      {/* 링크 공유 */}
      <LinkShareSection>
        <FeatureInfo
          title="링크 공유"
          main="추모관 링크를 공유해 주세요"
          sub={`지인들과 함께 추모할 수 있어요 \n그리움은 나눌수록 따뜻한 위로가 됩니다`}
        />
      </LinkShareSection>
    </>
  );
}

/* ---------------- styled ---------------- */

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

const LinkShareSection = styled.div`
  height: 51.875rem;
  display: flex;
  background: #fff;
`;
