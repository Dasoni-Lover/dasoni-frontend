// src/features/MemorialHome/pages/MemorialMyHomePage.jsx (경로는 프로젝트에 맞게)
import React, { useState } from "react";
import styled from "styled-components";
import { typo } from "../../../styles/tokens";
import { useNavigate } from "react-router-dom";

import Footer from "../../../components/Footer";
import BarNavigate from "../../../components/BarNavigate";
import DefaultProfile from "../components/DefaultProfile";
import HallTab from "../components/HallTab";
import TabButtonDropdown from "../components/TabButtonDropdown";
import LetterAndLinkShare from "../components/LetterAndLinkShare";
import AddPostButtonImg from "../assets/addpost-btn.png";
import foldericon from "../assets/folder-icon.png";
import aiicon from "../assets/ai-icon.png";
import LinkShareModal from "../components/LinkShareModal";
import { NoPost } from "../components/NoPost";
import MyMemorialModal from "../components/MyMemorialModal";
import { createMyHall } from "../../../api/my-hall"; // ✅ 본인 추모관 개설 API

const MemorialMyHomePage = () => {
  const nav = useNavigate();

  // ✅ localStorage 기반 초기값: 이미 개설한 적 있으면 true
  const [hasMemorialHome, setHasMemorialHome] = useState(() => {
    const stored = localStorage.getItem("hasMyMemorialHome");
    return stored === "true";
  });

  // ✅ 존재하지 않을 경우에만 모달 오픈 (초기 한 번만 판단)
  const [isModalOpen, setIsModalOpen] = useState(() => {
    const stored = localStorage.getItem("hasMyMemorialHome");
    return stored === "true" ? false : true;
  });

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // ✅ 중복 클릭 방지용

  const goWritePage = () => nav("/write");
  const goAIGeneratePage = () => nav("/generate");

  // ✅ "나의 추모관 개설하기" 버튼 클릭 시
  const handleCreateClick = async () => {
    if (isCreating || hasMemorialHome) return;

    try {
      setIsCreating(true);

      const res = await createMyHall(); // POST /api/halls/me/create
      const hallId = res?.hallId;

      // ✅ 한 번 개설 후부터는 영구적으로 모달 안 뜨게
      setHasMemorialHome(true);
      setIsModalOpen(false);
      localStorage.setItem("hasMyMemorialHome", "true");

      if (hallId) {
        localStorage.setItem("myHallId", String(hallId));
      }
    } catch (error) {
      console.error("본인 추모관 개설 실패:", error);
      // 필요하면 alert 추가 가능 (UI 텍스트 자체는 건들지 않음)
      // alert("추모관 개설에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container>
      {/* 메인 콘텐츠는 항상 렌더링되며 모달이 열리면 흐려짐 */}
      <BlurWrapper $blur={isModalOpen}>
        <BarWrapper>
          <BarNavigate />
        </BarWrapper>

        <ContentWrapper>
          <Content>
            <ProfileBox>
              {/* ✅ hasMemorialHome에 따라 수정 가능 여부만 제어 (UI는 그대로) */}
              <DefaultProfile isEditable={hasMemorialHome} />
            </ProfileBox>
            <HallTab role="owner" />
            <TabButtonDropdown />
            <NoPost />
          </Content>
        </ContentWrapper>

        <FixedShareButton>
          <LetterAndLinkShare
            onLinkShareClick={() => setIsLinkShareModalOpen(true)} page="my"
          />
        </FixedShareButton>

        <FixedAddPostContainer>
          {isAddMenuOpen && (
            <FixedAddPostMenu>
              <MenuButton onClick={goAIGeneratePage}>
                <MenuIcon src={aiicon} alt="AI 이미지 생성" />
                <span>AI 이미지 생성</span>
              </MenuButton>
              <MenuButton onClick={goWritePage}>
                <MenuIcon src={foldericon} alt="사진 업로드" />
                <span>컴퓨터에서 불러오기</span>
              </MenuButton>
            </FixedAddPostMenu>
          )}

          <FixedAddPostButton onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}>
            <img src={AddPostButtonImg} alt="추가 버튼" />
          </FixedAddPostButton>
        </FixedAddPostContainer>

        {isLinkShareModalOpen && (
          <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
        )}

        {/* Footer import는 이미 되어 있으니 필요하면 아래에 사용 가능 */}
        {/* <Footer /> */}
      </BlurWrapper>

      {/* 모달은 항상 페이지 위에 표시됨 */}
      {isModalOpen && (
        <MyMemorialModal
          isOpen={isModalOpen}
          onCreateClick={handleCreateClick} // ✅ 실제 API 호출 연결
        />
      )}
    </Container>
  );
};

export default MemorialMyHomePage;

const Container = styled.div`
  position: relative;
`;

const BlurWrapper = styled.div`
  filter: ${({ $blur }) => ($blur ? "blur(4px)" : "none")};
  transition: filter 0.2s ease;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  flex: 1;
  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;

const BarWrapper = styled.div`
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

const ProfileBox = styled.div`
  margin-bottom: 52px;
`;

const FixedShareButton = styled.div`
  position: absolute;
  right: -380px;
  top: 160px;
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
  border: 1px solid var(--5, #e9e9e9);
  border-radius: 5px;
  background: #ffbc67;
  color: #313131;
  ${typo("h4")};
  cursor: pointer;
  box-shadow: 0 0 7.6px 0 rgba(0, 0, 0, 0.18);

  span {
    flex: 1;
    text-align: center;
  }
`;

const MenuIcon = styled.img`
  height: 2.1rem;
  flex-shrink: 0;
`;
