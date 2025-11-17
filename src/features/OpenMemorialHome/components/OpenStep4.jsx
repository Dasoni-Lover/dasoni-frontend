// src/features/OpenMemorialHome/components/OpenStep4.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import RelationSelector from "../../../components/RelationSelector";
import TagSelector from "../../../components/TagSelector";
import Toast from "../../../components/Toast";

export default function OpenStep4({ onValidChange, formData, setFormData }) {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const relation = formData.relation || null;
  const selectedTags = formData.natures || [];
  const intro = formData.review || "";

  const relationOptions = ["가족이에요", "친구예요", "연인이에요"];

  const tagRows = [
    {
      color: "#FEB9BC",
      words: ["다정한", "너그러운", "따뜻한", "밝은", "유쾌한", "센스 있는"],
    },
    {
      color: "#FFD299",
      words: [
        "긍정적인",
        "지혜로운",
        "낙천적인",
        "부지런한",
        "열정적인",
        "웃음이 많은",
      ],
    },
    {
      color: "#FFAA76",
      words: [
        "믿음직한",
        "생각이 깊은",
        "의리 있는",
        "용감한",
        "든든한",
        "재밌는",
      ],
    },
  ];

  // ✅ 유효성: 관계 1개 + 태그 3개 + 한 줄 소개
  useEffect(() => {
    const isValid =
      !!relation && selectedTags.length === 3 && intro.trim().length > 0;
    onValidChange?.(isValid);
  }, [relation, selectedTags, intro, onValidChange]);

  const handleRelationChange = (value) => {
    setFormData((prev) => ({ ...prev, relation: value }));
  };

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({ ...prev, natures: tags }));
  };

  const handleIntroChange = (e) => {
    setFormData((prev) => ({ ...prev, review: e.target.value }));
  };

  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>

      {/* 관계 */}
      <Label>
        고인과의 관계를 알려주세요
        <RequiredDot src={IconEssentialEclipse} />
      </Label>
      <RelationSelector
        options={relationOptions}
        value={relation}
        onChange={handleRelationChange}
        gap="0.65rem"
        style={{ marginBottom: "4rem" }}
      />

      {/* 성격/특징 태그 */}
      <Label>
        고인을 표현하는 단어 3개를 선택해 주세요
        <RequiredDot src={IconEssentialEclipse} />
      </Label>

      <TagSelector
        tagRows={tagRows}
        value={selectedTags}
        onChange={handleTagsChange}
        max={3}
        onMaxExceed={() => setIsToastOpen(true)}
      />

      {/* 한 줄 소개 */}
      <Label>
        고인을 한 줄로 소개해 주세요
        <RequiredDot src={IconEssentialEclipse} />
      </Label>

      <IntroTextArea
        placeholder="고인은 어떤 사람이었나요?"
        value={intro}
        onChange={handleIntroChange}
      />
      <Toast
        text="단어는 3개까지 선택할 수 있어요"
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
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

const Label = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  flex: 1;
  margin-bottom: 1.5rem;
`;

const RequiredDot = styled.img``;

const IntroTextArea = styled.textarea`
  display: flex;
  min-height: 9.5rem;
  padding: 2rem;
  gap: 0.625rem;
  width: 100%;
  box-sizing: border-box;
  ${typo("h4")};
  color: ${color("black.70")};

  resize: none;
  outline: none;
  border-radius: 0.625rem;
  border: 2px solid ${color("black.5")};
  background: ${color("lightgrey")};

  &::placeholder {
    color: ${color("black.10")};
  }
`;
