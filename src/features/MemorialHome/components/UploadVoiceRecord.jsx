import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { uploadVoiceFile } from "../../../api/voice";
import VoiceRecord from "./VoiceRecord";

export default function UploadVoiceRecord() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

// 기존 UploadVoiceRecord.jsx 파일
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "audio/mpeg") {
    alert("mp3 파일만 업로드 가능합니다.");
    return;
  }

  setSelectedFile(file);
  setIsUploading(true);

  try {
    const hallId = localStorage.getItem("myHallId");
    if (!hallId) throw new Error("추모관 ID가 없습니다.");

    // presigned URL + S3 업로드 + 백엔드 등록
    const uploadedUrl = await uploadVoiceFile(hallId, file);

    console.log("업로드 성공:", uploadedUrl);
    // 업로드 후 VoiceRecord로 바로 보여줌
  } catch (err) {
    console.error("업로드 실패:", err);
    alert("업로드에 실패했습니다. 다시 시도해주세요.");
    setSelectedFile(null);
  } finally {
    setIsUploading(false);
  }
};

  const handleReupload = () => setSelectedFile(null);

  return (
    <Container>
      {!selectedFile ? (
        <Wrapper>
          <Text>
            본인의 목소리만 담긴 <Highlight>30초 이상</Highlight> 분량의 mp3
            파일을 업로드 해주세요
          </Text>
          <Button
            text={isUploading ? "업로드 중..." : "파일 업로드"}
            width="24.5rem"
            icon={true}
            onClick={handleUploadClick}
            disabled={isUploading}
          />
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg"
            onChange={handleFileChange}
          />
        </Wrapper>
      ) : (
        <VoiceRecord file={selectedFile} onReupload={handleReupload} />
      )}
    </Container>
  );
}

const Container = styled.div`margin-top: 2.75rem; width: 100%;`;

const Wrapper = styled.div`
  display: flex;
  padding: 1.875rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  align-self: stretch;
  box-sizing: border-box;
  border-radius: 1.25rem;
  border: 1px solid var(--5, #E9E9E9);
  background: var(--Lightgrey, #F8F8F8);
`;

const Text = styled.div`
  color: var(--80, #0E0E0E);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const Highlight = styled.span`
  color: var(--80, #0E0E0E);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

const HiddenInput = styled.input`display: none;`;
