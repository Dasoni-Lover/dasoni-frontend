import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import { SideDrawer } from "../features/Letters/components/SideDrawer";
import { fetchLettersList, fetchLetterDetail } from "../api/letters";
import { getHallInfo } from "../api/memorial";
import Calendar from "../components/Calendar";

import calendaricon from "../assets/calendar-icon.svg";
import clickcalendaricon from "../assets/click-calendar-icon.svg";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

export const SentLetterBoxPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [hallName, setHallName] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [letterDates, setLetterDates] = useState([]);

  // 추모관 정보 불러오기
  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId) return;
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
        console.log("불러온 추모관 정보:", info);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  // 편지 목록 불러오기
  const fetchLetters = async () => {
    if (!hallId) return;
    try {
      const list = await fetchLettersList(hallId);
      setLetters(list);

      const dates = list.map((l) => new Date(l.completedAt).getDate());
      setLetterDates(dates);
      console.log("불러온 편지 목록:", list);
    } catch (err) {
      console.error("편지 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, [hallId]);

  const handleItemClick = async (letterId) => {
    if (!hallId) return;
    try {
      const detail = await fetchLetterDetail(hallId, letterId);
      setSelectedLetter(detail);
      setModalOpen(true);
      console.log("선택한 편지 상세:", detail);
    } catch (err) {
      console.error("편지 상세 불러오기 실패:", err);
    }
  };

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["내가 입장한 추모관", hallTitle, "보낸 편지함"]}
          title="보낸 편지함"
        />
      </NavWrapper>

      <TitleAndCalendar>
        <Title>총 {letters.length}개의 보낸 편지가 있어요</Title>
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
          <LetterList letters={letters} onItemClick={handleItemClick} />
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

      {/* hallId를 SideDrawer에 전달 */}
      <SideCategoryBox hallId={hallId} page={page}/>
    </Wrapper>
  );
};

// --- styled components ---
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

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0rem;
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
  aspect-ratio: 1/1;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 42.5rem;
  background-color: #ddd;
  margin: 0 0.5rem 0 2rem;
`;
