import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { color, typo } from '../styles/tokens';
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import { SideDrawer } from '../features/Letters/components/SideDrawer';
import { fetchLettersList, fetchLetterDetail } from "../api/letters";

export const SentLetterBoxPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;

  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const fetchLetters = async () => {
    if (!hallId) return;
    const list = await fetchLettersList(hallId);
    setLetters(list);
  };

  const handleItemClick = async (letterId) => {
    if (!hallId) return;
    const detail = await fetchLetterDetail(hallId, letterId);
    setSelectedLetter(detail);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchLetters();
  }, [hallId]);

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate />
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

      <SideDrawer/>
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
