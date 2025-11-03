import React from 'react';
import profileimg from "../../../assets/profile-img.png";
import styled from 'styled-components';
import { color, typo } from "../../../styles/tokens";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { EditSmallPhotoBox } from "../../../components/photobox/EditSmallPhotoBox";

const DefaultProfile = ({ isEditable = false }) => {
  return (
    <Wrapper>
      <Box>
        <Name>박영수</Name>
        <Date>1993. 2. 11 ~ 2021. 4. 24</Date>
      </Box>

      {isEditable ? (
        <EditSmallPhotoBox src={profileimg} />
      ) : (
        <SmallPhotoBox src={profileimg} />
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
