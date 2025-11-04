import React from "react";
import { color, typo } from "../../../styles/tokens";
import styled from "styled-components";
import InputImgCard from "../../../components/InputImgCard";
import { Row } from "../../../styles/flex";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CancelProcessButton from "./CancelProcessButton";

export default function AIGenerateForm({ setIsGenerated }) {
  const nav = useNavigate();
  const goBack = () => nav(-1);

  const handleGenerate = () => {
    setIsGenerated(true);
  };
  return (
    <div>
      <CancelProcessButton />
      <Subtitle>이미지 생성에 참고할 사진을 올려주세요</Subtitle>

      <Row $gap={"1.5rem"} style={{ marginBottom: "4.5rem" }}>
        <InputImgCard label={"고인사진"} labeltypo={"bodym2"} essential />
        <InputImgCard label={"본인사진"} labeltypo={"bodym2"} />
        <InputImgCard label={"배경사진"} labeltypo={"bodym2"} />
      </Row>

      <TextField
        title={"생성하고 싶은 이미지를 설명해주세요"}
        placeholder={`아빠 손 잡고 결혼식 입장하는 모습 그려줘.\n엄마랑 집에서 밥 먹는 모습 그려줘.`}
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
          onClick={handleGenerate}
        />
      </Row>
    </div>
  );
}

const Subtitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 3rem;
`;
