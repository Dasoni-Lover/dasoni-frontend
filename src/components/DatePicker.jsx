import React, { forwardRef } from "react";
import styled from "styled-components";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import IconCalendar from "../features/WritePost/assets/icon-calendar.svg";
import { color, typo } from "../styles/tokens";

/**
 * 📅 <DatePicker /> — 공통 날짜 선택 컴포넌트
 *
 * ✅ 기본 사용법:
 * ```jsx
 * import DatePicker from "../components/DatePicker";
 *
 * const [date, setDate] = useState(null);
 *
 * <DatePicker
 *   selected={date}                 // 선택된 날짜 (Date 객체)
 *   onChange={setDate}              // 날짜 변경 핸들러
 *   placeholder="YYYY/M/D"          // placeholder 텍스트 (선택사항)
 *   dateFormat="yyyy/M/d"           // 표시 형식 (선택사항)
 *   minDate={new Date()}            // 최소 선택 가능 날짜 (선택사항)
 *   maxDate={new Date("2025-12-31")} // 최대 선택 가능 날짜 (선택사항)
 *   showMonthDropdown               // 월 드롭다운 표시 (선택사항)
 *   showYearDropdown                // 연도 드롭다운 표시 (선택사항)
 * />
 * ```
 *
 * ⚙️ Props 요약:
 * - `selected`: Date | null — 현재 선택된 날짜
 * - `onChange`: (date: Date) => void — 날짜 선택 시 호출되는 함수
 * - `placeholder`: string — 입력 필드 placeholder (기본값: "YYYY/M/D")
 * - `dateFormat`: string — 표시할 날짜 형식 (기본값: "yyyy/M/d")
 * - 나머지 props(`minDate`, `maxDate`, `showYearDropdown` 등)는 react-datepicker의 모든 옵션 지원
 */

// react-datepicker 한글 적용
registerLocale("ko", ko);

/* ───────────── 커스텀 인풋 (react-datepicker용) ───────────── */
const DateInput = forwardRef(({ value, onClick, placeholder, borderColor }, ref) => {
  return (
    <DateField onClick={onClick} ref={ref} $borderColor={borderColor}>
      <input readOnly value={value || ""} placeholder={placeholder} />
      <CalendarButton type="button" aria-label="날짜 선택">
        <img src={IconCalendar} alt="calendar icon" />
      </CalendarButton>
    </DateField>
  );
});

function DatePicker({
  selected,
  onChange,
  placeholder = "YYYY/M/D",
  dateFormat = "yyyy/M/d",
  borderColor, // ✅ 새로 추가된 prop
  ...props
}) {
  return (
    <DatePickerWrapper>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        customInput={<DateInput placeholder={placeholder} borderColor={borderColor} />}
        popperPlacement="bottom-start"
        locale="ko"
        showPopperArrow={false}
        {...props}
      />
    </DatePickerWrapper>
  );
}

export default DatePicker;

/* ───────────── 스타일 ───────────── */
const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker {
    border: 1px solid ${color("black.10")};
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    font-family: inherit;
  }
  .react-datepicker__header {
    background: ${color("white")};
    border-bottom: 1px solid ${color("black.10")};
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${color("black.90")};
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
    display: block;
  }
`;

const DateField = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${({ $borderColor }) => $borderColor || color("black.10")}; /* ✅ 수정 부분 */
  background: ${color("white")};
  display: grid;
  grid-template-columns: 1fr 44px;
  align-items: center;
  padding: 0 0 0 12px;
  text-align: left;
  cursor: pointer;

  input {
    ${typo("bodym")};
    color: ${color("black.70")};
    border: 0;
    outline: none;
    background: transparent;
    cursor: pointer;

    &::placeholder {
      color: ${color("black.40")};
    }
  }
`;

const CalendarButton = styled.span`
  width: 44px;
  height: 100%;
  display: grid;
  place-items: center;
  border-left: 1px solid ${color("black.10")};
  background: ${color("black.90")};
  border-radius: 0 10px 10px 0;
  color: ${color("white")};

  img {
    width: 18px;
    height: 18px;
  }
`;

//<DatePicker selected={date} onChange={setDate} borderColor="#FF5B5B"  />
