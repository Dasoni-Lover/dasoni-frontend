// src/features/WritePost/components/WritePostForm.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "../../../components/TextField";
import InputImgCard from "../../../components/InputImgCard";
import PostOptionForm from "../../../components/PostOptionForm";
import { Column, Row } from "../../../styles/flex";

export default function WritePostForm() {
  const location = useLocation();
  const generatedImage = location.state?.generatedImage || null;

  // ✨ 글 내용 상태 추가
  const [content, setContent] = useState("");

  return (
    <Row $gap={"5.5rem"}>
      <Column style={{ height: "33rem" }} $justify={"space-between"}>
        <InputImgCard
          label="사진"
          essential={true}
          previewUrl={
            generatedImage ? `data:image/jpeg;base64,${generatedImage}` : ""
          }
        />
        <TextField
          title={"글의 내용을 작성해 주세요"}
          placeholder={"사진에 대한 추억을 기록해 보세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Column>
      {/* ✨ 작성한 내용을 옵션폼으로 내려줌 */}
      <PostOptionForm content={content} />
    </Row>
  );
}
