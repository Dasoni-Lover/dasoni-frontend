// src/features/OpenMemorialHome/components/OpenStep1.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";

export default function OpenStep1({ onValidChange, formData, setFormData }) {
  const name = formData.name || "";

  useEffect(() => {
    onValidChange?.(name.trim().length > 0);
  }, [name, onValidChange]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  return (
    <>
      <StepTitle>
        고인의 성함을 입력해 주세요
        <RequiredDot src={IconEssentialEclipse} />
      </StepTitle>
      <InputField
        placeholder="성함을 입력해 주세요."
        value={name}
        onChange={handleChange}
      />
    </>
  );
}

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.75rem;
`;

const RequiredDot = styled.img``;
