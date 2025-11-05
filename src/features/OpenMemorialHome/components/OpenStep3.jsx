// src/features/OpenMemorialHome/components/OpenStep3.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import { InputField } from "../../../components/InputField";
import Button from "../../../components/Button";

export default function OpenStep3({ onValidChange }) {
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [deathFile, setDeathFile] = useState(null);

  useEffect(() => {
    const isValid = !!deathFile; // ✅ 파일만 필수
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

        <input
          id="deathCertInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

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
