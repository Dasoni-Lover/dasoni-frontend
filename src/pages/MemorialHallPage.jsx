// src/pages/MemorialHallPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { typo, color } from "../styles/tokens";
import { useNavigate, useLocation } from "react-router-dom";

import { getPhotos, getHallInfo, getPhotoDetail } from "../api/memorial";
import { createMyHall, getMyHall, updateMyHallProfile } from "../api/my-hall";
import { getPresignedUrlForImage, uploadFileToS3 } from "../api/files";

import BarNavigate from "../components/BarNavigate";

import Profile from "../features/MemorialHall/components/Profile";
import DefaultProfile from "../features/MemorialHall/components/DefaultProfile";
import HallTab from "../features/MemorialHall/components/HallTab";
import TabButtonDropdown from "../features/MemorialHall/components/TabButtonDropdown";
import BoxPostList from "../features/MemorialHall/components/BoxPostList";
import LetterAndLinkShare from "../features/MemorialHall/components/LetterAndLinkShare";
import PostDetailModal from "../features/MemorialHall/components/PostDetailModal";
import AddPostModal from "../features/MemorialHall/components/AddPostModal";
import MyRecord from "../features/MemorialHall/components/MyRecord";
import UploadVoiceRecord from "../features/MemorialHall/components/UploadVoiceRecord";
import MyMemorialModal from "../features/MemorialHall/components/MyMemorialModal";
import ConfirmModal from "../components/ConfirmModal";

import AddPostButtonImg from "../features/MemorialHall/assets/btn-add-post.svg";
import modifyicon from "../assets/edit-btn.svg";
import IconAITextGuide from "../features/MemorialHall/assets/icon-ai-text-guide.svg";

export default function MemorialHallPage() {
  const nav = useNavigate();
  const location = useLocation();

  // ===================== hallId 결정 =====================
  const hallIdFromState = location.state?.hallId ?? null;
  const queryParams = new URLSearchParams(location.search);
  const hallIdFromQuery = queryParams.get("h") ?? null;

  const [effectiveHallId, setEffectiveHallId] = useState(
    hallIdFromState
      ? Number(hallIdFromState)
      : hallIdFromQuery
      ? Number(hallIdFromQuery)
      : null
  );

  // ===================== 공통 상태 =====================
  const [role, setRole] = useState(null); // follower | admin | me
  const [hallInfo, setHallInfo] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState({
    sortOption: "최신 업로드순",
    isHideAI: false,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  // ===================== me(본인) 전용 상태 =====================
  const [hasMemorialHall, setHasMemorialHall] = useState(false);
  const [isMyMemorialModalOpen, setIsMyMemorialModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // ===================== 0) "나의 추모관" 플로우 =====================
  useEffect(() => {
    const initMyHallFlow = async () => {
      try {
        // hallIdFromState/Query 우선 처리
        const hallIdCandidate = hallIdFromState ?? hallIdFromQuery;
        if (hallIdCandidate) {
          setEffectiveHallId(Number(hallIdCandidate));
          return;
        }

        const mine = await getMyHall();
        if (!mine.myHallExists) {
          setRole("me");
          setHasMemorialHall(false);
          setIsMyMemorialModalOpen(true);
          setEffectiveHallId(null);
          return;
        }

        setRole("me");
        setHasMemorialHall(true);
        setIsMyMemorialModalOpen(false);

        if (mine.hallId) {
          localStorage.setItem("myHallId", String(mine.hallId));
          setEffectiveHallId(Number(mine.hallId));
        }
      } catch (e) {
        console.error("[initMyHallFlow] mine 체크 실패:", e);
        setRole("me");
        setHasMemorialHall(false);
        setIsMyMemorialModalOpen(true);
        setEffectiveHallId(null);
      }
    };

    initMyHallFlow();
  }, [hallIdFromState, hallIdFromQuery]);

  // ===================== 1) 추모관 정보 조회 =====================
  useEffect(() => {
    if (!effectiveHallId) return;

    const fetchHallInfo = async () => {
      try {
        const res = await getHallInfo(Number(effectiveHallId));
        setRole(res?.role || role || "follower");
        setHallInfo(res?.data || null);
      } catch (err) {
        console.error("추모관 정보 불러오기 실패:", err);
      }
    };

    fetchHallInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveHallId]);

  // ===================== 2) role === "me"일 때 안전 처리 =====================
  useEffect(() => {
    if (role !== "me" || effectiveHallId) return;

    getMyHall()
      .then((res) => {
        if (res.myHallExists) {
          setHasMemorialHall(true);
          setIsMyMemorialModalOpen(false);
          if (res.hallId) {
            localStorage.setItem("myHallId", String(res.hallId));
            setEffectiveHallId(Number(res.hallId));
          }
        } else {
          setHasMemorialHall(false);
          setIsMyMemorialModalOpen(true);
        }
      })
      .catch(() => {
        setHasMemorialHall(false);
        setIsMyMemorialModalOpen(true);
      });
  }, [role, effectiveHallId]);

  // ===================== 3) 사진 조회 =====================
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!effectiveHallId) return;

      try {
        const isBydate =
          filter.sortOption === "최신 사진순" ||
          filter.sortOption === "오래된 사진순";

        let requestBody = {
          isBydate,
          isAI: true,
          isPrivate: false,
          isMine: false,
        };

        if (role === "follower") {
          const isShareTab = activeTab === 0;
          const isMyTab = activeTab === 1;
          requestBody.isPrivate = isShareTab ? false : true;
          requestBody.isMine = isMyTab;
        }

        if (role === "admin") {
          if (activeTab === 0) {
            requestBody.isPrivate = false;
            requestBody.isMine = false;
          } else if (activeTab === 1) {
            requestBody.isPrivate = true;
            requestBody.isMine = true;
          }
        }

        if (role === "me") {
          requestBody.isPrivate = false;
          requestBody.isMine = false;
        }

        const data = await getPhotos(Number(effectiveHallId), requestBody);
        setPhotos(data);
      } catch (err) {
        console.error("사진 불러오기 실패:", err);
      }
    };

    fetchPhotos();
  }, [role, activeTab, effectiveHallId, reloadKey, filter.sortOption]);

  // ===================== 4) 필터/정렬 적용 =====================
  const filteredPhotos = useMemo(() => {
    let result = [...photos];
    if (filter.isHideAI) result = result.filter((p) => !p.isAI);

    // ✅ 백엔드에서 내려주는 ts(ms) 기반 정렬
    // - sortOption 이 "업로드순"이면 isBydate = false 로 요청 → ts = 업로드 시각
    // - sortOption 이 "사진순"이면 isBydate = true 로 요청 → ts = 촬영 시각
    //   => 여기서는 그냥 ts만 기준으로 정렬하면 됨
    const getTs = (photo) => {
      if (typeof photo.ts === "number") return photo.ts;

      // 혹시 모를 예외 상황(옛 데이터)에 대비한 안전장치
      if (photo.uploadDate) return new Date(photo.uploadDate).getTime();
      if (photo.takenDate) return new Date(photo.takenDate).getTime();
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
  }, [photos, filter]);

  // ===================== 5) 상세 모달 =====================
  const openPhotoAtIndex = async (index) => {
    const target = filteredPhotos[index];
    if (!target) return;

    try {
      const detail = await getPhotoDetail(Number(effectiveHallId), target.id);
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
      alert("게시글 정보를 불러오지 못했습니다.");
    }
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
  const handlePostDeleted = () => setReloadKey((prev) => prev + 1);

  // ===================== 6) me 프로필 업로드 =====================
  const handleProfileFileSelect = async (file) => {
    if (!file || isUpdatingProfile) return;

    try {
      setIsUpdatingProfile(true);
      const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
        file
      );
      await uploadFileToS3(uploadUrl, file, contentType);
      await updateMyHallProfile(fileUrl);

      if (effectiveHallId) {
        const res = await getHallInfo(Number(effectiveHallId));
        setHallInfo(res?.data || null);
        setRole(res?.role || role || "me");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
      alert("프로필 이미지 변경에 실패했습니다.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // ===================== 7) me 추모관 생성 =====================
  const handleCreateClick = () => {
    if (isCreating || hasMemorialHall) return;

    setIsCreating(true);
    createMyHall()
      .then((res) => {
        const newHallId = res?.hallId;
        if (newHallId) {
          localStorage.setItem("myHallId", String(newHallId));
          setHasMemorialHall(true);
          setIsMyMemorialModalOpen(false);
          setRole("me");
          setEffectiveHallId(Number(newHallId));

          nav("/memorial", { state: { hallId: newHallId, from: "myHall" } });
        }
      })
      .catch((error) => {
        console.error("본인 추모관 개설 실패:", error);
        alert("추모관 개설에 실패했습니다.");
      })
      .finally(() => setIsCreating(false));
  };

  // ===================== 8) role별 UI 값 =====================
  const hallTitle = hallInfo?.name ? `故 ${hallInfo.name}의 추모관` : "추모관";
  const tabRoleProp =
    role === "follower" ? "visitor" : role === "admin" ? "manager" : "owner";
  const isManager = role === "admin";
  const isMe = role === "me";
  const showDropdownAndList =
    role === "follower" ||
    (role === "admin" && activeTab !== 2) ||
    (role === "me" && activeTab === 0);
  const showFloatingAddPost = true;

  // ===================== 9) 네비게이션 =====================
  const goWritePage = () =>
    nav("/write", {
      state: { hallId: Number(effectiveHallId), fromMyHall: isMe },
    });
  const goAIGeneratePage = () =>
    nav("/generate", { state: { hallId: Number(effectiveHallId) } });

  const handleModifyClick = () =>
    nav("/memorial/edit-profile", {
      state: { hallId: Number(effectiveHallId) },
    });

  // ===================== 🔗 링크 공유 =====================
  const handleLinkShareClick = async () => {
    const currentUrl = window.location.href;
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(currentUrl);
      else {
        const textarea = document.createElement("textarea");
        textarea.value = currentUrl;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("링크 복사에 실패했습니다. 직접 주소를 복사해 주세요.");
      return;
    }
    setIsLinkShareModalOpen(true);
  };

  // ===================== JSX =====================
  return (
    <PageWrapper>
      <GradiantBackGround />
      <BlurWrapper $blur={isMyMemorialModalOpen}>
        <Container>
          <BarWrapper>
            {isMe ? (
              <Title>나의 추모관</Title>
            ) : (
              <BarNavigate paths={["홈", hallTitle]} />
            )}
          </BarWrapper>

          <ContentWrapper>
            {isManager && (
              <ModifyButton onClick={handleModifyClick}>
                <ModifyIcon src={modifyicon} />
                <ModifyText>추모관 정보 수정</ModifyText>
              </ModifyButton>
            )}

            <Content>
              {isMe ? (
                <ProfileBox>
                  <DefaultProfile
                    isEditable={hasMemorialHall}
                    isMyHall
                    name={hallInfo?.name || "개설 전 추모관"}
                    birthday={hallInfo?.birthday}
                    deadday={hallInfo?.deadday}
                    src={hallInfo?.profile}
                    onFileSelect={handleProfileFileSelect}
                    place={hallInfo?.place}
                    phone={hallInfo?.phone}
                    adminName={hallInfo?.adminName}
                  />
                </ProfileBox>
              ) : (
                hallInfo && <Profile data={hallInfo} />
              )}

              <HallTab
                role={tabRoleProp}
                activeIndex={activeTab}
                onTabChange={setActiveTab}
              />

              {role === "admin" && activeTab === 2 && (
                <MyRecord hallId={Number(effectiveHallId)} />
              )}
              {role === "me" && activeTab === 1 && (
                <MyRecord hallId={Number(effectiveHallId)} />
              )}
              {role === "me" && activeTab === 2 && <UploadVoiceRecord />}

              {showDropdownAndList && (
                <>
                  <TabButtonDropdown onFilterChange={setFilter} />
                  <BoxPostList
                    photos={filteredPhotos}
                    onPostClick={handlePhotoClick}
                  />
                </>
              )}
            </Content>
          </ContentWrapper>

          <FixedShareButton>
            <LetterAndLinkShare
              onLinkShareClick={handleLinkShareClick}
              page={role}
              hallId={Number(effectiveHallId)}
            />
          </FixedShareButton>

          {showFloatingAddPost && (
            <FixedAddPostContainer>
              {/* 나의 추모관이 아닐 때만 AI 가이드 문구 노출 */}
              {!isMe && (
                <AITextGuide>
                  <img src={IconAITextGuide} />
                  AI 이미지를 생성해 글을 작성해 보세요
                </AITextGuide>
              )}

              <FixedAddPostButton
                // 나의 추모관이면: 바로 글쓰기 페이지로 이동
                // 그 외(role !== "me") : 기존처럼 AddPostModal 열기
                onClick={isMe ? goWritePage : () => setIsAddPostModalOpen(true)}
              >
                <img src={AddPostButtonImg} alt="추가 버튼" />
              </FixedAddPostButton>
            </FixedAddPostContainer>
          )}
        </Container>
      </BlurWrapper>

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
          title="추모관 링크가 복사되었어요"
          description="함께 추모하고 싶은 사람에게 공유해 주세요"
          onConfirm={() => setIsLinkShareModalOpen(false)}
          onCancel={() => setIsLinkShareModalOpen(false)}
        />
      )}

      {isMe && isMyMemorialModalOpen && (
        <MyMemorialModal
          isOpen={isMyMemorialModalOpen}
          onCreateClick={handleCreateClick}
        />
      )}

      <PostDetailModal
        isOpen={!!selectedPhoto}
        post={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        hallId={Number(effectiveHallId)}
        onPrev={handlePrev}
        onNext={handleNext}
        onDeleted={handlePostDeleted}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%; /* 문서 흐름 유지 */
`;

const Container = styled.div`
  position: relative; /* Footer 밀리게 */
  z-index: 1; /*  배경 위로 */
  width: 100%;
`;

const GradiantBackGround = styled.div`
  position: absolute; /*  콘텐츠 뒤로 깔기 */
  top: 0;
  left: 50%;
  z-index: 0; /* 가장 뒤 */
  width: 100vw; /* 화면 전체 폭 */
  transform: translateX(-50%); /* 가운데 기준으로 꽉 펴기 */
  height: 34.25rem;

  background: linear-gradient(
    90deg,
    #fff1f2 9.13%,
    #fff6eb 76.44%,
    #ffefe5 100%
  );
  box-shadow: 0 0 46.7px 0 rgba(0, 0, 0, 0.05) inset;
`;

const BlurWrapper = styled.div`
  /* 필요하면 blur 활성화 */
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
    width: 1320px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  margin-top: 2rem;
  ${typo("h1")};
  color: black;
`;

const ModifyButton = styled.div`
  width: 1320px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-1.5px);
  }

  @media (max-width: 1200px) {
    width: 100%;
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
  width: 1320px;
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
  right: -10%;
  top: 13rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const FixedAddPostContainer = styled.div`
  position: fixed;
  right: 10vh;
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
  ${typo("h4")}
  color : ${color("black.50")}
`;
