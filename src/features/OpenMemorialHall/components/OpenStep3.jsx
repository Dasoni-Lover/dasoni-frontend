// src/features/OpenMemorialHall/components/OpenStep3.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";
import IconEssentialEclipse from "../../../assets/icon-essential-eclipse.svg";
import { InputField } from "../../../components/InputField";
import Button from "../../../components/Button";

export default function OpenStep3({ onValidChange, formData, setFormData }) {
  const place = formData.place || "";
  const deathFile = formData.docsFile || null;

  // ✅ 로컬 표시용 전화번호 상태 (하이픈 포함)
  const [displayPhone, setDisplayPhone] = useState(
    formData.phone ? formatPhone(formData.phone) : ""
  );

  useEffect(() => {
    const isValid = !!deathFile; // ✅ 파일만 필수
    onValidChange?.(isValid);
  }, [deathFile, onValidChange]);

  const handlePlaceChange = (e) => {
    setFormData((prev) => ({ ...prev, place: e.target.value }));
  };

  // ✅ 전화번호 입력 핸들러 (11자리 제한 + 숫자만 저장)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    if (value.length > 11) value = value.slice(0, 11); // 11자리 제한

    // 화면에 표시용 포맷 (010-1234-5678)
    const formatted = formatPhone(value);
    setDisplayPhone(formatted);

    // 서버 전송용 (하이픈 제거)
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, docsFile: file }));
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
          onChange={handlePlaceChange}
        />
      </FormRow>

      <FormRow>
        <Label>개설자의 연락처를 알려주세요</Label>
        <InputField
          placeholder="010-1234-5678"
          value={displayPhone}
          onChange={handlePhoneChange}
          maxLength={13} // "010-1234-5678" 포함 시 13자
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

/* ✅ 전화번호 포맷 함수 */
function formatPhone(value) {
  if (!value) return "";
  if (value.length < 4) return value;
  if (value.length < 8) return value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  return value.replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
}

/* 🎨 스타일 */
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
