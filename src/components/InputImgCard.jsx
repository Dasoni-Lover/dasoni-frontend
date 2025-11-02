import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Row } from "../styles/flex";

import IconEssential from "../assets/icon-essential-eclipse.svg";
import IconBigPlus from "../features/WritePost/assets/icon-big-plus.svg";
import IconEdit from "../features/WritePost/assets/icon-edit.svg";

export default function InputImgCard({ label, essential }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    // 컴포넌트 언마운트 시 URL 정리
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // 기존 URL 정리
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const nextUrl = URL.createObjectURL(file);
    setPreviewUrl(nextUrl);
  };

  return (
    <div>
      <Row style={{ marginBottom: "1rem" }}>
        <Label>{label}</Label>
        {essential ? <img src={IconEssential} alt="필수" /> : null}
      </Row>

      {/* 숨겨진 파일 입력 */}
      <HiddenInput
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleChange}
      />

      {/* 클릭 시 파일 선택 */}
      <LabelBox htmlFor="fileInput">
        {previewUrl ? (
          <>
            <PreviewImg src={previewUrl} alt="업로드 이미지 미리보기" />
            <EditIcon src={IconEdit} alt="이미지 수정 아이콘" />
          </>
        ) : (
          <PlusIcon src={IconBigPlus} alt="이미지 추가" />
        )}
      </LabelBox>
    </div>
  );
}

const Label = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const HiddenInput = styled.input`
  display: none;
`;

const LabelBox = styled.label`
  position: relative;
  display: flex;
  width: 12.5rem;
  height: 12.5rem;
  padding: 0;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border: 2px solid #e9e9e9;
  background: #f8f8f8;
  cursor: pointer;
  overflow: hidden;
`;

const PlusIcon = styled.img`
  width: 3.25rem;
  height: 3.25rem;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  display: block;
`;

const EditIcon = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 2.25rem; /* 30px */
  padding: 0.3rem;
`;
