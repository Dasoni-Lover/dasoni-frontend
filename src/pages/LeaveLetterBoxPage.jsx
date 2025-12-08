// src/pages/LeaveLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import Calendar from "../components/Calendar";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import ConfirmModal from "../components/ConfirmModal";
import { deleteLetter } from "../api/letters";

import calendaricon from "../assets/calendar-icon.svg";
import clickcalendaricon from "../assets/click-calendar-icon.svg";

import {
  fetchLettersList,
  fetchLetterDetail,
  fetchLettersCalendar,
} from "../api/letters";

export const LeaveLetterBoxPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [letters, setLetters] = useState([]);
  const [letterDates, setLetterDates] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  

  // 1) 편지 목록 조회
  useEffect(() => {
    if (!hallId) return;

    const loadLetters = async () => {
      try {
        const data = await fetchLettersList(hallId);
        setLetters(data);
      } catch (err) {
        console.error("편지 목록 조회 실패:", err);
      }
    };

    loadLetters();
  }, [hallId]);

  // 2) 달력 데이터 조회
  useEffect(() => {
    if (!hallId || !calendarOpen) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const loadCalendar = async () => {
      try {
        const days = await fetchLettersCalendar(hallId, year, month);
        setLetterDates(days);
      } catch (err) {
        console.error("달력 조회 실패:", err);
      }
    };

    loadCalendar();
  }, [hallId, calendarOpen]);

  // 3) 상세 조회 + 모달
  const openLetterDetail = async (letterId) => {
    try {
      const data = await fetchLetterDetail(hallId, letterId);
      setSelectedLetter(data);
      setModalOpen(true);
    } catch (err) {
      console.error("편지 상세 조회 실패:", err);
    }
  };

  // ⭐ 임시보관함 클릭 → 이동
  const goSavedLetterBox = () => {
    navigate("/saved-letterbox", {
      state: { hallId, page },
    });
  };

// 삭제 핸들러
const handleDeleteClick = (letterId) => {
  setDeleteTarget(letterId);
  setDeleteModalOpen(true);
};

const handleConfirmDelete = async () => {
  try {
    await deleteLetter(hallId, deleteTarget); // DELETE 요청

    // 삭제 후 목록 새로 불러오기
    const updated = await fetchLettersList(hallId);
    setLetters(updated);
  } catch (err) {
    console.error("삭제 실패:", err);
  } finally {
    setDeleteModalOpen(false);
    setDeleteTarget(null);
  }
};




  return (
    <Background>
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["나의 추모관", "보낸 편지함"]}
          title="보낸 편지함"
        />
      </NavWrapper>

      <TitleAndCalendar>
        <Title>총 {letters.length}개의 보낸 편지가 있어요</Title>

        <Box>
          <SavedButton onClick={goSavedLetterBox}>임시보관함</SavedButton>

          <CalendarWrapper onClick={() => setCalendarOpen(!calendarOpen)}>
            <CalendarBorder active={calendarOpen}>
              <CalendarIcon
                src={calendarOpen ? clickcalendaricon : calendaricon}
              />
            </CalendarBorder>
          </CalendarWrapper>
        </Box>
      </TitleAndCalendar>

      <ContentWrapper>
        <LetterArea calendarOpen={calendarOpen}>
          <LetterList
            letters={letters}
            onItemClick={openLetterDetail}
            onDelete={handleDeleteClick} // ✅ 삭제 클릭 함수 전달
            isNarrow={calendarOpen}
            showDelete={true}            // ✅ 삭제 버튼 항상 보이도록
          />

        </LetterArea>

        {calendarOpen && (
          <>
            <Divider />
            <CalendarArea>
              <Calendar hallId={hallId} letterDates={letterDates} />
            </CalendarArea>
          </>
        )}
      </ContentWrapper>

      <LetterModal
        isOpen={modalOpen}
        data={selectedLetter}
        onCancel={() => setModalOpen(false)}
      />
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="보낸 편지를 삭제할까요?"
        description="삭제된 편지는 다시 불러올 수 없어요."
        confirmText="삭제하기"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />


      <SideCategoryBox hallId={hallId} page={page} />
    </Wrapper>
    </Background>
  );
};

/* styled-components는 동일 — 생략 */

const Background=styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #FFF1F2 9.13%, #FFF6EB 76.44%, #FFEFE5 100%);
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: center;
  margin-top: 1.81rem;
  position: relative;
  
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`;

const TitleAndCalendar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Box=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 0.62rem;
`

const SavedButton=styled.div`
  display: flex;
  width: 7.5rem;
  height: 2.5rem;
  padding: 0.4375rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid var(--10, #DDD);
  background: #FFF;
  ${typo("body")};
  color: ${color("black.70")};
  box-sizing: border-box;
  cursor: pointer;
`

const CalendarWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CalendarBorder = styled.div`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.25rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: ${({ active }) => (active ? "1px solid #FFCC8C" : "1px solid #DDD")};
  background: ${({ active }) => (active ? "#FFF4E6" : "#FFF")};
  box-sizing: border-box;
`;

const CalendarIcon = styled.img`
  width: 1.5rem;
  height: 1.66669rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const LetterArea = styled.div`
  width: ${({ calendarOpen }) => (calendarOpen ? "29.125rem" : "68.5rem")};
  transition: width 0.4s ease;
`;

const CalendarArea = styled.div`
  width: 30rem;
  position: relative;
`;

const Divider = styled.div`
  width: 1px;
  height: 42.5rem;
  background-color: #ddd;
  margin: 0 0.5rem 0 2rem;
`;
