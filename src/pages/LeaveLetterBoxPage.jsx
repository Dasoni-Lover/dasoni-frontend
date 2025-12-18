// src/pages/LeaveLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation} from "react-router-dom";

import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { useNavigate } from "react-router-dom";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import Calendar from "../components/Calendar";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import ConfirmModal from "../components/ConfirmModal";
import NoneLetter from "../features/Letters/components/NoneLetter";
import { deleteLetter } from "../api/letters";

import calendaricon from "../assets/calendar-icon.svg";
import clickcalendaricon from "../assets/click-calendar-icon.svg";
import bgicon from "../features/Letters/assets/bg-icon.svg";

import { useWriteLetterFlow } from "../hooks/useWriteLetterFlow";
import { CheckReturnModal } from '../features/Letters/components/CheckReturnModal';
import CalendarList from "../features/Letters/components/CalendarList";


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
const [calendarListOpen, setCalendarListOpen] = useState(false);
const [calendarLetters, setCalendarLetters] = useState([]);


  

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

const handleCalendarLetterClick = async ({ date, letterId }) => {
  if (!hallId) return;

  try {
    const list = await fetchLettersList(hallId);

    // ✅ 해당 날짜 편지만 필터링
    const filtered = list.filter(
      (letter) =>
        letter.completedAt
          ?.replace(/[-/]/g, ".")
          .startsWith(date)
    );

    // ✅ 1개면 바로 상세
    if (filtered.length === 1) {
      openLetterDetail(filtered[0].letterId);
      return;
    }

    // ✅ 여러 개면 CalendarList
    setCalendarLetters(filtered);
    setCalendarListOpen(true);
  } catch (err) {
    console.error("캘린더 편지 조회 실패:", err);
  }
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


const {
  handleClickWriteLetter,
  handleModalConfirm,
  showModal,
  showAlreadySentModal,
  closeModal,
  closeAlreadySentModal,
} = useWriteLetterFlow({ hallId, page });

  return (
    <Background>
      <BGIcon src={bgicon} alt="" />
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["나의 추모관", "보낸 편지함"]}
          
        onPathClick={(path) => {
          if (path === "나의 추모관") {
            // hallId 유지하면서 홈으로 이동
            navigate("/memorial", { state: { hallId } });
          }
        }}
      />
      </NavWrapper>

      <TitleAndCalendar>
        <Title>총 {letters.length}개의 보낸 편지가 있어요</Title>
        {letters.length === 0 ? (
                  <></>
                ) : (
        <Box>

          <CalendarWrapper onClick={() => setCalendarOpen(!calendarOpen)}>
            <CalendarBorder active={calendarOpen}>
              <CalendarIcon
                src={calendarOpen ? clickcalendaricon : calendaricon}
              />
            </CalendarBorder>
          </CalendarWrapper>
        </Box>)}
      </TitleAndCalendar>

      <ContentWrapper>
        {letters.length === 0 ? (
          <NoneLetter
            text={"현재 보낸 편지가 없어요\n소중한 마음을 담아 편지를 써 보세요"}
            showButton
            onWriteLetter={handleClickWriteLetter}
          />
                ) : (
          <>
            <LetterArea calendarOpen={calendarOpen}>
              <LetterList
                letters={letters}
                onItemClick={openLetterDetail}
                onDelete={handleDeleteClick}
                isNarrow={calendarOpen}
                showDelete={true}
              />
            </LetterArea>

            {calendarOpen && (
              <>
                <Divider />
                <CalendarArea>
                  <Calendar hallId={hallId} onClickLetter={handleCalendarLetterClick} />
                </CalendarArea>
              </>
            )}
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
      {showModal && (
                <CheckReturnModal
                  onClose={closeModal}
                  onConfirm={handleModalConfirm}
                />
              )}
              {showAlreadySentModal && (
                <ConfirmModal
                  isOpen
                  title="오늘은 이미 편지를 보냈어요"
                  description={
                    <>
                      하루에 한 번만 편지를 작성할 수 있어요.
                      <br />
                      내일 다시 편지를 남겨주세요.
                    </>
                  }
                  confirmText="확인"
                  onConfirm={closeAlreadySentModal}
                />
              )}
    </Wrapper> 
    {calendarListOpen && (
  <CalendarListOverlay onClick={() => setCalendarListOpen(false)}>
    <CalendarListModal onClick={(e) => e.stopPropagation()}>
      <CalendarList
        letters={calendarLetters}
        onSelect={(letterId) => {
          setCalendarListOpen(false);
          openLetterDetail(letterId);
        }}
        onClose={() => setCalendarListOpen(false)}
      />
    </CalendarListModal>
  </CalendarListOverlay>
)}


    </Background>
  );
};

/* styled-components는 동일 — 생략 */

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

const CalendarListOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarListModal = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  width: 73.5rem;
  height: 29.8125rem;
  box-sizing: border-box;
    display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;
