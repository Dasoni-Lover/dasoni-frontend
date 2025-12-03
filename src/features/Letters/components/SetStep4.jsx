// src/features/Letters/components/SetStep2.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";

export default function SetStep4({ onValidChange, formData, setFormData }) {
  const [value, setValue] = useState(formData.nickname || "");

  useEffect(() => {
    onValidChange && onValidChange(!!value.trim());
  }, [value, onValidChange]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    setFormData((prev) => ({ ...prev, nickname: v }));
  };

  return (
    <Wrapper>
      <Title>고인이 자주 불러주던 호칭이나 애칭이 있으신가요?</Title>
      <InputField
        value={value}
        onChange={handleChange}
        placeholder="예) OO아, 우리 아들, 울 강아지"
      />
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

const Input = styled.input`
  width: 100%;
  height: 3.25rem;
  padding: 0 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${color("black.10")};
  background: ${color("white")};
  ${typo("bodym")};
  color: ${color("black.80")};

  &::placeholder {
    color: ${color("black.30")};
  }
`;
