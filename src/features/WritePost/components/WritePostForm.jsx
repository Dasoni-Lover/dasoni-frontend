import React from "react";
import { useLocation } from "react-router-dom";
import TextField from "../../../components/TextField";
import InputImgCard from "../../../components/InputImgCard";
import PostOptionForm from "../../../components/PostOptionForm";
import { Column, Row } from "../../../styles/flex";

export default function WritePostForm() {
  const location = useLocation();
  const generatedImage = location.state?.generatedImage || null;

  return (
    <Row $gap={"5.5rem"}>
      <Column style={{ height: "33rem" }} $justify={"space-between"}>
        <InputImgCard
          label="사진"
          essential={true}
          previewUrl={
            generatedImage ? `data:image/jpeg;base64,${generatedImage}` : ""
          } // ✅ 전달받은 이미지 미리보기
        />
        <TextField
          title={"글의 내용을 작성해 주세요"}
          placeholder={"사진에 대한 추억을 기록해 보세요"}
        />
      </Column>
      <PostOptionForm />
    </Row>
  );
}
