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
          />
        </FieldRight>
      </FormRow>

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
          />
        </FieldRight>
      </FormRow>

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
