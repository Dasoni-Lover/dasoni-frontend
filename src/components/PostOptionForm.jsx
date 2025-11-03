// PostOptionForm.jsx
import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import IconEssential from "../assets/icon-essential-eclipse.svg";
import IconCalendar from "../features/WritePost/assets/icon-calendar.svg";
import IconRadioBlank from "../assets/icon-radio-blank.svg";
import IconRadioFilled from "../assets/icon-radio-filled.svg";

import { color, typo } from "../styles/tokens";
import { Column, Row } from "../styles/flex";
import ButtonL from "./ButtonL";

// react-datepicker 한글 적용
registerLocale("ko", ko);

/* ───────────── 커스텀 인풋 (react-datepicker용) ───────────── */
const DateInput = forwardRef(({ value, onClick, placeholder }, ref) => {
  return (
    <DateField onClick={onClick} ref={ref}>
      <input readOnly value={value || ""} placeholder={placeholder} />
      <CalendarButton type="button" aria-label="날짜 선택">
        <img src={IconCalendar} alt="calendar icon" />
      </CalendarButton>
    </DateField>
  );
});

export default function PostOptionForm() {
  const [scope, setScope] = useState("public");
  const [date, setDate] = useState(null);

  return (
    <Column $justify={"space-between"}>
      <Column>
        {/* 제목 + 필수마크 */}
        <Column $gap={"0.75rem"}>
          <Row $gap={"0.5rem"} $align="center">
            <Label>사진 속 날짜</Label>
            <img src={IconEssential} alt="필수" />
          </Row>

          {/* 날짜 선택 */}
          <DatePickerWrapper>
            <DatePicker
              selected={date}
              onChange={setDate}
              dateFormat="yyyy/M/d"
              placeholderText="YYYY/M/D"
              customInput={<DateInput placeholder="YYYY/M/D" />}
              popperPlacement="bottom-start"
              locale="ko"
              showPopperArrow={false}
            />
          </DatePickerWrapper>
        </Column>

        {/* 공유 범위 */}
        <Column>
          <Label>공유 범위</Label>

          <RadioCard role="radiogroup" aria-label="공유 범위">
            {/* 공개 */}
            <RadioOption
              role="radio"
              tabIndex={0}
              aria-checked={scope === "public"}
              onClick={() => setScope("public")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setScope("public");
                }
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  setScope("private");
                }
              }}
            >
              <RadioIcon
                src={scope === "public" ? IconRadioFilled : IconRadioBlank}
                alt={scope === "public" ? "선택됨" : "선택 안 됨"}
                aria-hidden
              />
              <Column $gap={"0.25rem"}>
                <RadioMainText>공유앨범</RadioMainText>
                <RadioSubText>
                  추모관에 입장한 사람들이 게시물을 볼 수 있어요
                </RadioSubText>
              </Column>
            </RadioOption>

            {/* 비공개 */}
            <RadioOption
              role="radio"
              tabIndex={0}
              aria-checked={scope === "private"}
              onClick={() => setScope("private")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setScope("private");
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  setScope("public");
                }
              }}
            >
              <RadioIcon
                src={scope === "private" ? IconRadioFilled : IconRadioBlank}
                alt={scope === "private" ? "선택됨" : "선택 안 됨"}
                aria-hidden
              />
              <Column $gap={"0.25rem"}>
                <RadioMainText>나와의 앨범</RadioMainText>
                <RadioSubText>나만 게시물을 볼 수 있어요</RadioSubText>
              </Column>
            </RadioOption>
          </RadioCard>
        </Column>
      </Column>

      {/* 버튼 */}
      <Column $gap={"1.25rem"}>
        <ButtonL text={"작성하기"} />
        <ButtonL text={"취소"} color={"white"} />
      </Column>
    </Column>
  );
}

const Label = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

/* DatePicker 스타일 */
const DatePickerWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.75rem;

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
`;

/* 날짜 입력 필드 */
const DateField = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  border: 1px solid ${color("black.10")};
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

/* 라디오 전체 박스 */
const RadioCard = styled.div`
  background: ${color("black.05")};
  border-radius: 10px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/* 라디오 한 줄 */
const RadioOption = styled.label`
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
`;

/* 아이콘형 라디오 이미지 */
const RadioIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const RadioMainText = styled.div`
  ${typo("bodym")};
  color: ${color("black.80")};
`;

const RadioSubText = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
