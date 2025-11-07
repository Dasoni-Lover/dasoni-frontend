// SentLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from '../styles/tokens';
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import calendaricon from "../assets/calendar-icon.svg";
import clickicon from "../assets/click-calendar-icon.svg";
import { SideDrawer } from '../features/Letters/components/SideDrawer';
import { Calendar } from '../components/Calendar';
import LetterModal from "../features/Letters/components/LetterModal";
import axios from "axios";

export const SentLetterBoxPage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [letters, setLetters] = useState([]);
  const hallId = location.state?.hallId; 

  // 편지 리스트 조회
  const fetchLetters = async () => {
    try {
      const response = await axios.get(`/api/halls/${hallId}/letters/list`);
      const lettersData = response.data?.letters || []; // undefined일 경우 빈 배열
      const sortedLetters = lettersData.sort(
        (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
      );
      setLetters(sortedLetters);
    } catch (err) {
      console.error("편지 조회 실패:", err);
      setLetters([]);
    }
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

      <Container>
        <CalendarWrapper 
          onClick={() => setShowCalendar(!showCalendar)}
          showCalendar={showCalendar} 
        >
          <CalendarIconStyled src={showCalendar ? clickicon : calendaricon} />
        </CalendarWrapper>
      </Container>

      <ContentArea>
        {letters.length > 0 && (
          <LetterArea showCalendar={showCalendar}>
            <LetterList letters={letters} onItemClick={() => setModalOpen(true)} />
          </LetterArea>
        )}

        {showCalendar && (
          <>
            <Divider />
            <CalendarArea>
              <Calendar />
            </CalendarArea>
          </>
        )}
      </ContentArea>

      <LetterModal isOpen={modalOpen} onCancel={() => setModalOpen(false)} />
      <SideDrawer/>
    </Wrapper>
  );
};

// Styled Components
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CalendarWrapper = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ showCalendar }) => (showCalendar ? '#FFCC8C' : '#DDD')};
  background: ${({ showCalendar }) => (showCalendar ? '#FFF4E6' : '#FFF')};
`;

const CalendarIconStyled = styled.img`
  width: 1.5rem;
  height: 1.66669rem;
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  display: flex;
  width: 100%;
`;

const LetterArea = styled.div`
  width: ${({ showCalendar }) => (showCalendar ? '29.125rem' : '100%')};
  transition: width 0.3s ease;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 42.5rem;
  margin-right: 0.81rem;
  margin-left: 1.25rem;
  background-color: #ddd;
`;

const CalendarArea = styled.div`
  flex: 1;
  min-width: 0;
`;

