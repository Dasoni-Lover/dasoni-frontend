<<<<<<< HEAD
// src/features/MemorialMyHome/pages/MemorialMyHomePage.jsx
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useMemo } from "react";
>>>>>>> develop
import styled from "styled-components";
import { typo } from "../../../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";

import BarNavigate from "../../../components/BarNavigate";
import DefaultProfile from "../components/DefaultProfile";
import HallTab from "../components/HallTab";
import TabButtonDropdown from "../components/TabButtonDropdown";
import LetterAndLinkShare from "../components/LetterAndLinkShare";
import AddPostButtonImg from "../assets/btn-add-post.svg";
import LinkShareModal from "../components/LinkShareModal";
import MyMemorialModal from "../components/MyMemorialModal";
<<<<<<< HEAD
import {
  createMyHall,
  getMyHall,
  updateMyHallProfile,
} from "../../../api/my-hall";
import { getHallInfo } from "../../../api/memorial";
import MyRecord from "../components/MyRecord";
import UploadVoiceRecord from "../components/UploadVoiceRecord";
import AddPostModal from "../components/AddPostModal";

// ✅ presigned-url / S3 업로드 유틸
import { getPresignedUrlForImage, uploadFileToS3 } from "../../../api/files";
=======
import { createMyHall, getMyHall } from "../../../api/my-hall";
import { getHallInfo, getPhotos, getPhotoDetail } from "../../../api/memorial";
import AddPostModal from "../components/AddPostModal";

import MyRecord from "../components/MyRecord";
import UploadVoiceRecord from "../components/UploadVoiceRecord";
import BoxPostList from "../components/BoxPostList";
import PostDetailModal from "../components/PostDetailModal";
>>>>>>> develop

const MemorialMyHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hallId = location.state?.hallId ?? localStorage.getItem("myHallId") ?? 1;

  const [hasMemorialHome, setHasMemorialHome] = useState(false);
  const [hallInfo, setHallInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
<<<<<<< HEAD
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
=======

>>>>>>> develop
  const [activeTab, setActiveTab] = useState(0);

  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState({
    sortOption: "최신 업로드순",
    isAIMode: false,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

//내추모관 확인
  useEffect(() => {
    getMyHall()
      .then(async (res) => {
<<<<<<< HEAD
        console.log("[getMyHall] 응답:", res);
=======
>>>>>>> develop
        if (res.myHallExists) {
          setHasMemorialHome(true);
          setIsModalOpen(false);
          if (res.hallId) {
            localStorage.setItem("myHallId", String(res.hallId));
            fetchHallInfo(res.hallId);
          }
        } else {
          setHasMemorialHome(false);
          setIsModalOpen(true);
        }
      })
      .catch(() => setIsModalOpen(true));
  }, []);

//추모관 정보조회
  const fetchHallInfo = async (hid) => {
    try {
<<<<<<< HEAD
      console.log("[fetchHallInfo] 호출 hallId:", hallId);
      const info = await getHallInfo(hallId);
      console.log("[fetchHallInfo] 서버 응답:", info);
=======
      const info = await getHallInfo(hid);
      setHallInfo(info?.data);
    } catch (e) {
      console.error("추모관 정보 불러오기 실패:", e);
    }
  };
>>>>>>> develop

  useEffect(() => {
    if (!hallId) return;
    fetchHallInfo(hallId);
  }, [hallId]);

//사진조회
  useEffect(() => {
    if (activeTab !== 0) return;

    const fetchPhotosData = async () => {
      try {
        const requestBody = {
          isBydate: true,
          isAI: false,
          isPrivate: false,
          isMine: false,
        };

        const res = await getPhotos(Number(hallId), requestBody);
        setPhotos(res);
      } catch (e) {
        console.error("사진 불러오기 실패:", e);
      }
    };

    fetchPhotosData();
  }, [activeTab, hallId, reloadKey]);

//필터적용
  const filteredPhotos = useMemo(() => {
    let result = [...photos];

    if (filter.isAIMode) {
      result = result.filter((p) => p.isAI);
    }

<<<<<<< HEAD
  const goWritePage = () => nav("/write");
  const goAIGeneratePage = () => nav("/generate");

  const handleCreateClick = () => {
    if (isCreating || hasMemorialHome) return;

    setIsCreating(true);
    createMyHall()
      .then(async (res) => {
        console.log("[createMyHall] 응답:", res);
        const hallId = res?.hallId;
        if (hallId) {
          localStorage.setItem("myHallId", String(hallId));
          setHasMemorialHome(true);
          setIsModalOpen(false);
          setTimeout(() => fetchHallInfo(hallId), 500);
        }
      })
      .catch((error) => {
        console.error("[createMyHall] 본인 추모관 개설 실패:", error);
        alert("추모관 개설에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      })
      .finally(() => setIsCreating(false));
  };

  const handleProfileFileSelect = async (file) => {
    if (!file) return;
    if (isUpdatingProfile) return;

    try {
      setIsUpdatingProfile(true);

      // 1) presigned-url 발급
      const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
        file
      );
      console.log("[handleProfileFileSelect] presigned 응답:", {
        uploadUrl,
        fileUrl,
        contentType,
      });

      // 2) S3 업로드
      await uploadFileToS3(uploadUrl, file, contentType);
      console.log("[handleProfileFileSelect] S3 업로드 성공");

      // 3) 추모관 프로필 PATCH
      await updateMyHallProfile(fileUrl);
      console.log("[handleProfileFileSelect] 프로필 PATCH 성공");

      // ✅ 3-1) 사이드바에도 알려주기 (전역 이벤트 발행)
      window.dispatchEvent(
        new CustomEvent("myProfileUpdated", {
          detail: { profileUrl: fileUrl },
        })
      );

      // 4) 최신 hallInfo 다시 조회
      const myHallId = localStorage.getItem("myHallId");
      if (myHallId) {
        await fetchHallInfo(myHallId);
      }
    } catch (error) {
      console.error(
        "[handleProfileFileSelect] 프로필 이미지 업데이트 실패:",
        error
      );
      alert("프로필 이미지 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // 탭별로 렌더링할 콘텐츠 결정
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <TabButtonDropdown />
            <NoPost />
          </>
        );
      case 1:
        return <MyRecord />;
      case 2:
        return <UploadVoiceRecord />;
=======
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
>>>>>>> develop
      default:
        break;
    }

    return result;
  }, [photos, filter]);

//상세조회
  const openPhotoAtIndex = async (index) => {
    const target = filteredPhotos[index];
    if (!target) return;

    try {
      const detail = await getPhotoDetail(hallId, target.id);

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
    } catch (err) {
      console.error("게시글 상세 불러오기 실패:", err);
    }
  };

  const handlePhotoClick = (_, index) => openPhotoAtIndex(index);

  const handlePrev = () => {
    if (filteredPhotos.length === 0) return;
    const prevIndex = selectedIndex === 0
      ? filteredPhotos.length - 1
      : selectedIndex - 1;
    openPhotoAtIndex(prevIndex);
  };

  const handleNext = () => {
    if (filteredPhotos.length === 0) return;
    const nextIndex = selectedIndex === filteredPhotos.length - 1
      ? 0
      : selectedIndex + 1;
    openPhotoAtIndex(nextIndex);
  };

  const handlePostDeleted = () => setReloadKey((v) => v + 1);

// 이동
  const goWritePage = () =>
    navigate("/write", { state: { hallId } });

  const goAIGeneratePage = () =>
    navigate("/generate", { state: { hallId } });

  return (
    <Container>
      <BlurWrapper $blur={isModalOpen}>
        <BarWrapper>
          <BarNavigate paths={["홈", "나의 추모관"]} />
        </BarWrapper>

        <ContentWrapper>
          <Content>
            <ProfileBox>
              <DefaultProfile
                isEditable={hasMemorialHome}
                name={hallInfo?.name || "이름 없음"}
                date={
                  hallInfo ? `${hallInfo?.birthday || ""} ~ ${hallInfo?.deadday || ""}` : ""
                }
                src={hallInfo?.profile}
                onFileSelect={handleProfileFileSelect}
              />
              {/* 필요하다면 isUpdatingProfile일 때 로딩 스피너나 문구 추가 가능 */}
            </ProfileBox>

            <HallTab
              role="owner"
              activeIndex={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === 0 && (
              <>
                <TabButtonDropdown onFilterChange={setFilter} />
                <BoxPostList
                  photos={filteredPhotos}
                  onPostClick={handlePhotoClick}
                />
              </>
            )}

            {activeTab === 1 && (
              <MyRecord hallId={hallId} />
            )}

            {activeTab === 2 && <UploadVoiceRecord />}
          </Content>
        </ContentWrapper>

        <FixedShareButton>
          <LetterAndLinkShare
            onLinkShareClick={() => setIsLinkShareModalOpen(true)}
            page="my"
          />
        </FixedShareButton>

        <FixedAddPostContainer>
          

          <FixedAddPostButton onClick={() => setIsAddPostModalOpen(true)}>
            <img src={AddPostButtonImg} alt="추가 버튼" />
          </FixedAddPostButton>
        </FixedAddPostContainer>
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
          <LinkShareModal onClose={() => setIsLinkShareModalOpen(false)} />
        )}
      </BlurWrapper>

      {isModalOpen && (
        <MyMemorialModal
          isOpen={isModalOpen}
          onCreateClick={async () => {
            if (isCreating) return;
            setIsCreating(true);

            try {
              const res = await createMyHall();
              localStorage.setItem("myHallId", String(res.hallId));
              setHasMemorialHome(true);
              setIsModalOpen(false);
              fetchHallInfo(res.hallId);
            } catch (e) {
              alert("추모관 생성 실패");
            } finally {
              setIsCreating(false);
            }
          }}
        />
      )}

      <PostDetailModal
        isOpen={!!selectedPhoto}
        post={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        hallId={hallId}
        onPrev={handlePrev}
        onNext={handleNext}
        onDeleted={handlePostDeleted}
      />
    </Container>
  );
};

export default MemorialMyHomePage;

<<<<<<< HEAD
// ================= 스타일 =================
const Container = styled.div`
  position: relative;
`;

const BlurWrapper = styled.div`
  /* filter: ${({ $blur }) => ($blur ? "blur(4px)" : "none")};
  transition: filter 0.2s ease; */
`;

=======
/* ---------- 스타일 (원본 그대로) ---------- */
const Container = styled.div`
  position: relative;
`;
const BlurWrapper = styled.div``;
>>>>>>> develop
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
<<<<<<< HEAD

  @media (max-width: 1200px) {
    align-items: flex-start;
  }
=======
>>>>>>> develop
`;

const BarWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;

  > * {
    width: 1096px;
  }
<<<<<<< HEAD

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
=======
>>>>>>> develop
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
  cursor: pointer;
<<<<<<< HEAD

  @media (max-width: 1200px) {
    display: none;
  }
=======
>>>>>>> develop
`;

const FixedAddPostContainer = styled.div`
  position: fixed;
  right: 10vh;
  bottom: 10vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD

  @media (max-width: 1200px) {
    display: none;
  }
=======
>>>>>>> develop
`;

const FixedAddPostButton = styled.div`
  cursor: pointer;
<<<<<<< HEAD
  transition: transform 0.2s ease;

  img {
    width: 128px;
    height: 128px;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
=======
  img {
    width: 128px;
    height: 128px;
>>>>>>> develop
  }
`;

const FixedAddPostMenu = styled.div`
  position: absolute;
  bottom: 160px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
<<<<<<< HEAD
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
=======
>>>>>>> develop
`;

const MenuButton = styled.button`
  display: flex;
  padding: 0 0.8125rem;
  align-items: center;
  height: 2.75rem;
  width: 13.75rem;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  background: #ffbc67;
  color: #313131;
  ${typo("h4")};
  cursor: pointer;
<<<<<<< HEAD
  box-shadow: 0 0 7.6px 0 rgba(0, 0, 0, 0.18);

  span {
    flex: 1;
    text-align: center;
  }
=======
>>>>>>> develop
`;

const MenuIcon = styled.img`
  height: 2.1rem;
  flex-shrink: 0;
`;
