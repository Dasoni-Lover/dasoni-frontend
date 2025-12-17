import React from "react";
import FeatureInfo from "./FeatureInfo";
import styled from "styled-components";
import ImgMyHall from "../assets/img-myhall-example.svg";

export default function BluePart() {
  return (
    <>
      <MyHallSection>
        <FeatureInfo
          title="나의 추모관"
          main="훗날, 남겨질 소중한 사람들에게 꼭 전하고 싶은 진심이 있나요?"
          sub={`나의 추모관을 개설해 보세요\n기억하고 싶은 내 삶의 순간들을 기록하고\n사랑하는 사람들에게 하고 싶었던 말을 편지로 남길 수 있어요`}
        />
        <MyhallImg src={ImgMyHall} />
      </MyHallSection>
    </>
  );
}

const MyHallSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
`;

const MyhallImg = styled.img`
  margin-top: 8rem;
  width: 91.1875rem;
`;
