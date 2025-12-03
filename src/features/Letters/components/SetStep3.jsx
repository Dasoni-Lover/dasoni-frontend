// src/features/Letters/components/SetStep4.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";

export default function SetStep3({ onValidChange, formData, setFormData }) {
  const tone = formData.tone || "";

  useEffect(() => {
    onValidChange && onValidChange(!!tone);
  }, [tone, onValidChange]);

  const handleSelect = (selected) => {
    setFormData((prev) => ({ ...prev, tone: selected }));
  };

  return (
    <Wrapper>
      <Title>고인과는 평소 어떤 말투로 대화 하셨나요?</Title>
      <Row $gap={"0.6rem"}>
        <ToneButton
          type="button"
          $active={tone === "존댓말"}
          onClick={() => handleSelect("존댓말")}
        >
          존댓말
        </ToneButton>
        <ToneButton
          type="button"
          $active={tone === "반말"}
          onClick={() => handleSelect("반말")}
        >
          반말
        </ToneButton>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 2.75rem;
`;

const ToneButton = styled.div`
  width: 13.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  border: 1px solid
    ${({ $active }) => ($active ? color("black.5") : color("black.5"))};
  background: ${({ $active }) => ($active ? color("main") : color("white"))};
  ${typo("h4")};
  color: ${({ $active }) => ($active ? color("white") : color("black.70"))};
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  transition: background 0.15s ease-out, color 0.15s ease-out,
    border-color 0.15s ease-out;
`;
