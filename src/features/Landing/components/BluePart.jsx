import React from "react";
import FeatureInfo from "./FeatureInfo";
import styled from "styled-components";
import ImgMyHall1 from "../assets/img-myhall-example-1.png";
import ImgMyHall2 from "../assets/img-myhall-example-2.svg";

export default function BluePart() {
  return (
    <>
      <MyHallSection>
        <FeatureInfo
          title="나의 추모관"
          main="훗날, 남겨질 소중한 사람들에게 꼭 전하고 싶은 진심이 있나요?"
          sub={`나의 추모관을 개설해 보세요\n기억하고 싶은 내 삶의 순간들을 기록하고\n사랑하는 사람들에게 하고 싶었던 말을 편지로 남길 수 있어요`}
        />

        <MyhallImg1 src={ImgMyHall1} />
        <MyhallImg2 src={ImgMyHall2} />
      </MyHallSection>
    </>
  );
}

const MyHallSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
`;

const MyhallImg1 = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-85%);
  bottom: 0px;
  width: 48rem;
  z-index: 1;
`;

const MyhallImg2 = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(0%);
  margin-top: 8rem;
  width: 56rem;
  z-index: 2;
`;
