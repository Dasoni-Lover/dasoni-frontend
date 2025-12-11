// src/pages/SavedLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { color, typo } from "../styles/tokens";

import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

import { 
  fetchTempLettersList, 
  fetchTempLetterDetail,
  deleteTempLetter 
} from "../api/letters";
import { getHallInfo } from "../api/memorial";

import bgicon from "../features/Letters/assets/bg-icon.svg";

export const SavedLetterBoxPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [letters, setLetters] = useState([]);
  const [hallName, setHallName] = useState("");

  // 📌 추모관 정보 조회
  useEffect(() => {
    if (page !== "me" && hallId) loadHallInfo();
  }, [page, hallId]);

  const loadHallInfo = async () => {
    try {
      const res = await getHallInfo(hallId);
      setHallName(res?.data?.name || "추모관");
    } catch {
      setHallName("추모관");
    }
  };

  // 📌 임시보관함 리스트 로드
  useEffect(() => {
    if (hallId) loadTempLetters();
  }, [hallId]);

  const loadTempLetters = async () => {
    try {
      const list = await fetchTempLettersList(hallId);
      setLetters(list);
    } catch (err) {
      console.error("❌ 임시편지 로드 실패:", err);
    }
  };

  // 📌 편지 클릭 → 페이지 이동
  const handleSelectLetter = async (letterId) => {
    try {
      const detail = await fetchTempLetterDetail(hallId, letterId);

      navigate("/saved-letter", {
        state: {
          hallId,
          page,
          letterData: {
            toName: detail.toName,
            fromName: detail.fromName,
            content: detail.content,
          },
        },
      });
    } catch {
      console.error("❌ 상세 조회 실패");
    }
  };

  // ⭐ 임시 저장 편지 삭제 기능
  const handleDeleteLetter = async (letterId) => {
    try {
      await deleteTempLetter(hallId, letterId);
      await loadTempLetters();
    } catch {
      console.error("❌ 임시편지 삭제 실패");
    }
  };

  // ⭐ BarNavigate 경로
  const paths =
    page === "me"
      ? ["나의 추모관", "임시보관함"]
      : ["홈", `故 ${hallName}의 추모관`, "임시보관함"];

  return (
    <Background>
      <BGIcon src={bgicon} alt="" />
      
      <Wrapper>
        <NavWrapper>
          <BarNavigate
            paths={paths}
            onPathClick={(path) => {
              if (path === "홈") navigate("/home", { state: { hallId } });
              else if (path === "나의 추모관") navigate("/memorial", { state: { hallId } });
              else if (path === `故 ${hallName}의 추모관`) navigate("/memorial", { state: { hallId } });
            }}
          />
        </NavWrapper>

        <Title>총 {letters.length}개의 임시 저장된 편지가 있어요</Title>

        <LetterListWrapper>
          <LetterList
            letters={letters}
            onItemClick={handleSelectLetter}
            onDelete={handleDeleteLetter}
            showDelete={true}
            page={page}
          />
        </LetterListWrapper>

        <SideCategoryBox hallId={hallId} page={page} />
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;  /* ⭐ bgicon 기준 */
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    90deg,
    rgba(255, 241, 242, 0.3) 9.13%,
    rgba(255, 246, 235, 0.3) 76.44%,
    rgba(255, 239, 229, 0.3) 100%
  );
`;

const BGIcon = styled.img`
  position: fixed;  
  bottom: 3.5rem;
  right: 2.5rem;
  width: 22.00006rem;
  height: 11.62256rem;
  opacity: 0.7;
  pointer-events: none;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: flex-start;
  margin-top: 1.81rem;
  position: relative;
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 2rem;
`;

const LetterListWrapper = styled.div`
  width: 100%;
`;
