// src/pages/ExampleHallPage.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../styles/tokens";
import { useNavigate } from "react-router-dom";

import BarNavigate from "../components/BarNavigate";

import Profile from "../features/MemorialHall/components/Profile";
import HallTab from "../features/MemorialHall/components/HallTab";
import TabButtonDropdown from "../features/MemorialHall/components/TabButtonDropdown";
import BoxPostList from "../features/MemorialHall/components/BoxPostList";
import PostDetailModal from "../features/MemorialHall/components/PostDetailModal";
import LetterAndLinkShare from "../features/MemorialHall/components/LetterAndLinkShare";
import AddPostModal from "../features/MemorialHall/components/AddPostModal";
import ConfirmModal from "../components/ConfirmModal";

import AddPostButtonImg from "../features/MemorialHall/assets/btn-add-post.svg";
import IconAITextGuide from "../features/MemorialHall/assets/icon-ai-text-guide.svg";

import {
  exampleHallInfo,
  examplePhotos,
  examplePhotoDetailsById,
} from "../mock/exampleHall";

export default function ExampleHallPage() {
  const nav = useNavigate();

  // 예시관이니까 follower 고정
  const role = "follower";

  const [filter, setFilter] = useState({
    sortOption: "최신 업로드순",
    isHideAI: false,
  });

  const [activeTab, setActiveTab] = useState(0);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isLoginGuideModalOpen, setIsLoginGuideModalOpen] = useState(false);

  const tabRoleProp = "visitor"; // follower -> visitor

  // 탭에 따라 공개/비공개/내 글 분기 흉내 (예시는 모두 공개로 두되, 탭 UI 유지)
  const basePhotos = useMemo(() => {
    // activeTab 0: 공유(공개)
    // activeTab 1: 나의 기록(비공개/내 글) 흉내
    if (activeTab === 0) return examplePhotos;
    // 예시에서는 탭 1은 "내 글" 느낌으로 id 101만 보여주기
    if (activeTab === 1) return examplePhotos.filter((p) => p.id === 101);
    return examplePhotos;
  }, [activeTab]);

  const filteredPhotos = useMemo(() => {
    let result = [...basePhotos];

    if (filter.isHideAI) result = result.filter((p) => !p.isAI);

    const getTs = (photo) => {
      if (typeof photo.ts === "number") return photo.ts;
      return 0;
    };

    switch (filter.sortOption) {
      case "최신 업로드순":
      case "최신 사진순":
        result.sort((a, b) => getTs(b) - getTs(a));
        break;

      case "오래된 업로드순":
      case "오래된 사진순":
        result.sort((a, b) => getTs(a) - getTs(b));
        break;

      default:
        break;
    }

    return result;
  }, [basePhotos, filter]);

  const openPhotoAtIndex = async (index) => {
    const target = filteredPhotos[index];
    if (!target) return;

    const detail = examplePhotoDetailsById[target.id];
    if (!detail) return;

    setSelectedPhoto({
      id: target.id,
      image: detail.url,
      title: detail.occurredAt || "",
      content: detail.content,
      writtenDate: detail.uploadedAt,
      authorName: detail.name,
      profileImage: detail.myProfile,
      isMine: detail.isMine,
      isAdmin: detail.isAdmin,
    });
    setSelectedIndex(index);
  };

  const handlePhotoClick = (_, index) => openPhotoAtIndex(index);

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

  const handleLinkShareClick = async () => {
    setIsLoginGuideModalOpen(true);
  };

  const goWritePage = () => nav("/write", { state: { hallId: 0 } });
  const goAIGeneratePage = () => nav("/generate", { state: { hallId: 0 } });

  return (
    <PageWrapper>
      <GradiantBackGround />

      <Container>
        <BarWrapper>
          <BarNavigate
            paths={["예시 추모관"]}
            onPathClick={(path) => {
              if (path === "홈") nav("/home");
            }}
          />
        </BarWrapper>

        <ContentWrapper>
          <Content>
            {/* 예시관은 일반 Profile 컴포넌트 사용 */}
            <ProfileBox>
              <Profile data={exampleHallInfo} />
            </ProfileBox>

            <HallTab
              role={tabRoleProp}
              activeIndex={activeTab}
              onTabChange={setActiveTab}
            />

            <TabButtonDropdown onFilterChange={setFilter} />
            <BoxPostList
              photos={filteredPhotos}
              onPostClick={handlePhotoClick}
            />
          </Content>
        </ContentWrapper>

        <FixedShareButton>
          <ShareArea>
            {/* ✅ 클릭 가로채기(공유하기/편지 보내기 둘 다) */}
            <ShareClickBlocker onClick={() => setIsLoginGuideModalOpen(true)} />

            <LetterAndLinkShare
              onLinkShareClick={handleLinkShareClick}
              page={role}
              hallId={0}
            />
          </ShareArea>
        </FixedShareButton>
      </Container>

      {isAddPostModalOpen && (
        <AddPostModal
          onClose={() => setIsAddPostModalOpen(false)}
          onSelectAI={() => {
            setIsAddPostModalOpen(false);
            goAIGeneratePage();
          }}
          onSelectComputer={() => {
            setIsAddPostModalOpen(false);
            goWritePage();
          }}
        />
      )}

      {isLinkShareModalOpen && (
        <ConfirmModal
          isOpen={isLinkShareModalOpen}
          title="예시 추모관 링크가 복사되었어요"
          description="공유 흐름을 체험해 보세요"
          onConfirm={() => setIsLinkShareModalOpen(false)}
          onCancel={() => setIsLinkShareModalOpen(false)}
        />
      )}

      {isLoginGuideModalOpen && (
        <ConfirmModal
          isOpen={isLoginGuideModalOpen}
          title="로그인 이후 이용할 수 있어요"
          description="회원가입 이후 서비스를 이용해 보세요"
          confirmText="닫기"
          onConfirm={() => setIsLoginGuideModalOpen(false)}
          onCancel={() => setIsLoginGuideModalOpen(false)}
        />
      )}

      <PostDetailModal
        isOpen={!!selectedPhoto}
        post={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        hallId={0}
        onPrev={handlePrev}
        onNext={handleNext}
        onDeleted={() => {}}
      />
    </PageWrapper>
  );
}

/* ================= styled (MemorialHallPage에서 필요한 것만 가져옴) ================= */

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const GradiantBackGround = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 0;
  width: 100vw;
  transform: translateX(-50%);
  height: 34.25rem;

  background: linear-gradient(
    90deg,
    #fff1f2 9.13%,
    #fff6eb 76.44%,
    #ffefe5 100%
  );
  box-shadow: 0 0 46.7px 0 rgba(0, 0, 0, 0.05) inset;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
`;

const BarWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  display: flex;

  > * {
    width: 82.5rem;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Content = styled.div`
  width: 82.5rem;
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const ProfileBox = styled.div`
  margin-bottom: 52px;
`;

const FixedShareButton = styled.div`
  position: absolute;
  right: -7%;
  top: 13rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FixedAddPostContainer = styled.div`
  position: fixed;
  right: 5vh;
  bottom: 10vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FixedAddPostButton = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;

  img {
    width: 6.25rem;
    height: 6.25rem;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const AITextGuide = styled.div`
  display: flex;
  padding: 0.6rem 1rem;
  align-items: center;

  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid #4bb5ee;
  background: linear-gradient(
    90deg,
    rgba(125, 193, 233, 0.2) 0%,
    rgba(125, 138, 233, 0.2) 100%
  );
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.04);

  ${typo("h4")};
  color: ${color("black.50")};

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ShareArea = styled.div`
  position: relative;
`;

const ShareClickBlocker = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  cursor: pointer;
`;
