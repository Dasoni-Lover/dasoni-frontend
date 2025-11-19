// src/features/RequestEntry/components/RequestStep1.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import RelationSelector from "../../../components/RelationSelector";
import TextField from "../../../components/TextField";

export default function RequestStep1({ onValidChange, value, onChange }) {
  const [relation, setRelation] = useState(value.relation || null);
  const [detail, setDetail] = useState(value.detail || "");

  const relationOptions = ["가족이에요", "친구예요", "연인이에요"];

  useEffect(() => {
    const isValid = !!relation;
    onValidChange?.(isValid);

    onChange({
      relation,
      detail,
    });
  }, [relation, detail]);

  return (
    <>
      <StepTitle>고인과의 관계를 알려주세요.</StepTitle>

      <RelationSelector
        options={relationOptions}
        value={relation}
        onChange={setRelation}
        gap="0.65rem"
      />

      <TextField
        placeholder="고인과의 관계를 조금 더 자세히 설명해주세요"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
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
