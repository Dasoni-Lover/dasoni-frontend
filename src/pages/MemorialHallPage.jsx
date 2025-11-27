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

  // ✅ 기존 흐름 유지: state로 넘어온 hallId 우선, 없으면 (나의 추모관 플로우에서 mine으로 hallId를 확정)
  const hallIdFromState = location.state?.hallId ?? null;

  // ✅ 실제 조회에 사용할 hallId (me 플로우에서는 /api/halls/mine으로 받은 hallId만 사용)
  const [effectiveHallId, setEffectiveHallId] = useState(
    hallIdFromState ? Number(hallIdFromState) : null
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

  // ===================== 0) 진입 시 "나의 추모관" 플로우 선처리 =====================
  // ✅ 기존 코드처럼:
  // 1) state hallId가 없으면 -> /api/halls/mine으로 내 추모관 존재 여부 먼저 확인
  // 2) 없으면 모달 띄우고 getHallInfo 호출 금지
  // 3) 있으면 mine.hallId를 effectiveHallId로 세팅하고 그걸로만 추모관 조회
  useEffect(() => {
    const initMyHallFlow = async () => {
      try {
        // ✅ 방문자/관리자 플로우: hallId가 명확히 넘어오면 mine 체크 없이 바로 진행
        if (hallIdFromState) {
          setEffectiveHallId(Number(hallIdFromState));
          return;
        }

        // ✅ 나의 추모관 플로우: mine 먼저 확인
        const mine = await getMyHall();
        console.log("[getMyHall] 응답:", mine);

        if (!mine.myHallExists) {
          // 아직 내 추모관이 없으면 모달만 띄우고 종료
          setRole("me");
          setHasMemorialHall(false);
          setIsMyMemorialModalOpen(true);
          setEffectiveHallId(null); // ❗ hallInfo/photos 조회 금지
          return;
        }

        // 내 추모관이 있으면 hallId 확정
        setRole("me");
        setHasMemorialHall(true);
        setIsMyMemorialModalOpen(false);

        if (mine.hallId) {
          localStorage.setItem("myHallId", String(mine.hallId));
          setEffectiveHallId(Number(mine.hallId));
        }
      } catch (e) {
        console.error("[initMyHallFlow] mine 체크 실패:", e);
        // mine 체크 실패도 "내 추모관 없음" 케이스처럼 처리
        setRole("me");
        setHasMemorialHall(false);
        setIsMyMemorialModalOpen(true);
        setEffectiveHallId(null);
      }
    };

    initMyHallFlow();
  }, [hallIdFromState]);

  // ===================== 1) 추모관 정보 조회 (role 확보) =====================
  // effectiveHallId가 확정된 뒤에만 호출
  useEffect(() => {
    if (!effectiveHallId) return;

    const fetchHallInfo = async () => {
      try {
        const res = await getHallInfo(Number(effectiveHallId));
        // res: { role, data }
        setRole(res?.role || role || "follower");
        setHallInfo(res?.data || null);
      } catch (err) {
        console.error("추모관 정보 불러오기 실패:", err);
      }
    };

    fetchHallInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveHallId]);

  // ===================== 2) role === "me" 일 때 내 추모관 존재 여부 확인 =====================
  // ✅ me 플로우는 initMyHallFlow에서 이미 처리하므로,
  //    여기서는 role이 me인데도 hallId가 없을 수 있는 예외 상황만 보완
  useEffect(() => {
    if (role !== "me") return;
    if (effectiveHallId) return; // hallId 확정되면 skip

    getMyHall()
      .then(async (res) => {
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
      try {
        if (!effectiveHallId) return;

        // 🔥 정렬 옵션에 따라 isBydate 결정
        const sortOption = filter.sortOption;

        // isBydate :
        //  - true  : 날짜 순 (사진 기준)
        //  - false : 업로드 순
        const isBydate =
          sortOption === "최신 사진순" || sortOption === "오래된 사진순";

        // role별 탭/요청 분기
        if (role === "admin" && activeTab === 2) return;
        if (role === "me" && activeTab !== 0) return;

        let requestBody = {
          isBydate, // 🔥 여기만 포인트
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
    // 🔥 정렬 옵션 바뀔 때도 다시 호출되도록 의존성에 sortOption 추가
  }, [role, activeTab, effectiveHallId, reloadKey, filter.sortOption]);

  // ===================== 4) 필터/정렬 적용 =====================
  const filteredPhotos = useMemo(() => {
    let result = [...photos];

    // ✅ isHideAI: true면 AI 이미지를 숨김(제외)
    if (filter.isHideAI) {
      result = result.filter((p) => !p.isAI);
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

      window.dispatchEvent(
        new CustomEvent("myProfileUpdated", {
          detail: { profileUrl: fileUrl },
        })
      );

      // 최신 정보 재조회
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
      .then(async (res) => {
        const newHallId = res?.hallId;
        if (newHallId) {
          localStorage.setItem("myHallId", String(newHallId));
          setHasMemorialHall(true);
          setIsMyMemorialModalOpen(false);

          // ✅ create 이후 hallId 확정 → 그 hallId로 getHallInfo 흐름 타게 함
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

  // floating add-post는 follower/admin/me 모두 사용
  const showFloatingAddPost = true;

  // ===================== 9) 네비게이션 =====================
  const goWritePage = () =>
    nav("/write", { state: { hallId: Number(effectiveHallId) } });
  const goAIGeneratePage = () =>
    nav("/generate", { state: { hallId: Number(effectiveHallId) } });

  const handleModifyClick = () =>
    nav("/memorial/edit-profile", {
      state: { hallId: Number(effectiveHallId) },
    });

  // ===================== 🔗 링크 공유 클릭 시: 주소 복사 + 모달 오픈 =====================
  const handleLinkShareClick = async () => {
    const currentUrl = window.location.href;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // fallback (일부 환경용)
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

    // 복사 성공 시 확인 모달 오픈
    setIsLinkShareModalOpen(true);
  };

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
            {/* ✅ 관리자만 '추모관 정보 수정' 버튼 */}
            {isManager && (
              <ModifyButton onClick={handleModifyClick}>
                <ModifyIcon src={modifyicon} />
                <ModifyText>추모관 정보 수정</ModifyText>
              </ModifyButton>
            )}

            <Content>
              {/* ✅ 프로필 UI */}
              {isMe ? ( // 나의 추모관인 경우
                <ProfileBox>
                  <DefaultProfile
                    isEditable={hasMemorialHall}
                    isMyHall // 나의 추모관 여부 전달
                    name={hallInfo?.name || "개설 전 추모관"}
                    birthday={hallInfo?.birthday}
                    deadday={hallInfo?.deadday}
                    src={hallInfo?.profile}
                    onFileSelect={handleProfileFileSelect}
                    place={hallInfo?.place}
                    phone={hallInfo?.phone}
                    adminName={hallInfo?.adminName}
                  />
                  {/* 필요하다면 isUpdatingProfile일 때 로딩 스피너나 문구 추가 가능 */}
                </ProfileBox>
              ) : (
                hallInfo && <Profile data={hallInfo} />
              )}

              {/* ✅ 탭 */}
              <HallTab
                role={tabRoleProp}
                activeIndex={activeTab}
                onTabChange={setActiveTab}
              />

              {/* ✅ role별 탭 내용 */}
              {role === "admin" && activeTab === 2 && (
                <MyRecord hallId={Number(effectiveHallId)} />
              )}

              {role === "me" && activeTab === 1 && (
                <MyRecord hallId={Number(effectiveHallId)} />
              )}

              {role === "me" && activeTab === 2 && <UploadVoiceRecord />}

              {/* ✅ 사진 리스트 영역 */}
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

          {/* ✅ 공유/편지 버튼 */}
          <FixedShareButton>
            {role === "follower" && (
              <LetterAndLinkShare
                onLinkShareClick={handleLinkShareClick}
                page="default"
                hallId={Number(effectiveHallId)}
              />
            )}

            {role === "admin" && (
              <LetterAndLinkShare
                onLinkShareClick={handleLinkShareClick}
                onLetterClick={() =>
                  nav("/letter", { state: { hallId: Number(effectiveHallId) } })
                }
                page="manager"
                hallId={Number(effectiveHallId)}
              />
            )}

            {role === "me" && (
              <LetterAndLinkShare
                onLinkShareClick={handleLinkShareClick}
                page="my"
                hallId={Number(effectiveHallId)}
              />
            )}
          </FixedShareButton>

          {/* ✅ 게시글 작성 (+ 플로팅 버튼) */}
          {showFloatingAddPost && (
            <FixedAddPostContainer>
              <AITextGuide>
                <img src={IconAITextGuide} />
                AI 이미지를 생성해 글을 작성해 보세요
              </AITextGuide>
              <FixedAddPostButton onClick={() => setIsAddPostModalOpen(true)}>
                <img src={AddPostButtonImg} alt="추가 버튼" />
              </FixedAddPostButton>
            </FixedAddPostContainer>
          )}
        </Container>
      </BlurWrapper>

      {/* 여기부터 모달 관련 */}
      {/* 게시글 작성 버튼(+버튼) 클릭시 게시글 작성 모달 */}
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

      {/* 링크 공유 ConfirmModal */}
      {isLinkShareModalOpen && (
        <ConfirmModal
          isOpen={isLinkShareModalOpen}
          title="추모관 링크가 복사되었어요"
          description="함께 추모하고 싶은 사람에게 공유해 주세요"
          onConfirm={() => setIsLinkShareModalOpen(false)}
          onCancel={() => setIsLinkShareModalOpen(false)}
        />
      )}

      {/* ✅ me인데 내 추모관 없을 때만 생성 모달 */}
      {isMe && isMyMemorialModalOpen && (
        <MyMemorialModal
          isOpen={isMyMemorialModalOpen}
          onCreateClick={handleCreateClick}
        />
      )}

      {/* ✅ Post Detail Modal */}
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

/* 🎨 스타일 */

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
