// src/pages/SentLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import { Letter as LetterModal } from "../features/Letters/components/Letter";
import { SideDrawer } from "../features/Letters/components/SideDrawer";
import { fetchLettersList, fetchLetterDetail } from "../api/letters";
import { getHallInfo } from "../api/memorial"; // ✅ 추가: 추모관 이름 가져오기용

export const SentLetterBoxPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;

  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [hallName, setHallName] = useState(""); // ✅ 추모관 이름 상태 추가

  // ✅ 추모관 이름 가져오기
  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId) return;
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  // ✅ 편지 목록 불러오기
  const fetchLetters = async () => {
    if (!hallId) return;
    try {
      const list = await fetchLettersList(hallId);
      setLetters(list);
    } catch (err) {
      console.error("편지 목록 불러오기 실패:", err);
    }
  };

  // ✅ 편지 상세 불러오기
  const handleItemClick = async (letterId) => {
    if (!hallId) return;
    try {
      const detail = await fetchLetterDetail(hallId, letterId);
      setSelectedLetter(detail);
      setModalOpen(true);
    } catch (err) {
      console.error("편지 상세 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, [hallId]);

  // ✅ BarNavigate 표시용 텍스트 구성
  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["내가 입장한 추모관", hallTitle, "보낸 편지함"]}
          title="보낸 편지함"
        />
      </NavWrapper>

      <Title>총 {letters.length}개의 보낸 편지가 있어요</Title>

      <LetterArea>
        <LetterList letters={letters} onItemClick={handleItemClick} />
      </LetterArea>

      <LetterModal
        isOpen={modalOpen}
        data={selectedLetter}
        onCancel={() => setModalOpen(false)}
      />
      <SideDrawer />
    </Wrapper>
  );
};

// Styled
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: center;
  margin-top: 1.81rem;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 1.5rem;
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`;

const LetterArea = styled.div`
  width: 100%;
`;
