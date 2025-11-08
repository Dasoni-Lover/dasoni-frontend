import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import nextbtn from "../assets/calendar-next-btn.svg";
import falsebtn from "../assets/false-calendar-next-btn.svg";
import prevbtn from "../assets/prev-btn.svg";
import lettericon from "../features/Letters/assets/letter-icon.svg";
import LetterModal from "../features/Letters/components/LetterModal";
import { fetchLetterDetail, fetchLettersCalendar } from "../api/letters";

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ hallId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarLetters, setCalendarLetters] = useState([]); // 달력 편지 리스트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    if (!hallId) return;
    const loadCalendar = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const days = await fetchLettersCalendar(hallId, year, month);
        setCalendarLetters(days); // [{ date, letterId }]
      } catch (err) {
        console.error("달력 편지 조회 실패:", err);
      }
    };
    loadCalendar();
  }, [currentDate, hallId]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const today = new Date();
  const isNextMonthAvailable =
    currentDate.getFullYear() < today.getFullYear() ||
    (currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() < today.getMonth());

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => {
    if (!isNextMonthAvailable) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const calendarDays = [];
  for (let i = startDay - 1; i >= 0; i--)
    calendarDays.push({ day: prevEnd - i, currentMonth: false, letterId: null });

  for (let i = 1; i <= daysInMonth; i++) {
    const dayStr = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(i).padStart(2, "0")}`;
    const letterObj = calendarLetters.find((l) => l.date === dayStr);
    calendarDays.push({
      day: i,
      currentMonth: true,
      letterId: letterObj?.letterId || null,
    });
  }

  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  for (let i = 1; calendarDays.length < totalCells; i++)
    calendarDays.push({ day: i, currentMonth: false, letterId: null });

  const handleLetterClick = async (letterId) => {
    if (!letterId) return;
    try {
      const detail = await fetchLetterDetail(hallId, letterId);
      setSelectedLetter(detail);
      setIsModalOpen(true);
    } catch (err) {
      console.error("편지 상세 조회 실패:", err);
    }
  };

  return (
    <>
      <CalendarContainer>
        <Header>
          <NavButton src={prevbtn} onClick={prevMonth} />
          <MonthLabel>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </MonthLabel>
          <NavButton
            src={isNextMonthAvailable ? nextbtn : falsebtn}
            onClick={nextMonth}
            style={{ cursor: isNextMonthAvailable ? "pointer" : "default" }}
          />
        </Header>

        <WeekRow>{weekDays.map((d) => <WeekDay key={d}>{d}</WeekDay>)}</WeekRow>

        <DatesGrid>
          {calendarDays.map((d, idx) => (
            <DateBox key={idx} isCurrent={d.currentMonth} hasLetter={!!d.letterId}>
              <span>{d.day}</span>
              {d.letterId && (
                <LetterIcon
                  src={lettericon}
                  alt="편지 아이콘"
                  onClick={() => handleLetterClick(d.letterId)}
                />
              )}
            </DateBox>
          ))}
        </DatesGrid>
      </CalendarContainer>

      <LetterModal
        isOpen={isModalOpen}
        data={selectedLetter}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Calendar;

// Styled Components

const CalendarContainer = styled.div`
  box-sizing: border-box;
  width: 38.9rem;
  background: ${color ? color("white") : "#fff"};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.78rem;
  width: 100%;
  gap: 2rem;
`;

const NavButton = styled.img`
  background: none;
  border: none;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const MonthLabel = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const WeekRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.94rem;
  margin-bottom: 3.75rem;
  width: 100%;
`;

const WeekDay = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
  text-align: center;
  width: 4.75rem;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 4.75rem);
  grid-auto-rows: 5rem;
  column-gap: 0.94rem;
  row-gap: 0.19rem;
`;

const DateBox = styled.div`
  box-sizing: border-box;
  width: 4.75rem;
  height: 5rem;
  text-align: center;
  padding-top: 0.25rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ hasLetter }) => (hasLetter ? "#FFF4E6" : "transparent")};
  color: ${({ isCurrent }) => (isCurrent ? "#ACACAC" : "#ddd")};
  ${typo("bodyb")};
`;

const LetterIcon = styled.img`
  width: 3.75rem;
  height: 2.375rem;
  aspect-ratio: 30/19;
  margin-top: 0.38rem;
  cursor: pointer;
  transition: transform 0.1s ease, filter 0.1s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.05);
  }

  &:active {
    transform: scale(0.95);
    filter: brightness(0.9);
  }
`;
