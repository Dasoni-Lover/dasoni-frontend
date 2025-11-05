import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Column, Row } from "../../../styles/flex";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import { InputField } from "../../../components/InputField";
import RelationSelector from "../../../components/RelationSelector";
import TextField from "../../../components/TextField";
import TagSelector from "../../../components/TagSelector";

export default function RequstEntryForm({ step = 1, onStepValidChange }) {
  return (
    <WhiteBox>
      {/* 상단 진행바 */}
      <Row $gap={"0.58rem"}>
        {[1, 2, 3].map((i) => (
          <ProgressBar key={i} $active={step >= i} />
        ))}
      </Row>

      {/* 단계별 내용 */}
      {step === 1 && <Step1 onValidChange={onStepValidChange} />}
      {step === 2 && <Step2 onValidChange={onStepValidChange} />}
      {step === 3 && <Step3 onValidChange={onStepValidChange} />}
      {step === 4 && <Step4 onValidChange={onStepValidChange} />}
    </WhiteBox>
  );
}

/* ───────────── 1단계: 고인과의 관계 입력 ───────────── */

function Step1({ onValidChange }) {
  const [relation, setRelation] = useState(null);
  const [detail, setDetail] = useState(null);

  const relationOptions = ["가족이에요", "친구예요", "연인이에요"];

  useEffect(() => {
    const isValid = !!relation;
    onValidChange?.(isValid);
  }, [relation, onValidChange]);

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

/* ───────────── 2단계: 태그 선택 ───────────── */

function Step2({ onValidChange }) {
  const [selectedTags, setSelectedTags] = useState([]); // 태그 최대 3개

  useEffect(() => {
    const isValid = selectedTags.length === 3;
    onValidChange?.(isValid);
  }, [selectedTags, onValidChange]);

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
  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>
      {/* 성격/특징 태그 */}
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

/* ───────────── 3단계: 고인 한 줄 소개 ───────────── */

function Step3({ onValidChange }) {
  const [intro, setIntro] = useState("");

  useEffect(() => {
    const isValid = !!intro;
    onValidChange?.(isValid);
  }, [intro, onValidChange]);

  return (
    <>
      <StepTitle>고인을 한줄로 소개해 주세요</StepTitle>

      <IntroTextArea
        placeholder="고인은 어떤 사람이었나요?"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
    </>
  );
}

const WhiteBox = styled.div`
  display: flex;
  width: 45rem;
  padding: 3.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;

  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
`;

const ProgressBar = styled.div`
  width: 2.125rem;
  height: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ $active }) => ($active ? color("main") : color("black.10"))};
`;

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.38rem;
`;

const Label = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  flex: 1;
  margin-bottom: 1.5rem;
`;

const RequiredDot = styled.img``;

const FieldRight = styled.div`
  flex-basis: 14rem;
  display: flex;
  justify-content: flex-end;

  > * {
    width: 14rem;
  }
`;

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
