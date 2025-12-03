// src/features/RequestEntry/components/RequestStep3.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";

export default function RequestStep3({ onValidChange, value, onChange }) {
  const [intro, setIntro] = useState(value.review || "");

  useEffect(() => {
    const isValid = !!intro;
    onValidChange?.(isValid);

    onChange({
      review: intro,
    });
  }, [intro]);

  return (
    <>
      <StepTitle>고인을 한줄로 소개해 주세요</StepTitle>

      <IntroTextArea
        placeholder={`사용자에게 고인은 어떤 사람이었나요?\n예) 늘 유쾌한 농담으로 모두를 웃게 만들던 사람\n예) 마지막까지 열정을 잃지 않던 멋진 선배님`}
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
    </>
  );
}

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.38rem;
`;

const IntroTextArea = styled.textarea`
  min-height: 9.5rem;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  ${typo("h4")};
  color: ${color("black.70")};

  resize: none;
  outline: none;
  border-radius: 0.625rem;
  border: 2px solid ${color("black.5")};
  background: ${color("lightgrey")};

  &::placeholder {
    color: ${color("black.10")};
  }
`;
