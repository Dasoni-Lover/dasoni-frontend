// src/features/WritePost/components/WritePostForm.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextField from "../../../components/TextField";
import InputImgCard from "../../../components/InputImgCard";
import PostOptionForm from "../../../components/PostOptionForm";
import { Column, Row } from "../../../styles/flex";

export default function WritePostForm({
  hallId,
  isEdit,
  photoId,
  initialData,
  initialImageUrl,
  isAI = false,
}) {
  const location = useLocation();
  const generatedImage = location.state?.generatedImage || null; // ✅ data URL (prefix 포함)

  const [content, setContent] = useState(initialData?.content || "");
  const [photoFile, setPhotoFile] = useState(null); // ✅ 업로드에 쓸 실제 파일

  const parseDateDot = (str) => {
    if (!str) return null;
    const parts = str.split(".");
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map(Number);
    return new Date(y, m - 1, d);
  };

  const initialDate = useMemo(
    () =>
      initialData?.occurredAt ? parseDateDot(initialData.occurredAt) : null,
    [initialData]
  );

  const initialScope = initialData
    ? initialData.isPrivate
      ? "private"
      : "public"
    : "public";

  // ✅ data URL → File
  const dataURLtoFile = async (dataUrl, filename = "ai-generated.png") => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type || "image/png" });
  };

  // ✅ AI 생성 이미지가 있으면 최초 진입 시 File로 변환
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (generatedImage && generatedImage.startsWith("data:image/")) {
        const f = await dataURLtoFile(generatedImage);
        if (!cancelled) setPhotoFile(f);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [generatedImage]);

  const previewUrl = initialImageUrl
    ? initialImageUrl
    : generatedImage
    ? generatedImage // ✅ prefix 포함 data URL 그대로
    : "";

  return (
    <Row $gap={"5.5rem"}>
      <Column style={{ height: "33rem" }} $justify={"space-between"}>
        <InputImgCard
          label="사진"
          essential={true}
          previewUrl={previewUrl}
          onFileChange={setPhotoFile} // ✅ 사용자가 다시 선택하면 갱신
        />
        <TextField
          title={"글의 내용을 작성해 주세요"}
          placeholder={"사진에 대한 추억을 기록해 보세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Column>

      <PostOptionForm
        content={content}
        hallId={hallId}
        isEdit={!!isEdit}
        photoId={photoId}
        initialDate={initialDate}
        initialScope={initialScope}
        photoFile={photoFile} // ✅ 업로드용 파일 전달
        isAI={isAI}
      />
    </Row>
  );
}
