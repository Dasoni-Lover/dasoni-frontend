import React, { useState } from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";
import Footer from "../components/Footer";
import BarNavigate from "../components/BarNavigate";
import Profile from "../features/MemorialHome/components/Profile";
import HallTab from "../features/MemorialHome/components/HallTab";
import TabButtonDropdown from "../features/MemorialHome/components/TabButtonDropdown";
import BoxPostList from "../features/MemorialHome/components/BoxPostList";
import LetterAndLinkShare from "../features/MemorialHome/components/LetterAndLinkShare";
import AddPostButtonImg from "../features/MemorialHome/assets/addpost-btn.png";
import foldericon from "../features/MemorialHome/assets/folder-icon.png";
import aiicon from "../features/MemorialHome/assets/ai-icon.png";
import LinkShareModal from "../features/MemorialHome/components/LinkShareModal";
import { useNavigate } from "react-router-dom";
import PostDetailModal from "../features/MemorialHome/components/PostDetailModal";

const MemorialHomePage = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const nav = useNavigate();

  // 🔹 목데이터 (BoxPostList에도 동일하게 유지)
  const posts = [
    {
      id: 1,
      image: "/img1.jpg",
      title: "2001년 3월 5일",
      content: "오래된 앨범에서 영수 어린 시절 사진을 꺼내보았다...",
      writtenDate: "2022년 2월 25일 작성함",
      authorName: "박영진",
    },
    {
      id: 2,
      image: "/img2.jpg",
      title: "다른 추억",
      content: "또 다른 내용...",
      writtenDate: "",
    },
    {
      id: 3,
      image: "/img3.jpg",
      title: "소중한 하루",
      content: "내용...",
      writtenDate: "",
    },
    {
      id: 4,
      image: "/img4.jpg",
      title: "기억",
      content: "내용...",
      writtenDate: "",
    },
    {
      id: 5,
      image: "/img5.jpg",
      title: "행복했던 날",
      content: "내용...",
      writtenDate: "",
    },
  ];

  const goWritePage = () => nav("/write");
  const goAIGeneratePage = () => nav("/generate");

  const handlePrev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : posts.length - 1));
    setSelectedPost(posts[(currentIndex - 1 + posts.length) % posts.length]);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i < posts.length - 1 ? i + 1 : 0));
    setSelectedPost(posts[(currentIndex + 1) % posts.length]);
  };

  return (
    <Container>
      <BarWrapper>
        <BarNavigate />
      </BarWrapper>
      <Content>
        <Profile />
        <HallTab />
        <TabButtonDropdown />
        <BoxPostList
          onPostClick={(post) => {
            const index = posts.findIndex((p) => p.id === post.id);
            setSelectedPost(post);
            setCurrentIndex(index);
          }}
        />
      </Content>

      <FixedShareButton>
        <LetterAndLinkShare
          onLinkShareClick={() => setIsLinkShareModalOpen(true)}
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

      {/* 🔹 좌우 이동 기능 포함된 모달 */}
      <PostDetailModal
        isOpen={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLinkShareModalOpen && (
        <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
      )}

      <Footer />
    </Container>
  );
};

export default MemorialHomePage;

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
