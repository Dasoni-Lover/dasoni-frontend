// src/features/MemorialHall/components/DefaultProfile.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { EditSmallPhotoBox } from "../../../components/photobox/EditSmallPhotoBox";
import defaultProfileImg from "../../../assets/icon-profile-default.svg";
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

  return (
    <Wrapper>
      <Box>
        <Name>故 {name}</Name>
        {birthday && (
          <Date>
            {birthday}. ~ {deadday}.
          </Date>
        )}
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
