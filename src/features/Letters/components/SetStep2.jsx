// src/features/Letters/components/SetStep5.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import TextField from "../../../components/TextField";

export default function SetStep2({ onValidChange, formData, setFormData }) {
  const [value, setValue] = useState(formData.about || "");

  useEffect(() => {
    onValidChange && onValidChange(!!value.trim());
  }, [value, onValidChange]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    setFormData((prev) => ({ ...prev, about: v }));
  };

  return (
    <Wrapper>
      <Title>고인에 대해 알려주세요</Title>

      <TextField
        title={null}
        value={value}
        onChange={handleChange}
        placeholder={`예) 농담을 자주 하고 분위기를 밝게 만드는 스타일이었어요\n예) 항상 웃으면서 챙겨주던 따뜻한 사람이었어요`}
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
