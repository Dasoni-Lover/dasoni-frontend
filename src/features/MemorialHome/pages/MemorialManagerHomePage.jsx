// src/features/MemorialHome/pages/MemorialManagerHomePage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";

import BarNavigate from "../../../components/BarNavigate";
import Profile from "../components/Profile";
import HallTab from "../components/HallTab";
import TabButtonDropdown from "../components/TabButtonDropdown";
import BoxPostList from "../components/BoxPostList";
import LetterAndLinkShare from "../components/LetterAndLinkShare";
import LinkShareModal from "../components/LinkShareModal";
import PostDetailModal from "../components/PostDetailModal";

import AddPostButtonImg from "../assets/addpost-btn.png";
import foldericon from "../assets/folder-icon.png";
import aiicon from "../assets/ai-icon.png";
import modifyicon from "../../../assets/edit-btn.svg";

import { getHallInfo, getPhotos, getPhotoDetail } from "../../../api/memorial";

export const MemorialManagerHomePage = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [hallInfo, setHallInfo] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState({
    sortOption: "최신 업로드순",
    isAIMode: false,
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const hallId = location.state?.hallId ?? 1;

  // ✅ 추모관 정보 불러오기
  useEffect(() => {
    const fetchHall = async () => {
      try {
        const res = await getHallInfo(hallId);
        setHallInfo(res?.data);
      } catch (e) {
        console.error("추모관 정보 불러오기 실패:", e);
      }
    };
    fetchHall();
  }, [hallId]);

  // ✅ 사진 리스트 불러오기
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos(hallId, {
          isPrivate: activeTab === 1,
          isBydate: true,
          isAI: false,
        });
        setPhotos(data);
      } catch (e) {
        console.error("사진 불러오기 실패:", e);
      }
    };
    fetchPhotos();
  }, [hallId, activeTab]);

  // ✅ 정렬 및 필터 적용
  const filteredPhotos = React.useMemo(() => {
    let result = [...photos];
    if (filter.isAIMode) result = result.filter((p) => p.isAI);
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

  // ✅ 게시글 상세조회 (모달 열기)
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

  const handlePhotoClick = (photo, index) => openPhotoAtIndex(index);

  const handlePrev = () => {
    if (selectedIndex === null || filteredPhotos.length === 0) return;
    const prevIndex =
      selectedIndex === 0 ? filteredPhotos.length - 1 : selectedIndex - 1;
    openPhotoAtIndex(prevIndex);
  };

  const handleNext = () => {
    if (selectedIndex === null || filteredPhotos.length === 0) return;
    const nextIndex =
      selectedIndex === filteredPhotos.length - 1 ? 0 : selectedIndex + 1;
    openPhotoAtIndex(nextIndex);
  };

  const handleModifyClick = () => {
    navigate("/memorial-manager/edit-profile");
  };

  const goWritePage = () => navigate("/write", { state: { hallId } });
  const goAIGeneratePage = () => navigate("/generate", { state: { hallId } });

  const hallTitle = hallInfo?.name ? `故 ${hallInfo.name}의 추모관` : "추모관";

  return (
    <Container>
      <BarWrapper>
        <BarNavigate paths={["홈", hallTitle]} />
      </BarWrapper>

      <ContentWrapper>
        <ModifyButton onClick={handleModifyClick}>
          <ModifyIcon src={modifyicon} />
          <ModifyText>프로필 수정</ModifyText>
        </ModifyButton>

        <Content>
          {hallInfo && <Profile data={hallInfo} />}
          <HallTab
            role="manager"
            activeIndex={activeTab}
            onTabChange={setActiveTab}
          />
          <TabButtonDropdown onFilterChange={setFilter} />
          <BoxPostList photos={filteredPhotos} onPostClick={handlePhotoClick} />
        </Content>
      </ContentWrapper>

      <FixedShareButton>
        <LetterAndLinkShare
          onLinkShareClick={() => setIsLinkShareModalOpen(true)}
          onLetterClick={() => navigate("/letter", { state: { hallId } })} // ✅ 추가된 부분
          page="manager"
          hallId={hallId}
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

      {/* ✅ 상세조회 모달 추가 */}
      <PostDetailModal
        isOpen={!!selectedPhoto}
        post={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        hallId={hallId}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLinkShareModalOpen && (
        <LinkShareModal
          onClose={() => setIsLinkShareModalOpen(false)}
          page="manager"
        />
      )}
    </Container>
  );
};

/* 🎨 스타일 동일 */
const Container = styled.div`
  position: relative;
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
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const ModifyButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1.5px);
  }
`;

const ModifyIcon = styled.img`
  width: 24px;
  height: 24px;
  padding: 6px;
`;

const ModifyText = styled.div`
  ${typo("h4")};
  color: ${color("black.70")};

  ${ModifyButton}:hover & {
    color: ${color("black.100")};
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
