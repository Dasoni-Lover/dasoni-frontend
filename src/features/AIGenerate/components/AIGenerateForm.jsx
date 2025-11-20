// src/features/AIGenerate/components/AIGenerateForm.jsx
import React, { useState } from "react";
import { color, typo } from "../../../styles/tokens";
import styled from "styled-components";
import InputImgCard from "../../../components/InputImgCard";
import { Row } from "../../../styles/flex";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CancelProcessButton from "../../../components/CancelProcessButton";
import ConfirmModal from "../../../components/ConfirmModal";

export default function AIGenerateForm({ onGenerate }) {
  const nav = useNavigate();
  const goBack = () => nav(-1);

  // ✅ 이미지 파일 상태
  const [deceasedFile, setDeceasedFile] = useState(null); // 1: 고인 사진 (필수)
  const [myFile, setMyFile] = useState(null); // 2: 본인 사진
  const [bgFile, setBgFile] = useState(null); // 3: 배경 사진

  // ✅ 프롬프트 상태
  const [prompt, setPrompt] = useState("");

  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancelProcess = () => {
    setIsCanceled(true);
  };

  const goHome = () => {
    nav("/home");
  };
  // File → base64 문자열로 변환 (dataURL에서 "base64," 뒤만 사용)
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64 = result.split(",")[1]; // ⚠️ "data:image/png;base64," 제거
        resolve(base64);
      } else {
        reject(new Error("파일을 base64로 변환할 수 없습니다."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const handleClickGenerate = async () => {
  if (!deceasedFile) {
    alert("고인 사진은 필수입니다.");
    return;
  }

  try {
    const images = [];

    // 1️⃣ 고인 사진
    images.push({ order: 1, base64Data: await fileToBase64(deceasedFile) });

    // 2️⃣ 본인 사진 (선택)
    if (myFile) images.push({ order: 2, base64Data: await fileToBase64(myFile) });

    // 3️⃣ 배경 사진 (선택)
    if (bgFile) images.push({ order: 3, base64Data: await fileToBase64(bgFile) });

    onGenerate({ images, prompt });
  } catch (e) {
    console.error("이미지 변환 중 오류:", e);
    alert("이미지 변환 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
};


  return (
    <div>
      <Row $justify={"end"}>
        <CancelProcessButton
          title={"작성 그만두기"}
          onClick={handleCancelProcess}
        />
      </Row>
      <Subtitle>이미지 생성에 참고할 사진을 올려주세요</Subtitle>

      <Row $gap={"1.5rem"} style={{ marginBottom: "4.5rem" }}>
        <InputImgCard
          label={"고인사진"}
          labeltypo={"bodym2"}
          essential
          onFileChange={setDeceasedFile} // ✅ 파일 상태 전달
        />
        <InputImgCard
          label={"본인사진"}
          labeltypo={"bodym2"}
          onFileChange={setMyFile}
        />
        <InputImgCard
          label={"배경사진"}
          labeltypo={"bodym2"}
          onFileChange={setBgFile}
        />
      </Row>

      <TextField
        title={"생성하고 싶은 이미지를 설명해주세요"}
        placeholder={`아빠 손 잡고 결혼식 입장하는 모습 그려줘.\n엄마랑 집에서 밥 먹는 모습 그려줘.`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // ✅ 프롬프트 상태 반영
      />

      <Row style={{ margin: "4rem 0" }} $justify={"center"} $gap={"1.25rem"}>
        <Button
          size="M"
          text="취소"
          color="white"
          width="13.75rem"
          onClick={goBack}
        />
        <Button
          size="M"
          text="생성하기"
          color="main"
          width="13.75rem"
          onClick={handleClickGenerate} // ✅ 이벤트 객체 대신 우리가 만든 데이터 전달
        />
      </Row>
      {/*  그만두기 클릭 시 */}
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 개설을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm={goHome}
        onCancel={() => {
          setIsCanceled(false);
        }}
      />
    </div>
  );
}

const Subtitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 3rem;
`;
