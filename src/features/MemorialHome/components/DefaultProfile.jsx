import React from 'react';
import styled from 'styled-components';
import { color, typo } from "../../../styles/tokens";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { EditSmallPhotoBox } from "../../../components/photobox/EditSmallPhotoBox";
import defaultProfileImg from "../../../assets/icon-profile-default.svg";

const DefaultProfile = ({ name = "이름 없음", date = "", src, isEditable = false }) => {
  return (
    <Wrapper>
      <Box>
        <Name>{name}</Name>
        {date && <Date>{date}</Date>}
      </Box>

      {isEditable ? (
        <EditSmallPhotoBox src={src || defaultProfileImg} />
      ) : (
        <SmallPhotoBox src={src || defaultProfileImg} />
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
  gap: 2.25rem;
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
`;

const Date = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;


//수정버튼 있는 버전 : <DefaultProfile isEditable={true} /> 
