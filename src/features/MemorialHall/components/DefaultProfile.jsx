// src/features/MemorialHall/components/DefaultProfile.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { EditSmallPhotoBox } from "../../../components/photobox/EditSmallPhotoBox";
import defaultProfileImg from "../assets/icon-memorial-hall-profile-default.svg";
import HallInfoTag from "./HallInfoTag";
import { Row } from "../../../styles/flex";

const DefaultProfile = ({
  name = "이름 없음",
  birthday,
  deadday,
  src,
  isEditable = false,
  onFileSelect,
  place,
  phone,
  adminName,
  isMyHall = false, // 나의 추모관 여부 (기본 false)
}) => {
  const profileSrc = src || defaultProfileImg;

  const adminNamePhone =
    adminName && phone
      ? `${adminName} ${phone}`
      : adminName
      ? adminName
      : phone
      ? phone
      : "";

  // 이름: 나의 추모관이면 '故' 제거
  const displayName = isMyHall ? name : `故 ${name}`;

  // 날짜 포맷팅
  const formatDate = (birthday, deadday, isMyHall) => {
    if (!birthday) return "";

    const birthStr = `${birthday}.`; // 생일 뒤에 항상 점 추가

    // 나의 추모관: "생일. ~" 형식만 표시
    if (isMyHall) {
      return `${birthStr} ~`;
    }

    // 일반 추모관: 생일과 기일 모두 있으면 "생일. ~ 기일." 형식
    if (deadday) {
      const deathStr = `${deadday}.`;
      return `${birthStr} ~ ${deathStr}`;
    }

    // 기일이 없으면 생일만
    return birthStr;
  };

  const dateText = formatDate(birthday, deadday, isMyHall);

  return (
    <Wrapper>
      <Box>
        <Name>{displayName}</Name>
        {dateText && <Date>{dateText}</Date>}
        <Row gap={"1rem"}>
          {place && <HallInfoTag title="모신 곳" content={place} />}
          {phone && (
            <HallInfoTag title="관련 연락처" content={adminNamePhone} />
          )}
        </Row>
      </Box>

      {isEditable ? (
        <EditSmallPhotoBox src={profileSrc} onFileSelect={onFileSelect} />
      ) : (
        <PhotoWrapper>
          <Img src={profileSrc} alt="photo" />
        </PhotoWrapper>
      )}
    </Wrapper>
  );
};

export default DefaultProfile;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Name = styled.div`
  ${typo("h1")};
  color: ${color("black.70")};
  margin-bottom: 0.5rem;
`;

const Date = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const PhotoWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Img = styled.img`
  display: flex;
  width: 22.5rem;
  height: 22.5rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  border: solid 2px #e9e9e9;
`;
