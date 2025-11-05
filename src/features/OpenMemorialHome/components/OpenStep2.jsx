// src/features/OpenMemorialHome/components/OpenStep2.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import DatePicker from "../../../components/DatePicker";
import InputImgCard from "../../../components/InputImgCard";

export default function OpenStep2({ onValidChange }) {
  const [birthDate, setBirthDate] = useState(null); // 생일
  const [deathDate, setDeathDate] = useState(null); // 기일

  useEffect(() => {
    const isValid = !!birthDate && !!deathDate;
    onValidChange?.(isValid);
  }, [birthDate, deathDate, onValidChange]);

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
            onChange={setBirthDate}
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
            onChange={setDeathDate}
            placeholder="YYYY/M/D"
          />
        </FieldRight>
      </FormRow>

      <FormRow style={{ marginBottom: 0 }}>
        <Label>고인의 프로필 사진을 업로드해 주세요</Label>
        <FieldRight>
          <InputImgCard />
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
