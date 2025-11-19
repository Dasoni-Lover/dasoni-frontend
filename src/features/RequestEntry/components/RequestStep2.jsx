// src/features/RequestEntry/components/RequestStep2.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import TagSelector from "../../../components/TagSelector";

export default function RequestStep2({ onValidChange, value, onChange }) {
  const [selectedTags, setSelectedTags] = useState(value.natures || []);

  useEffect(() => {
    const isValid = selectedTags.length === 3;
    onValidChange?.(isValid);

    onChange({
      natures: selectedTags,
    });
  }, [selectedTags]);

  const tagRows = [
    {
      color: "#FEB9BC",
      words: ["다정한", "너그러운", "따뜻한", "밝은", "유쾌한", "센스 있는"],
    },
    {
      color: "#FFD299",
      words: ["긍정적인", "지혜로운", "낙천적인", "부지런한", "열정적인", "웃음이 많은"],
    },
    {
      color: "#FFAA76",
      words: ["믿음직한", "생각이 깊은", "의리 있는", "용감한", "든든한", "재밌는"],
    },
  ];

  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>

      <Label>
        고인을 표현하는 단어 3개를 선택해 주세요
        <RequiredDot src={IconEssentialEclipse} />
      </Label>

      <TagSelector
        tagRows={tagRows}
        value={selectedTags}
        onChange={setSelectedTags}
        max={3}
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

const Label = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  margin-bottom: 1.5rem;
`;

const RequiredDot = styled.img``;
