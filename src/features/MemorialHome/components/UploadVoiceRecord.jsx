// src/features/MemorialMyHome/components/UploadVoiceRecord.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import {
  uploadVoiceFile,
  getVoiceFile,
  updateVoiceFile,
} from "../../../api/voice";
import VoiceRecord from "./VoiceRecord";

export default function UploadVoiceRecord() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasRemoteVoice, setHasRemoteVoice] = useState(false); // 서버에 이미 음성 있는지 여부
  const fileInputRef = useRef(null);

  // ✅ 녹음파일관리 탭이 렌더될 때 서버에 저장된 음성 파일 조회
  useEffect(() => {
    const loadExistingVoice = async () => {
      try {
        const hallId = localStorage.getItem("myHallId");
        if (!hallId) return;

        const data = await getVoiceFile(hallId); // { url: "..." }
        if (!data || !data.url) return;

        // 서버에 음성 파일이 존재함
        setHasRemoteVoice(true);

        // url로부터 Blob → File 변환해서 기존 UI 그대로 사용
        const response = await fetch(data.url);
        if (!response.ok) {
          console.warn("기존 음성 파일 다운로드 실패:", response.status);
          return;
        }

        const blob = await response.blob();
        const file = new File([blob], "voice.mp3", {
          type: blob.type || "audio/mpeg",
        });

        setSelectedFile(file);
      } catch (err) {
        console.warn("기존 음성 파일 조회/로딩 실패:", err);
      }
    };

    loadExistingVoice();
  }, []);

  // ✅ 공통: 숨겨진 input 클릭해서 파일 선택창 열기
  const openFilePicker = () => {
    if (isUploading) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 같은 파일 다시 선택 가능하게 초기화
      fileInputRef.current.click();
    }
  };

  // "파일 업로드" 버튼 클릭 → 파일 선택창
  const handleUploadClick = () => {
    openFilePicker();
  };

  // input[type=file] 변경 시 (최초 업로드 & 재업로드 공통)
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
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

      if (hasRemoteVoice) {
        // ✅ 이미 서버에 파일이 있다 → PATCH /voice/update
        const updatedUrl = await updateVoiceFile(hallId, file);
        console.log("재업로드(갱신) 성공:", updatedUrl);
      } else {
        // ✅ 최초 업로드 → POST /voice/upload
        const uploadedUrl = await uploadVoiceFile(hallId, file);
        console.log("업로드 성공:", uploadedUrl);
        setHasRemoteVoice(true); // 이제부터는 재업로드 모드
      }
    } catch (err) {
      console.error("업로드/재업로드 실패:", err);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ 재업로드 버튼 클릭 시: 그냥 파일 선택창만 띄우기
  // (새 파일 선택하면 handleFileChange에서 selectedFile & API 처리)
  const handleReupload = () => {
    openFilePicker();
  };

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
        </Wrapper>
      ) : (
        <VoiceRecord file={selectedFile} onReupload={handleReupload} />
      )}

      {/* 🔹 실제 파일 input (UI에 안 보이고, 업로드/재업로드 공용으로 사용) */}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="audio/mpeg"
        onChange={handleFileChange}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2.75rem;
  width: 100%;
`;

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
  border: 1px solid var(--5, #e9e9e9);
  background: var(--Lightgrey, #f8f8f8);
`;

const Text = styled.div`
  color: var(--80, #0e0e0e);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;

const Highlight = styled.span`
  color: var(--80, #0e0e0e);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

const HiddenInput = styled.input`
  display: none;
`;
