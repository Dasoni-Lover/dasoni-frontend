import React, { useState } from "react";
import styled from "styled-components";
import IconEssential from "../assets/icon-essential-eclipse.svg";
import { color, typo } from "../styles/tokens";
import { Column } from "../styles/flex";
import ButtonL from "./ButtonL";

export default function PostOptionForm() {
  const [scope, setScope] = useState("public"); // 기본 선택값

  return (
    <Column $justify={"space-between"}>
      <HeaderRow>
        <Label>사진 속 날짜</Label>
        <img src={IconEssential} alt="필수" />
      </HeaderRow>

      <DateSelector type="date" placeholder="YYYY-MM-DD" />

      <Label>공유 범위</Label>
      <RadioWrapper>
        <OptionLabel>
          <RadioButton
            type="radio"
            name="scope"
            value="public"
            checked={scope === "public"}
            onChange={(e) => setScope(e.target.value)}
          />
          <Column $gap={"0.25rem"}>
            <RadioMainText>공유 앨범</RadioMainText>
            <RadioSubText>
              추모관에 입장한 사람들이 게시물을 볼 수 있어요
            </RadioSubText>
          </Column>
        </OptionLabel>

        <OptionLabel>
          <RadioButton
            type="radio"
            name="scope"
            value="private"
            checked={scope === "private"}
            onChange={(e) => setScope(e.target.value)}
          />
          <Column $gap={"0.25rem"}>
            <RadioMainText>나와의 앨범</RadioMainText>
            <RadioSubText>나만 게시물을 볼 수 있어요</RadioSubText>
          </Column>
        </OptionLabel>
      </RadioWrapper>

      <Column $gap={"1.25rem"}>
        <ButtonL text={"작성하기"} />
        <ButtonL text={"취소"} color={"white"} />
      </Column>
    </Column>
  );
}

/* ───────────── styled-components ───────────── */

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const DateSelector = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${color("black.10")};
  background: ${color("white")};
  ${typo("body2")};
  color: ${color("black.80")};
  outline: none;
  margin-bottom: 2.75rem;
  appearance: none;

  &::placeholder {
    color: ${color("black.40")};
    opacity: 1;
  }

  &::-webkit-calendar-picker-indicator {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: ${color("black.90")};
    cursor: pointer;
    padding: 4px;
    margin-right: 6px;
    filter: invert(1);
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 1rem;
  margin-bottom: 5.5rem;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
`;

const RadioButton = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: ${color("black.90")};
`;

const RadioMainText = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;

const RadioSubText = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
