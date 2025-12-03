// src/features/RequestEntry/components/RequestStep1.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import RelationSelector from "../../../components/RelationSelector";
import TextField from "../../../components/TextField";
import { Column } from "../../../styles/flex";

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
      <Column $gap={"2rem"}>
        <RelationSelector
          options={relationOptions}
          value={relation}
          onChange={setRelation}
          gap="0.65rem"
        />

        <TextField
          placeholder={`고인과의 관계를 자세히 설명해주세요\n예) OOO의 대학 동기 OOO입니다. 함께 OOO 동아리 활동을 했습니다.\n예) OOOO 회사에서 함께 근무했던 OOO입니다.`}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          title={null}
        />
      </Column>
    </>
  );
}

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.38rem;
`;
