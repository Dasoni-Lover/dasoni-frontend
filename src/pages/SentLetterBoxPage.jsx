import React, { useState } from 'react'
import styled from 'styled-components'
import { color, typo } from '../styles/tokens'
import BarNavigate from "../components/BarNavigate"
import { LetterList } from "../features/Letters/components/LetterList"
import calendaricon from "../assets/calendar-icon.svg"
import clickicon from "../assets/click-calendar-icon.svg"
import { Calendar } from '../components/Calendar'
import LetterModal from "../features/Letters/components/LetterModal"

export const SentLetterBoxPage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate />
      </NavWrapper>
      <Title>총 3개의 보낸 편지가 있어요</Title>

      <Container>
        <CalendarWrapper 
          onClick={() => setShowCalendar(!showCalendar)}
          showCalendar={showCalendar} 
        >
          <CalendarIconStyled src={showCalendar ? clickicon : calendaricon} />
        </CalendarWrapper>
      </Container>

      <ContentArea>
        <LetterArea showCalendar={showCalendar}>
          {/* LetterList에 모달 열기 함수 전달 */}
          <LetterList onItemClick={() => setModalOpen(true)} />
        </LetterArea>

        {showCalendar && (
          <>
            <Divider />
            <CalendarArea>
              <Calendar />
            </CalendarArea>
          </>
        )}
      </ContentArea>

      {/* 모달 */}
      <LetterModal isOpen={modalOpen} onCancel={() => setModalOpen(false)} />
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: center;
  margin-top: 1.81rem;
`

const Title = styled.div`
  width: 100%;
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 1.5rem;
`

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`

const Container=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CalendarWrapper = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;

  /* 클릭 상태에 따라 border & background 변경 */
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
`

const LetterArea = styled.div`
  width: ${({ showCalendar }) => (showCalendar ? '29.125rem' : '100%')};
  transition: width 0.3s ease;
`

const Divider = styled.div`
  width: 0.0625rem;
  height: 42.5rem;
  margin-right: 0.81rem;
  margin-left: 1.25rem;
  background-color: #ddd;
`

const CalendarArea = styled.div`
  flex: 1;
  min-width: 0;
`
