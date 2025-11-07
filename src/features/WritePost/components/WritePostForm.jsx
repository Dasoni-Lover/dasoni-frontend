// src/features/WritePost/components/WritePostForm.jsx
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import TextField from "../../../components/TextField";
import InputImgCard from "../../../components/InputImgCard";
import PostOptionForm from "../../../components/PostOptionForm";
import { Column, Row } from "../../../styles/flex";

export default function WritePostForm({
  hallId, // ✅ WritePostPage 에서 전달
  isEdit, // ✅ 수정 여부
  photoId, // ✅ 수정 대상 사진 ID
  initialData, // ✅ { content, occurredAt, isPrivate } 등
  initialImageUrl, // ✨ 여기로 들어옴
}) {
  const location = useLocation();
  const generatedImage = location.state?.generatedImage || null;

  // ✨ 글 내용은 initialData 기준으로 초기화
  const [content, setContent] = useState(initialData?.content || "");

  // "YYYY.MM.DD" → Date 객체
  const parseDateDot = (str) => {
    if (!str) return null;
    const parts = str.split(".");
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map((v) => Number(v));
    return new Date(y, m - 1, d);
  };

  // ✨ 사진 속 날짜 초기값
  const initialDate = useMemo(
    () =>
      initialData?.occurredAt ? parseDateDot(initialData.occurredAt) : null,
    [initialData]
  );

  // ✨ 공유 범위 초기값
  const initialScope = initialData
    ? initialData.isPrivate
      ? "private"
      : "public"
    : "public";

  return (
    <Row $gap={"5.5rem"}>
      <Column style={{ height: "33rem" }} $justify={"space-between"}>
        <InputImgCard
          label="사진"
          essential={true}
          previewUrl={
            initialImageUrl
              ? initialImageUrl // ✨ 수정 모드: 기존 사진
              : generatedImage
              ? `data:image/jpeg;base64,${generatedImage}` // AI 생성 이미지
              : ""
          }
        />
        <TextField
          title={"글의 내용을 작성해 주세요"}
          placeholder={"사진에 대한 추억을 기록해 보세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Column>

      {/* ✨ 수정/작성 모드 구분 정보 + 초기값 전달 */}
      <PostOptionForm
        content={content}
        hallId={hallId}
        isEdit={!!isEdit}
        photoId={photoId}
        initialDate={initialDate}
        initialScope={initialScope}
      />
    </Row>
  );
}
