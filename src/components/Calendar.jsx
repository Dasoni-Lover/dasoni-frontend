// ❌ LetterModal 관련 전부 제거
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import nextbtn from "../assets/calendar-next-btn.svg";
import falsebtn from "../assets/false-calendar-next-btn.svg";
import prevbtn from "../assets/prev-btn.svg";
import lettericon from "../features/Letters/assets/letter-icon.svg";
import { fetchLettersCalendar } from "../api/letters";

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ hallId, onClickLetter }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarLetters, setCalendarLetters] = useState([]);

  useEffect(() => {
    if (!hallId) return;
    const load = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const days = await fetchLettersCalendar(hallId, year, month);
      setCalendarLetters(days);
    };
    load();
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

  while (calendarDays.length % 7 !== 0)
    calendarDays.push({ day: "", currentMonth: false, letterId: null });

  return (
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
          <DateBox key={idx} hasLetter={!!d.letterId}>
            <span>{d.day}</span>
            {d.letterId && (
              <LetterIcon
                src={lettericon}
                onClick={() =>
                  onClickLetter({
                    date: `${currentDate.getFullYear()}.${String(
                      currentDate.getMonth() + 1
                    ).padStart(2, "0")}.${String(d.day).padStart(2, "0")}`,
                    letterId: d.letterId,
                  })
                }

              />
            )}
          </DateBox>
        ))}
      </DatesGrid>
    </CalendarContainer>
  );
};

export default Calendar;

/* styled-components 동일 */



const CalendarContainer = styled.div`
  box-sizing: border-box;
  width: 38.9rem;
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

  background-color: ${({ hasLetter }) =>
    hasLetter ? "#FFF4E6" : "transparent"};

  color: ${({ isCurrent }) => (isCurrent ? "#ACACAC" : "#ddd")};

  /* ✅ hasLetter일 때만 테두리 적용 */
  border: ${({ hasLetter }) =>
    hasLetter ? "1px solid #F8E4CA" : "none"};

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
