import React, { useState } from "react";
import styled from "styled-components";
import { color,typo } from "../../../styles/tokens";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BarNavigate from "../../../components/BarNavigate";
import Profile from "../components/Profile";
import HallTab from "../components/HallTab";
import TabButtonDropdown from "../components/TabButtonDropdown";
import BoxPostList from "../components/BoxPostList";
import SideBar from "../../../components/sidebar/SideBar";
import LetterAndLinkShare from "../components/LetterAndLinkShare";
import AddPostButtonImg from "../assets/addpost-btn.png";
import foldericon from "../assets/folder-icon.png";
import aiicon from "../assets/ai-icon.png";
import LinkShareModal from "../components/LinkShareModal";
import modifyicon from "../../../assets/edit-btn.svg"

export const MemorialManagerHomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false); // 모달 상태

  return (
    <Wrapper>
      <Header />
      <SideBar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <ContentWrapper isOpen={isOpen}>
        <BarWrapper>
          <BarNavigate />
        </BarWrapper>

        <Title>故 박영수의 추모관</Title>
        <ModifyButton>
            <ModifyIcon src={modifyicon}/>
            <ModifyText>프로필 수정</ModifyText>
        </ModifyButton>

        <Content>
          <Profile />
          <HallTab role="manager" />
          <TabButtonDropdown />
          <BoxPostList />
        </Content>
      </ContentWrapper>

      {/* 우측 고정 버튼 */}
      <FixedShareButton>
        <LetterAndLinkShare
          onLinkShareClick={() => setIsLinkShareModalOpen(true)} // 버튼 클릭 시 모달 열기
        />
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

      {/* 모달 */}
      {isLinkShareModalOpen && (
        <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
      )}

      <Footer />
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;
  margin-top: 6.25rem;
  flex: 1; /* footer 위 공간 채우기 */

  @media (max-width: 1200px) {
    align-items: flex-start;
    margin-left: ${({ isOpen }) =>
      isOpen ? "calc(300px + 40px)" : "calc(60px + 0px)"};
  }
`;

const BarWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Title=styled.div`
    ${typo("h2")};
  color: ${color("black.70")};
  width: 1096px;
  text-align: left;
  margin-bottom: 52px;
  padding: 8px 20px 8px 16px;

`

const ModifyButton=styled.div`
    width: 1096px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
const ModifyIcon=styled.img`
    width: 24px;
    height: 24px;
    padding: 6px;
`
const ModifyText=styled.div`
    ${typo("h4")};
    color: ${color("black.70")};

`

const Content = styled.div`
  width: 1096px;
  transition: all 0.3s ease;
`;

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
  padding: 0 0.8125rem;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  width: 13.75rem;
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
  height: 2.1rem;
  flex-shrink: 0;
`;
