// src/features/OpenMemorialHome/components/OpenStep2.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import DatePicker from "../../../components/DatePicker";
import InputImgCard from "../../../components/InputImgCard";

export default function OpenStep2({ onValidChange, formData, setFormData }) {
  const birthDate = formData.birthDate || null;
  const deathDate = formData.deathDate || null;

  // 🔹 오늘 날짜 (시·분·초 0으로 맞춰서 날짜 비교용)
  const today = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  // 🔹 기준 날짜에서 ±일 이동 유틸 함수
  const shiftDate = (date, diffDays) => {
    if (!date) return null;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + diffDays);
    return d;
  };

  /**
   * 🔹 생일 maxDate 규칙
   * 1) 기본적으로 오늘(today)까지만 선택 가능 (미래 생일 불가)
   * 2) 기일(deathDate)이 이미 선택된 경우: 기일 - 1일 보다 느린 날짜는 선택 불가
   *    → today 와 (deathDate - 1일) 중 더 이른 날짜를 max로 사용
   */
  const birthMaxDate = (() => {
    const todayMax = today;
    if (!deathDate) return todayMax;
    const beforeDeath = shiftDate(deathDate, -1);
    return beforeDeath < todayMax ? beforeDeath : todayMax;
  })();

  /**
   * 🔹 기일 min/max 규칙
   * - minDate: 생일 다음날부터 선택 가능 (birthDate + 1일)
   * - maxDate: 오늘(today)까지만 선택 가능 (미래 기일 불가)
   */
  const deathMinDate = birthDate ? shiftDate(birthDate, 1) : null;
  const deathMaxDate = today;

  // 🔹 생일 & 기일이 둘 다 채워졌는지만 유효성으로 체크 (상세 검증은 DatePicker 제한으로 처리)
  useEffect(() => {
    const isValid = !!birthDate && !!deathDate;
    onValidChange?.(isValid);
  }, [birthDate, deathDate, onValidChange]);

  const handleBirthChange = (date) => {
    setFormData((prev) => ({ ...prev, birthDate: date }));
  };

  const handleDeathChange = (date) => {
    setFormData((prev) => ({ ...prev, deathDate: date }));
  };

  const handleProfileFileChange = (file) => {
    setFormData((prev) => ({ ...prev, profileFile: file }));
  };

  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>

      {/* 생일 */}
      <FormRow>
        <Row>
          <Label>
            고인의 생일을 알려주세요
            <RequiredDot src={IconEssentialEclipse} />
          </Label>
        </Row>
        <FieldRight>
          <DatePicker
            selected={birthDate}
            onChange={handleBirthChange}
            placeholder="YYYY/M/D"
            // 🔹 생일: 기일보다 빠른 날짜 & 오늘 이전(오늘 포함)까지만
            maxDate={birthMaxDate}
          />
        </FieldRight>
      </FormRow>

      {/* 기일 */}
      <FormRow>
        <Row>
          <Label>
            고인의 기일을 알려주세요
            <RequiredDot src={IconEssentialEclipse} />
          </Label>
        </Row>
        <FieldRight>
          <DatePicker
            selected={deathDate}
            onChange={handleDeathChange}
            placeholder="YYYY/M/D"
            // 🔹 기일: 생일 다음날부터 선택 가능
            minDate={deathMinDate || undefined}
            // 🔹 기일: 오늘까지만 선택 가능 (미래 불가)
            maxDate={deathMaxDate}
          />
        </FieldRight>
      </FormRow>

      {/* 프로필 이미지 */}
      <FormRow style={{ marginBottom: 0 }}>
        <Label>고인의 프로필 사진을 업로드해 주세요</Label>
        <FieldRight>
          <InputImgCard onFileChange={handleProfileFileChange} />
        </FieldRight>
      </FormRow>
    </>
  );
}

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.75rem;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Label = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  flex: 1;
  margin-bottom: 1.5rem;
`;

const RequiredDot = styled.img``;

const FieldRight = styled.div`
  flex-basis: 14rem;
  display: flex;
  justify-content: flex-end;

  > * {
    width: 14rem;
  }
`;
