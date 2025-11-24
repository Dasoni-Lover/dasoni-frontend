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
        <Row gap={"1rem"} style={{ marginTop: "0.75rem" }}>
          {place && <HallInfoTag title="모신 곳" content={place} />}
          {phone && (
            <HallInfoTag title="관련 연락처" content={adminNamePhone} />
          )}
        </Row>
      </Box>

      {isEditable ? (
        <EditSmallPhotoBox src={profileSrc} onFileSelect={onFileSelect} />
      ) : (
        <SmallPhotoBox src={profileSrc} />
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
  gap: 0.5rem;
`;

const Name = styled.div`
  ${typo("h1")};
  color: ${color("black.70")};
`;

const Date = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;
