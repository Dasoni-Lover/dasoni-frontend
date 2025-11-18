// src/components/sidebar/MiniProflie.jsx
import React from "react";
import styled from "styled-components";
import profileimg from "../../assets/icon-profile-default.svg";
import { color, typo } from "../../styles/tokens";

// SideBarList 에서 name, profileImg 내려줌
// 로그인 안 되어 있으면 기본값(name='로그인 해주세요', profileImg=null)
const MiniProfile = ({ name, profileImg, isLogin }) => {
  const displayName = name || "로그인 해주세요";
  const imgSrc = profileImg || profileimg;

  return (
    <Box>
      <ProfileContainer>
        <ProfileImage src={imgSrc} alt="프로필 이미지" />
        <Nickname $isLogin={isLogin}>{displayName}</Nickname>
      </ProfileContainer>
    </Box>
  );
};

export default MiniProfile;

const Box = styled.div`
  display: flex;
  padding: 0 0.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 3px;
  object-fit: cover;
`;

const Nickname = styled.span`
  ${({ $isLogin }) => ($isLogin ? typo("h3") : typo("h4"))};
  color: ${color("black.50")};
`;
