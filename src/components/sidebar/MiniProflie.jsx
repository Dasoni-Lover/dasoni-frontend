import React from "react";
import styled from "styled-components";
import profileimg from "../../assets/profile-img.png"; // 실제 경로에 맞게 수정 필요
import { color,typo } from "../../styles/tokens";


const MiniProfile = () => {
  return (
    <Box>
      <ProfileContainer>
        <ProfileImage src={profileimg} alt="프로필 이미지" />
        <Nickname>박영진</Nickname>
      </ProfileContainer>
    </Box>
  );
};

export default MiniProfile;


const Box = styled.div`
  display: flex;
  padding: 0 8px;
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 3px;
  object-fit: cover;
`;


const Nickname = styled.span`
  ${typo("h3")};
  color: ${color("black.50")};
`;
