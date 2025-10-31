import React, { useState } from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";

import Header from "../components/Header";
import BarNavigate from "../components/BarNavigate";
import Profile from "../features/MemorialHome/components/Profile";
import HallTab from "../features/MemorialHome/components/HallTab";
import TabButtonDropdown from "../features/MemorialHome/components/TabButtonDropdown";
import BoxPostList from "../features/MemorialHome/components/BoxPostList";
import SideBar from "../components/sidebar/SideBar";
import LetterAndLinkShare from "../features/MemorialHome/components/LetterAndLinkShare";
import AddPostButtonImg from "../features/MemorialHome/assets/addpost-btn.png";
import foldericon from "../features/MemorialHome/assets/folder-icon.png";
import aiicon from "../features/MemorialHome/assets/ai-icon.png";

const MemorialHomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  return (
    <Wrapper>
      <Header />
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <ContentWrapper isOpen={isOpen}>
        <BarWrapper>
          <BarNavigate />
        </BarWrapper>

        <Content>
          <Profile />
          <HallTab />
          <TabButtonDropdown />
          <BoxPostList />
        </Content>
      </ContentWrapper>

      <FixedShareButton>
        <LetterAndLinkShare />
      </FixedShareButton>

      <FixedAddPostContainer>
        {isAddMenuOpen && (
          <FixedAddPostMenu>
            <MenuButton>
              <MenuIcon src={aiicon} alt="AI 이미지 생성" />
              <span>AI 이미지 생성</span>
            </MenuButton>
            <MenuButton>
              <MenuIcon src={foldericon} alt="사진 업로드" />
              <span>컴퓨터에서 불러오기</span>
            </MenuButton>
          </FixedAddPostMenu>
        )}

        <FixedAddPostButton onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}>
          <img src={AddPostButtonImg} alt="추가 버튼" />
        </FixedAddPostButton>
      </FixedAddPostContainer>

      <Footer />
    </Wrapper>
  );
};

export default MemorialHomePage;


const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;
  margin-top: 6.25rem;

  @media (max-width: 1200px) {
    align-items: flex-start;
    margin-left: ${({ isOpen }) =>
      isOpen ? "calc(300px + 40px)" : "calc(60px + 0px)"};
  }
`;

const BarWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Content = styled.div`
  width: 1096px;
  transition: all 0.3s ease;
`;

// 우측 fixed 요소들

const FixedShareButton = styled.div`
  position: fixed;
  right: 135px;
  top: 192px;
  z-index: 1000;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FixedAddPostContainer = styled.div`
  position: fixed;
  right: 148px;
  top: 788px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FixedAddPostButton = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;

  img {
    width: 128px;
    height: 128px;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const FixedAddPostMenu = styled.div`
  position: absolute;
  bottom: 160px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: slideUp 0.25s ease forwards;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px) translateX(50%);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateX(50%);
    }
  }
`;

const MenuButton = styled.button`
  display: flex;
  padding: 0 13px;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 220px;
  border: 1px solid #313131;
  border-radius: 5px;
  background: #313131;
  color: white;
  ${typo("h4")};
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.39);

  span {
    flex: 1;
    text-align: center;
  }
`;

const MenuIcon = styled.img`
  height: 33px;
  flex-shrink: 0;
`;

const Footer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
`;
