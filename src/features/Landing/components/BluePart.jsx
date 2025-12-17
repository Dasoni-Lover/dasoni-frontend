import React, { useEffect, useRef, useState } from "react";
import FeatureInfo from "./FeatureInfo";
import styled from "styled-components";
import ImgMyHall1 from "../assets/img-myhall-example-1.png";
import ImgMyHall2 from "../assets/img-myhall-example-2.svg";

export default function BluePart() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible(true);
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

  return (
    <MyHallSection ref={sectionRef}>
      {/* 텍스트 영역은 일반 Fade */}
      <FadeInItem $visible={isVisible} $delay="0.3s">
        <FeatureInfo
          title="나의 추모관"
          main="훗날, 남겨질 소중한 사람들에게 꼭 전하고 싶은 진심이 있나요?"
          sub={`나의 추모관을 개설해 보세요\n기억하고 싶은 내 삶의 순간들을 기록하고\n사랑하는 사람들에게 하고 싶었던 말을 편지로 남길 수 있어요`}
        />
      </FadeInItem>

      {/* ✅ absolute 요소는 AbsoluteFade로 */}
      <AbsoluteFade $visible={isVisible} $delay="0.5s">
        <MyhallImg1 src={ImgMyHall1} />
      </AbsoluteFade>

      <AbsoluteFade $visible={isVisible} $delay="0.7s">
        <MyhallImg2 src={ImgMyHall2} />
      </AbsoluteFade>
    </MyHallSection>
  );
}

/* ---------------- styled ---------------- */

const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
  will-change: transform, opacity;
`;

/* 🔑 absolute 요소용 fade wrapper */
const AbsoluteFade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};

  & > * {
    pointer-events: auto;
  }
`;

const MyHallSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80.1875rem;
`;

const MyhallImg1 = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-85%);
  bottom: 30%;
  width: 48rem;
  z-index: 1;
`;

const MyhallImg2 = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-15%);
  bottom: 15%;
  width: 56rem;
  z-index: 2;
`;
