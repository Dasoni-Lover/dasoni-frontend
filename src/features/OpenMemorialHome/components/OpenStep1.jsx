// src/features/OpenMemorialHome/components/OpenStep1.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";

export default function OpenStep1({ onValidChange }) {
  const [name, setName] = useState("");

  useEffect(() => {
    onValidChange?.(name.trim().length > 0);
  }, [name, onValidChange]);

  return (
    <>
      <StepTitle>고인의 성함을 입력해 주세요.</StepTitle>
      <InputField
        placeholder="성함을 입력해 주세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
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
