// src/pages/mypage/MemorialMyHomePage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { typo } from "../../../styles/tokens";
import { useNavigate } from "react-router-dom";

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
import { createMyHall, getMyHall } from "../../../api/my-hall";
import { getHallInfo } from "../../../api/memorial";
import MyRecord from "../components/MyRecord";

const MemorialMyHomePage = () => {
  const nav = useNavigate();

  const [hasMemorialHome, setHasMemorialHome] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLinkShareModalOpen, setIsLinkShareModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // 내 추모관 정보
  const [hallInfo, setHallInfo] = useState(null);

  // 페이지 진입 시 내 추모관 존재 여부 확인
  useEffect(() => {
  getMyHall()
    .then(async (res) => {
      console.log("[getMyHall] 응답:", res); // 전체 응답 확인
      if (res.myHallExists) {
        setHasMemorialHome(true);
        setIsModalOpen(false);
        if (res.hallId) {
          localStorage.setItem("myHallId", String(res.hallId));
          setTimeout(() => fetchHallInfo(res.hallId), 500);
        }
      } else {
        setHasMemorialHome(false);
        setIsModalOpen(true);
      }
    })
    .catch((error) => {
      console.error("[getMyHall] 내 추모관 조회 실패:", error);
      setIsModalOpen(true);
    });
}, []);

  // 추모관 정보 조회
  const fetchHallInfo = async (hallId) => {
  try {
    console.log("[fetchHallInfo] 호출 hallId:", hallId); // hallId 확인
    const info = await getHallInfo(hallId);
    console.log("[fetchHallInfo] 서버 응답:", info); // 서버 응답 확인

    if (info?.data) {
      setHallInfo(info.data);
    } else {
      console.warn("[fetchHallInfo] 서버 데이터가 비어있음, 기본값 적용");
      setHallInfo({
        name: "이름 없음",
        profile: null,
        birthday: "1111",
        deadday: "",
      });
    }
  } catch (error) {
    console.error("[fetchHallInfo] 추모관 정보 조회 실패:", error);
    setHallInfo({
      name: "황선우",
      profile: "",
      birthday: "1999",
      deadday: "",
    });
  }
};

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
  return (
    <Container>
      <BlurWrapper $blur={isModalOpen}>
        <BarWrapper>
          <BarNavigate />
        </BarWrapper>

        <ContentWrapper>
          <Content>
            <ProfileBox>
              <DefaultProfile
                isEditable={hasMemorialHome}
                name={hallInfo?.name || "이름 없음"}
                date={
                  hallInfo
                    ? `${hallInfo?.birthday || ""} ~ ${hallInfo?.deadday || ""}`
                    : ""
                }
                src={hallInfo?.profile}
              />
            </ProfileBox>

            <HallTab role="owner" />
            {/* <MyRecord/> */}
            <TabButtonDropdown />
            <NoPost />
          </Content>
        </ContentWrapper>

        <FixedShareButton>
          <LetterAndLinkShare
            onLinkShareClick={() => setIsLinkShareModalOpen(true)}
            page="my"
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
      </BlurWrapper>

      {isModalOpen && (
        <MyMemorialModal
          isOpen={isModalOpen}
          onCreateClick={handleCreateClick}
        />
      )}
    </Container>
  );
};

export default MemorialMyHomePage;

const Container = styled.div`position: relative;`;
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
const ProfileBox = styled.div`margin-bottom: 52px;`;
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
  border: 1px solid #e9e9e9;
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