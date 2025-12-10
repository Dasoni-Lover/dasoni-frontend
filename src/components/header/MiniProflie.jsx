// src/components/header/MiniProflie.jsx
import React from "react";
import styled from "styled-components";
import profiledefaultimg from "../../assets/icon-profile-default.png";
import { color, typo } from "../../styles/tokens";

// 로그인 안 되어 있으면 기본값(name='로그인 해주세요', profileImg=null)
const MiniProfile = ({ name, profileImg, isLogin }) => {
  const displayName = name || "로그인 해주세요";
  const imgSrc = profileImg || profiledefaultimg;

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
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.1875rem;
  object-fit: cover;
`;

const Nickname = styled.span`
  ${({ $isLogin }) => ($isLogin ? typo("h3") : typo("h4"))};
  color: ${color("black.50")};
  white-space: nowrap;
`;
