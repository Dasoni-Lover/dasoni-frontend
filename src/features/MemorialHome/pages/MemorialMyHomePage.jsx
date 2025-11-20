import React, { useState, useEffect, useMemo } from "react";
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
import { createMyHall, getMyHall } from "../../../api/my-hall";
import { getHallInfo, getPhotos, getPhotoDetail } from "../../../api/memorial";
import AddPostModal from "../components/AddPostModal";

import MyRecord from "../components/MyRecord";
import UploadVoiceRecord from "../components/UploadVoiceRecord";
import BoxPostList from "../components/BoxPostList";
import PostDetailModal from "../components/PostDetailModal";

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
      const info = await getHallInfo(hid);
      setHallInfo(info?.data);
    } catch (e) {
      console.error("추모관 정보 불러오기 실패:", e);
    }
  };

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
              />
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

/* ---------- 스타일 (원본 그대로) ---------- */
const Container = styled.div`
  position: relative;
`;
const BlurWrapper = styled.div``;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
const BarWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;
  > * {
    width: 1096px;
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
  cursor: pointer;
`;
const FixedAddPostContainer = styled.div`
  position: fixed;
  right: 148px;
  top: 788px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FixedAddPostButton = styled.div`
  cursor: pointer;
  img {
    width: 128px;
    height: 128px;
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
`;
const MenuIcon = styled.img`
  height: 2.1rem;
  flex-shrink: 0;
`;
