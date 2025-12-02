// src/features/OpenMemorialHall/components/OpenStep5.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Column, Row } from "../../../styles/flex";
import IconRadioFilled from "../../../assets/icon-radio-filled.svg";
import IconRadioBlank from "../../../assets/icon-radio-blank.svg";

export default function OpenStep5({ onValidChange, formData, setFormData }) {
  const { secret } = formData;

  useEffect(() => {
    const isValid = typeof secret === "boolean";
    onValidChange?.(isValid);
  }, [secret, onValidChange]);

  const handleSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      secret: value, // true = 비공개 / false = 공개
    }));
  };

  return (
    <>
      <StepTitle>추모관 검색을 허용할까요?</StepTitle>

      <Column $gap={"1.25rem"}>
        {/* 공개 (검색 허용) */}
        <GreyBox
          role="button"
          tabIndex={0}
          $active={secret === false}
          onClick={() => handleSelect(false)}
        >
          <Row $gap={"1rem"}>
            <RadioIcon
              src={secret === false ? IconRadioFilled : IconRadioBlank}
              alt="radio"
            />

            <Column $gap={"0.25rem"}>
              <RadioText>검색 허용하기</RadioText>
              <RadioInfo>
                다른 이용자가 고인의 이름으로 추모관을 검색해 방문할 수 있어요.
              </RadioInfo>
            </Column>
          </Row>
        </GreyBox>

        {/* 비공개 (검색 불가) */}
        <GreyBox
          role="button"
          tabIndex={0}
          $active={secret === true}
          onClick={() => handleSelect(true)}
        >
          <Row $gap={"1rem"}>
            <RadioIcon
              src={secret === true ? IconRadioFilled : IconRadioBlank}
              alt="radio"
            />

            <Column $gap={"0.25rem"}>
              <RadioText>검색 허용하지 않기</RadioText>
              <RadioInfo>
                초대 링크를 받은 사람만 추모관에 들어올 수 있어요.
              </RadioInfo>
            </Column>
          </Row>
        </GreyBox>
      </Column>
    </>
  );
}

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.75rem;
`;

const GreyBox = styled.div`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: #f8f8f8;
  cursor: pointer;
`;

const RadioIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const RadioText = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;

const RadioInfo = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
