import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import { InputField } from "../../../components/InputField";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import DatePicker from "../../../components/DatePicker";
import InputImgCard from "../../../components/InputImgCard";
import Button from "../../../components/Button";
import RelationSelector from "../../../components/RelationSelector";
import TagSelector from "../../../components/TagSelector";

/**
 * step: 1~4
 * onStepValidChange: (boolean) => void
 */
export default function OpenMemorialHomeForm({ step = 1, onStepValidChange }) {
  return (
    <WhiteBox>
      {/* 상단 진행바 */}
      <Row $gap={"0.58rem"}>
        {[1, 2, 3, 4].map((i) => (
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

/* ───────────── 1단계: 성함 입력 ───────────── */

function Step1({ onValidChange }) {
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

/* ───────────── 2단계: 생일 / 기일 / 프로필 사진 ───────────── */

function Step2({ onValidChange }) {
  const [birthDate, setBirthDate] = useState(null); // 생일
  const [deathDate, setDeathDate] = useState(null); // 기일
  // 프로필 사진은 필수 X라고 보고 검증 조건에서는 제외

  useEffect(() => {
    const isValid = !!birthDate && !!deathDate;
    onValidChange?.(isValid);
  }, [birthDate, deathDate, onValidChange]);

  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>

      <FormRow>
        <Row>
          <Label>
            고인의 생일을 알려주세요
            <RequiredDot src={IconEssentialEclipse} />
          </Label>
        </Row>
        <FieldRight>
          <DatePicker
            selected={birthDate}
            onChange={setBirthDate}
            placeholder="YYYY/M/D"
          />
        </FieldRight>
      </FormRow>

      <FormRow>
        <Row>
          <Label>
            고인의 기일을 알려주세요
            <RequiredDot src={IconEssentialEclipse} />
          </Label>
        </Row>
        <FieldRight>
          <DatePicker
            selected={deathDate}
            onChange={setDeathDate}
            placeholder="YYYY/M/D"
          />
        </FieldRight>
      </FormRow>

      <FormRow style={{ marginBottom: 0 }}>
        <Label>고인의 프로필 사진을 업로드해 주세요</Label>
        <FieldRight>
          <InputImgCard />
        </FieldRight>
      </FormRow>
    </>
  );
}

/* ───────────── 3단계: 장소 / 연락처 / 사망확인서 ───────────── */

function Step3({ onValidChange }) {
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [deathFile, setDeathFile] = useState(null);

  useEffect(() => {
    const isValid = !!deathFile;
    onValidChange?.(isValid);
  }, [deathFile, onValidChange]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setDeathFile(file);
  };

  const triggerFileInput = () => {
    const el = document.getElementById("deathCertInput");
    if (el) el.click();
  };

  return (
    <>
      <StepTitle>기본 정보를 입력해 주세요.</StepTitle>

      <FormRow>
        <Label>고인을 모신 곳을 알려주세요</Label>
        <InputField
          placeholder="국립기억의 숲 A-261 구역 등 자세히면 좋아요"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </FormRow>

      <FormRow>
        <Label>개설자의 연락처를 알려주세요</Label>
        <InputField
          placeholder="010-1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormRow>

      <FormRow style={{ marginBottom: 0 }}>
        <Label>
          사망확인서를 업로드해 주세요
          <RequiredDot src={IconEssentialEclipse} />
        </Label>

        {/* 실제 파일 첨부 input */}
        <input
          id="deathCertInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* 버튼 + 파일명 표시 영역 */}
        <FileRow>
          <Button
            size="M"
            text={deathFile ? "파일 다시 선택" : "불러오기"}
            icon={true}
            color="white"
            width="10rem"
            onClick={triggerFileInput}
          />
          {deathFile && (
            <FileName title={deathFile.name}>{deathFile.name}</FileName>
          )}
        </FileRow>
      </FormRow>
    </>
  );
}

/* ───────────── 4단계: 관계 / 성격 태그 / 한 줄 소개 ───────────── */

function Step4({ onValidChange }) {
  const [relation, setRelation] = useState(null); // 관계 1개
  const [selectedTags, setSelectedTags] = useState([]); // 태그 최대 3개
  const [intro, setIntro] = useState("");

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

  // ✅ 유효성: 관계 1개 선택 + 태그 정확히 3개 + 한 줄 소개 필수
  useEffect(() => {
    const isValid =
      !!relation && selectedTags.length === 3 && intro.trim().length > 0;
    onValidChange?.(isValid);
  }, [relation, selectedTags, intro, onValidChange]);

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
        onChange={setRelation}
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
        onChange={setSelectedTags}
        max={3}
      />

      {/* 한 줄 소개 */}
      <Label>
        고인을 한 줄로 소개해 주세요
        <RequiredDot src={IconEssentialEclipse} />
      </Label>

      <IntroTextArea
        placeholder="고인은 어떤 사람이었나요?"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
    </>
  );
}

/* ───────────── styled-components ───────────── */

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
  margin-bottom: 2.75rem;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
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

const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-basis: 14rem;
  width: 100%;
`;

const FileName = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
