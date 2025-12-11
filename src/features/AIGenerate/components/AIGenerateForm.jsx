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

  const [deceasedFile, setDeceasedFile] = useState(null);
  const [myFile, setMyFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);

  const [prompt, setPrompt] = useState("");
  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancelProcess = () => setIsCanceled(true);

  // 파일 → base64 변환
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result.split(",")[1]);
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

      images.push({
        order: 1,
        base64Data: await fileToBase64(deceasedFile),
      });

      if (myFile)
        images.push({
          order: 2,
          base64Data: await fileToBase64(myFile),
        });

      if (bgFile)
        images.push({
          order: 3,
          base64Data: await fileToBase64(bgFile),
        });

      onGenerate({ images, prompt });
    } catch (e) {
      console.error("이미지 변환 중 오류:", e);
      alert("이미지 변환 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div>
      <Row $justify={"end"} style={{ marginBottom: "3.25rem" }}>
        <CancelProcessButton
          title={"작성 그만두기"}
          onClick={handleCancelProcess}
        />
      </Row>

      <Subtitle>이미지 생성에 참고할 사진을 올려주세요</Subtitle>

      <Row $gap={"1.5rem"} style={{ marginBottom: "4.5rem" }}>
        <InputImgCard
          label={"고인사진"}
          essential
          onFileChange={setDeceasedFile}
        />
        <InputImgCard label={"본인사진"} onFileChange={setMyFile} />
        <InputImgCard label={"배경사진"} onFileChange={setBgFile} />
      </Row>

      <TextField
        title={"생성하고 싶은 이미지를 설명해주세요"}
        placeholder={`아빠 손 잡고 결혼식 입장하는 모습 그려줘.\n엄마랑 집에서 밥 먹는 모습 그려줘.`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
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
          onClick={handleClickGenerate}
        />
      </Row>

      <ConfirmModal
        isOpen={isCanceled}
        title="작성을 그만둘까요?"
        description="작성한 내용은 저장되지 않고 사라져요"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm={goBack}
        onCancel={() => setIsCanceled(false)}
      />
    </div>
  );
}

const Subtitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 3rem;
`;
