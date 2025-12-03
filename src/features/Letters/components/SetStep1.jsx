// src/features/Letters/components/SetStep1.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";

export default function SetStep1({ onValidChange, formData, setFormData }) {
  const [value, setValue] = useState(formData.relation || "");

  useEffect(() => {
    onValidChange && onValidChange(!!value.trim());
  }, [value, onValidChange]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    setFormData((prev) => ({ ...prev, relation: v }));
  };

  return (
    <Wrapper>
      <Title>고인과의 관계를 알려주세요</Title>
      <InputField
        value={value}
        onChange={handleChange}
        placeholder="예) 엄마, 할아버지, 대학교 친구"
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
