// src/pages/MemorialHomePage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";
import { getPhotos, getHallInfo, getPhotoDetail } from "../api/memorial";

import BarNavigate from "../components/BarNavigate";
import Profile from "../features/MemorialHome/components/Profile";
import HallTab from "../features/MemorialHome/components/HallTab";
import BoxPostList from "../features/MemorialHome/components/BoxPostList";
import LetterAndLinkShare from "../features/MemorialHome/components/LetterAndLinkShare";
import LinkShareModal from "../features/MemorialHome/components/LinkShareModal";
import PostDetailModal from "../features/MemorialHome/components/PostDetailModal";
import TabButtonDropdown from "../features/MemorialHome/components/TabButtonDropdown";

import AddPostButtonImg from "../features/MemorialHome/assets/btn-add-post.svg";
import foldericon from "../features/MemorialHome/assets/folder-icon.png";
import aiicon from "../features/MemorialHome/assets/ai-icon.png";

const MemorialHomePage = () => {
  const nav = useNavigate();
  const location = useLocation();

  // ✅ Home 카드에서 넘어올 때 state로 전달된 hallId 사용, 없으면 1
  const hallId = location.state?.hallId ?? 1;

  const [photos, setPhotos] = useState([]);
  const [hallInfo, setHallInfo] = useState(null);
  const [filter, setFilter] = useState({
    sortOption: "최신 업로드순",
    isAIMode: false,
  });
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // 모달에서 현재 몇 번째인지
  const [activeTab, setActiveTab] = useState(0); // 0: 공유앨범, 1: 나와의 앨범
  const [reloadKey, setReloadKey] = useState(0); // ✅ 삭제 후 리렌더 트리거

  // ✅ 사진 불러오기 (isMine / isPrivate 반영)
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const isShareTab = activeTab === 0;
        const isMyTab = activeTab === 1;

        // 👉 요구사항:
        // - 나와의 앨범: isMine = true
        // - 공유 앨범: isPrivate = false
        const requestBody = {
          isBydate: true,
          isAI: false,
          isPrivate: isShareTab ? false : true, // 공유앨범일 때 false, 나머지는 true
          isMine: isMyTab, // 나와의 앨범일 때 true, 공유앨범일 때 false
        };

        console.log("📸 사진 조회 요청 (visitor):", {
          hallId,
          activeTab,
          requestBody,
          reloadKey,
        });

        const data = await getPhotos(hallId, requestBody);
        setPhotos(data);
      } catch (err) {
        console.error("사진 불러오기 실패:", err);
      }
    };

    fetchPhotos();
  }, [activeTab, hallId, reloadKey]); // ✅ reloadKey 추가

  // ✅ 정렬 및 AI 필터 적용 (isPrivate / isMine은 서버에서 필터됨)
  const filteredPhotos = React.useMemo(() => {
    let result = [...photos];

    if (filter.isAIMode) {
      result = result.filter((p) => p.isAI);
    }

    switch (filter.sortOption) {
      case "최신 업로드순":
        result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      case "오래된 업로드순":
        result.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        break;
      case "최신 사진순":
        result.sort((a, b) => new Date(b.takenDate) - new Date(a.takenDate));
        break;
      case "오래된 사진순":
        result.sort((a, b) => new Date(a.takenDate) - new Date(b.takenDate));
        break;
      default:
        break;
    }

    return result;
  }, [photos, filter]);

  // ✅ 추모관 정보 불러오기
  useEffect(() => {
    const fetchHallInfo = async () => {
      try {
        const data = await getHallInfo(hallId);
        setHallInfo(data);
      } catch (err) {
        console.error("추모관 정보 불러오기 실패:", err);
      }
    };
    console.log("현재 hallId:", hallId);
    fetchHallInfo();
  }, [hallId]);

  // ✅ BarNavigate에 쓸 추모관 제목 (고인 이름 기반)
  const hallTitle = hallInfo?.data?.name
    ? `故 ${hallInfo.data.name}의 추모관`
    : "추모관";

  // ✅ 특정 index의 게시글을 상세조회해서 모달에 띄우는 함수
  const openPhotoAtIndex = async (index) => {
    const target = filteredPhotos[index];
    if (!target) return;

    try {
      const detail = await getPhotoDetail(hallId, target.id);

      const mappedPost = {
        id: target.id,
        image: detail.url,
        title: detail.occurredAt || "",
        content: detail.content,
        writtenDate: detail.uploadedAt,
        authorName: detail.name,
        profileImage: detail.myProfile,
        isMine: detail.isMine,
        isAdmin: detail.isAdmin,
      };

      setSelectedPhoto(mappedPost);
      setSelectedIndex(index);
    } catch (err) {
      console.error("게시글 상세 불러오기 실패:", err);
      alert("게시글 정보를 불러오지 못했습니다.");
    }
  };

  const handlePhotoClick = (photo, index) => {
    openPhotoAtIndex(index);
  };

  const handlePrev = () => {
    if (selectedIndex === null || filteredPhotos.length === 0) return;
    const nextIndex =
      selectedIndex === 0 ? filteredPhotos.length - 1 : selectedIndex - 1;
    openPhotoAtIndex(nextIndex);
  };

  const handleNext = () => {
    if (selectedIndex === null || filteredPhotos.length === 0) return;
    const nextIndex =
      selectedIndex === filteredPhotos.length - 1 ? 0 : selectedIndex + 1;
    openPhotoAtIndex(nextIndex);
  };

  // ✅ 모달에서 삭제 후 호출되는 콜백
  const handlePostDeleted = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <Container>
      <BarWrapper>
        <BarNavigate paths={["홈", hallTitle]} />
      </BarWrapper>

      <Content>
        {hallInfo && <Profile data={hallInfo.data} />}

        <HallTab
          role="visitor"
          activeIndex={activeTab}
          onTabChange={setActiveTab}
        />

        <TabButtonDropdown onFilterChange={setFilter} />
        <BoxPostList photos={filteredPhotos} onPostClick={handlePhotoClick} />
      </Content>

      <FixedShareButton>
        <LetterAndLinkShare
          onLinkShareClick={() => setIsLinkShareModalOpen(true)}
          page="default"
          hallId={hallId}
        />
      </FixedShareButton>

      <FixedAddPostContainer>
        {isAddMenuOpen && (
          <FixedAddPostMenu>
            <MenuButton onClick={() => nav("/generate", { state: { hallId } })}>
              <MenuIcon src={aiicon} alt="AI 이미지 생성" />
              <span>AI 이미지 생성</span>
            </MenuButton>
            <MenuButton onClick={() => nav("/write", { state: { hallId } })}>
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
        hallId={hallId}
        onPrev={handlePrev}
        onNext={handleNext}
        onDeleted={handlePostDeleted} // ✅ 삭제 후 리스트 새로고침
      />
      {isLinkShareModalOpen && (
        <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
      )}
    </Container>
  );
};

export default MemorialHomePage;

/* 🎨 스타일 */

const Container = styled.div`
  position: relative;
`;

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
