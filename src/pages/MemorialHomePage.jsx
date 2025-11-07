import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";
import { useNavigate } from "react-router-dom";
import { getPhotos, getHallInfo } from "../api/memorial";

import BarNavigate from "../components/BarNavigate";
import Profile from "../features/MemorialHome/components/Profile";
import HallTab from "../features/MemorialHome/components/HallTab";
import BoxPostList from "../features/MemorialHome/components/BoxPostList";
import LetterAndLinkShare from "../features/MemorialHome/components/LetterAndLinkShare";
import LinkShareModal from "../features/MemorialHome/components/LinkShareModal";
import PostDetailModal from "../features/MemorialHome/components/PostDetailModal";

import AddPostButtonImg from "../features/MemorialHome/assets/addpost-btn.png";
import foldericon from "../features/MemorialHome/assets/folder-icon.png";
import aiicon from "../features/MemorialHome/assets/ai-icon.png";

const MemorialHomePage = ({ hallId = 1 }) => {
  const [photos, setPhotos] = useState([]);
  const [hallInfo, setHallInfo] = useState(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const nav = useNavigate();

  // 🔹 탭에 따라 요청 바디 변경
  const tabOptions = [
    { isPrivate: false, isBydate: true, isAI: false }, // 공유앨범
    { isPrivate: true, isBydate: true, isAI: false },  // 나와의 앨범
  ];

  // 🔹 탭 클릭 시 사진 불러오기
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos(hallId, tabOptions[activeTab]);
        setPhotos(data);
      } catch (err) {
        console.error("사진 불러오기 실패:", err);
      }
    };
    fetchPhotos();
  }, [activeTab, hallId]);

  // 🔹 추모관 정보 불러오기
  useEffect(() => {
    const fetchHallInfo = async () => {
      try {
        const data = await getHallInfo(hallId);
        setHallInfo(data);
      } catch (err) {
        console.error("추모관 정보 불러오기 실패:", err);
      }
    };
    fetchHallInfo();
  }, [hallId]);

  return (
    <Container>
      <BarWrapper>
        <BarNavigate />
      </BarWrapper>

      <Content>
        {hallInfo && <Profile data={hallInfo.data} />}
        <HallTab activeIndex={activeTab} setActiveIndex={setActiveTab} />
        <BoxPostList
          photos={photos}
          onPostClick={(photo) => setSelectedPhoto(photo)}
        />
      </Content>

      <FixedShareButton>
        <LetterAndLinkShare onLinkShareClick={() => setIsLinkShareModalOpen(true)} />
      </FixedShareButton>

      <FixedAddPostContainer>
        {isAddMenuOpen && (
          <FixedAddPostMenu>
            <MenuButton onClick={() => nav("/generate")}>
              <MenuIcon src={aiicon} alt="AI 이미지 생성" />
              <span>AI 이미지 생성</span>
            </MenuButton>
            <MenuButton onClick={() => nav("/write")}>
              <MenuIcon src={foldericon} alt="사진 업로드" />
              <span>컴퓨터에서 불러오기</span>
            </MenuButton>
          </FixedAddPostMenu>
        )}

        <FixedAddPostButton onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}>
          <img src={AddPostButtonImg} alt="추가 버튼" />
        </FixedAddPostButton>
      </FixedAddPostContainer>

      <PostDetailModal
        isOpen={!!selectedPhoto}
        post={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {isLinkShareModalOpen && (
        <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
      )}
    </Container>
  );
};

export default MemorialHomePage;

// 🎨 스타일 동일 (생략)


const Container=styled.div`
  position: relative;
`

const BarWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;

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
  border: 1px solid var(--5, #E9E9E9);
  border-radius: 5px;
  background: #FFBC67;
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
