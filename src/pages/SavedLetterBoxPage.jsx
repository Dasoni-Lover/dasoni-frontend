// src/pages/SavedLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";

import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import Calendar from "../components/Calendar";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

import {
  fetchTempLettersList,
  fetchTempLetterDetail,
} from "../api/letters";

import { getHallInfo } from "../api/memorial";

import calendaricon from "../assets/calendar-icon.svg";
import clickcalendaricon from "../assets/click-calendar-icon.svg";

export const SavedLetterBoxPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [letterDates, setLetterDates] = useState([]);

  // ⭐ 추모관 이름
  const [hallName, setHallName] = useState("");

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  // -------------------------
  // 📌 me가 아닐 경우 → 추모관 정보 조회
  // -------------------------
  useEffect(() => {
    if (page !== "me" && hallId) {
      loadHallInfo();
    }
  }, [page, hallId]);

  const loadHallInfo = async () => {
    try {
      const res = await getHallInfo(hallId);
      setHallName(res?.data?.name || "추모관");
    } catch (err) {
      console.error("❌ 추모관 정보 불러오기 실패:", err);
      setHallName("추모관");
    }
  };

  // -------------------------
  // 📌 임시보관함 리스트
  // -------------------------
  useEffect(() => {
    if (!hallId) return;
    loadTempLetters();
  }, [hallId]);

  const loadTempLetters = async () => {
    try {
      const list = await fetchTempLettersList(hallId);
      setLetters(list);
    } catch (err) {
      console.error("❌ 임시편지 로드 실패:", err);
    }
  };

  // -------------------------
  // 📌 상세 조회
  // -------------------------
  const handleSelectLetter = async (letterId) => {
    try {
      const detail = await fetchTempLetterDetail(hallId, letterId);
      setSelectedLetter(detail);
      setModalOpen(true);
    } catch (err) {
      console.error("❌ 상세 조회 실패:", err);
    }
  };

  // -------------------------
  // ⭐ BarNavigate 경로 설정
  // -------------------------
  const paths =
    page === "me"
      ? ["나의 추모관", "보낸 편지함", "임시보관함"]
      : ["홈", `故 ${hallName}의 추모관`, "임시보관함"];

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate paths={paths} />
      </NavWrapper>

      <TitleAndCalendar>
        <Title>총 {letters.length}개의 임시 저장된 편지가 있어요</Title>

        <CalendarWrapper onClick={toggleCalendar}>
          <CalendarBorder active={calendarOpen}>
            <CalendarIcon
              src={calendarOpen ? clickcalendaricon : calendaricon}
            />
          </CalendarBorder>
        </CalendarWrapper>
      </TitleAndCalendar>

      <ContentWrapper>
        <LetterArea calendarOpen={calendarOpen}>
          <LetterList letters={letters} onSelectLetter={handleSelectLetter} />
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

      <SideCategoryBox hallId={hallId} page={page} />
    </Wrapper>
  );
};

// ======================
// Styled components
// ======================
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
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0rem;
`;

const LetterArea = styled.div`
  width: ${({ calendarOpen }) => (calendarOpen ? "29.125rem" : "68.5rem")};
  transition: width 0.4s ease;
`;

const CalendarArea = styled.div`
  width: 30rem;
  position: relative;
`;

const CalendarIcon = styled.img`
  width: 1.5rem;
  height: 1.66669rem;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CalendarBorder = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.25rem;
  border: ${({ active }) => (active ? "1px solid #FFCC8C" : "1px solid #DDD")};
  background: ${({ active }) => (active ? "#FFF4E6" : "#FFF")};
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 42.5rem;
  background-color: #ddd;
  margin: 0 0.5rem 0 2rem;
`;
