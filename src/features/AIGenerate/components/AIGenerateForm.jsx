import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import InputImgCard from "../../../components/InputImgCard";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import CancelProcessButton from "../../../components/CancelProcessButton";
import { useNavigate } from "react-router-dom";

export default function AIGenerateForm({ onGenerate }) {
  const nav = useNavigate();

  const [images, setImages] = useState([null, null, null]);
  const [prompt, setPrompt] = useState("");

  // 개별 이미지 변경 핸들러
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (!images[0]) {
      alert("고인 사진은 필수입니다.");
      return;
    }
    if (!prompt.trim()) {
      alert("이미지 생성 설명을 입력해주세요.");
      return;
    }
    onGenerate({ images, prompt });
  };

  return (
    <div>
      <Row $justify="end">
        <CancelProcessButton />
      </Row>

      <Subtitle>이미지 생성에 참고할 사진을 올려주세요</Subtitle>

      <Row $gap="1.5rem" style={{ marginBottom: "4.5rem" }}>
        <InputImgCard
          label="고인사진"
          labeltypo="bodym2"
          essential
          onFileSelect={(file) => handleImageChange(0, file)}
        />
        <InputImgCard
          label="본인사진"
          labeltypo="bodym2"
          onFileSelect={(file) => handleImageChange(1, file)}
        />
        <InputImgCard
          label="배경사진"
          labeltypo="bodym2"
          onFileSelect={(file) => handleImageChange(2, file)}
        />
      </Row>

      <TextField
        title="생성하고 싶은 이미지를 설명해주세요"
        placeholder={`아빠 손 잡고 결혼식 입장하는 모습 그려줘.\n엄마랑 집에서 밥 먹는 모습 그려줘.`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Row style={{ margin: "4rem 0" }} $justify="center" $gap="1.25rem">
        <Button size="M" text="취소" color="white" width="13.75rem" onClick={() => nav(-1)} />
        <Button size="M" text="생성하기" color="main" width="13.75rem" onClick={handleSubmit} />
      </Row>
    </div>
  );
}

const Subtitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 3rem;
`;
