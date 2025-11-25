// src/components/DatePicker.jsx
import React, { forwardRef } from "react";
import styled from "styled-components";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import DefaultIconCalendar from "../assets/calendar-icon-black.svg";
import DefaultClearIcon from "../assets/input-false-icon.svg";
import { color, typo } from "../styles/tokens";

// react-datepicker 한글 적용
registerLocale("ko", ko);

/* ───────────── 커스텀 인풋 (react-datepicker용) ───────────── */
const DateInput = forwardRef(
  (
    {
      value,
      onClick,
      placeholder,
      borderColor,
      $height,
      onClear,
      calendarIcon,
      showClear,
      clearIcon,
    },
    ref
  ) => {
    return (
      <DateField
        onClick={onClick}
        ref={ref}
        $borderColor={borderColor}
        $height={$height}
      >
        {/* 왼쪽: 달력 아이콘 */}
        <CalendarButton type="button">
          <img src={calendarIcon} alt="calendar icon" />
        </CalendarButton>

        {/* 가운데: 날짜 텍스트 */}
        <InputArea>
          <input readOnly value={value || ""} placeholder={placeholder} />
        </InputArea>

        {/* 오른쪽: X(초기화) 버튼 — 날짜 있고 showClear일 때만 */}
        {value && showClear && (
          <ClearButton
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // 달력 열림 방지
              onClear();
            }}
          >
            <img src={clearIcon} alt="clear" />
          </ClearButton>
        )}
      </DateField>
    );
  }
);

/* ───────────── DatePicker ───────────── */
function DatePicker({
  selected,
  onChange,
  placeholder = "YYYY/M/D",
  dateFormat = "yyyy/M/d",
  borderColor,
  width = "100%",
  height = "48px",
  showMonthDropdown = true,
  showYearDropdown = true,

  /* showClear 디폴트 → false 로 변경 */
  calendarIcon = DefaultIconCalendar,
  showClear = false,
  clearIcon = DefaultClearIcon,

  ...props
}) {
  return (
    <DatePickerWrapper $width={width}>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        customInput={
          <DateInput
            placeholder={placeholder}
            borderColor={borderColor}
            $height={height}
            value={selected ? formatDate(selected) : ""}
            onClear={() => onChange(null)}
            calendarIcon={calendarIcon}
            showClear={showClear}
            clearIcon={clearIcon}
          />
        }
        popperPlacement="bottom-start"
        locale="ko"
        showPopperArrow={false}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode="select"
        {...props}
      />
    </DatePickerWrapper>
  );
}

export default DatePicker;

/* 날짜 포맷 */
function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  } catch {
    return "";
  }
}

/* ───────────── 스타일 ───────────── */

const DatePickerWrapper = styled.div`
  width: ${({ $width }) => $width};

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }
`;

const DateField = styled.div`
  width: 100%;
  height: ${({ $height }) => $height};
  border-radius: 4px;
  border: 1px solid ${({ $borderColor }) => $borderColor || color("black.10")};
  background: ${color("white")};
  display: grid;
  grid-template-columns: 2.7rem 1fr 2rem;
  align-items: center;
  padding: 0.62rem 0.94rem;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
`;

const CalendarButton = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  display: grid;
  place-items: center;
  box-sizing: border-box;
`;

const InputArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    border: 0;
    background: transparent;
    ${typo("bodym")};
    color: ${color("black.70")};
    outline: none;
    cursor: pointer;

    &::placeholder {
      color: ${color("black.30")};
    }
  }
`;

const ClearButton = styled.button`
  width: 1.7rem;
  height: 1.7rem;
  border: none;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
`;


{/* <DatePicker
  selected={date}
  onChange={setDate}
  calendarIcon={YellowCalendar}
  showClear={false}
/> */}