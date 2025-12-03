// src/features/Letters/components/SetStep3.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import TextField from "../../../components/TextField";

export default function SetStep5({ onValidChange, formData, setFormData }) {
  const [value, setValue] = useState(formData.frequentWords || "");

  useEffect(() => {
    onValidChange && onValidChange(!!value.trim());
  }, [value, onValidChange]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    setFormData((prev) => ({ ...prev, frequentWords: v }));
  };

  return (
    <Wrapper>
      <Title>고인이 자주 사용하던 말이나 단어를 알려주세요</Title>

      <TextField
        title={null}
        value={value}
        onChange={handleChange}
        placeholder="예) 밥은 먹었어?, 위험하니까 일찍 다녀, 사랑해, 괜찮아 다 잘될 거야"
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
  margin-bottom: 1.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 7.5rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${color("black.10")};
  background: ${color("white")};
  resize: none;

  ${typo("bodym")};
  color: ${color("black.80")};

  &::placeholder {
    color: ${color("black.30")};
  }
`;
