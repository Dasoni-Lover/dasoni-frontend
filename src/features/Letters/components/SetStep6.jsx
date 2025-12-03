// src/features/Letters/components/SetStep6.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import IconAdd from "../../../assets/icon-add-yellow.svg";
import VoiceRecord from "../../MemorialHall/components/VoiceRecord";

export default function SetStep6({ onValidChange, formData, setFormData }) {
  const file = formData.voiceFile || null;
  const fileInputRef = useRef(null);

  // 현재 단계 유효성
  useEffect(() => {
    onValidChange && onValidChange(!!file);
  }, [file, onValidChange]);

  // 파일 선택(최초 & 재업로드 공통)
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFormData((prev) => ({ ...prev, voiceFile: selected }));
  };

  // 업로드 박스 / 재업로드 버튼 클릭 시
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 삭제 버튼 클릭 시
  const handleDelete = () => {
    setFormData((prev) => ({ ...prev, voiceFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Wrapper>
      <Title>
        고인의 목소리만 담긴 30초 이상의 음성 파일(.mp3)을 업로드 해주세요
      </Title>
      <Description>
        음성 파일은 ‘AI 음성 편지’ 생성에 사용되며, <br />
        음성편지는 생전 고인의 목소리를 바탕으로 만든 가상의 AI 창작물이에요.
      </Description>

      {/* 숨겨진 input (최초 업로드 & 재업로드 공통으로 사용) */}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="audio/mpeg,audio/mp3"
        onChange={handleFileChange}
      />

      {/* 파일 없을 때: 업로드 박스 */}
      {!file && (
        <UploadBox onClick={openFileDialog}>
          <PlusIcon src={IconAdd} alt="파일 추가" />
        </UploadBox>
      )}

      {/* 파일 있을 때: 커스텀 플레이어 + 버튼 */}
      {file && (
        <VoiceRecord
          file={file}
          onReupload={openFileDialog}
          onDelete={handleDelete}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 0.75rem;
`;

const Description = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  margin-bottom: 2.75rem;
  line-height: 1.5;
`;

const UploadBox = styled.div`
  width: 100%;
  height: 6.5rem;
  border-radius: 0.625rem;
  border: 2px solid var(--5, #e9e9e9);
  background: var(--Lightgrey, #f8f8f8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PlusIcon = styled.img``;

const HiddenInput = styled.input`
  display: none;
`;
