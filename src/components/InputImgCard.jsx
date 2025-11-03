import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Row } from "../styles/flex";

import IconEssential from "../assets/icon-essential-eclipse.svg";
import IconBigPlus from "../features/WritePost/assets/icon-big-plus.svg";
import IconEdit from "../features/WritePost/assets/icon-edit.svg";

export default function InputImgCard({ label, essential, labeltypo }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const inputId = useId(); // ✅ 각 카드마다 고유 id 부여

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const nextUrl = URL.createObjectURL(file);
    setPreviewUrl(nextUrl);
  };

  return (
    <div>
      <Row style={{ marginBottom: "1rem" }}>
        <Label $labeltypo={labeltypo}>{label}</Label>
        {essential ? <img src={IconEssential} alt="필수" /> : null}
      </Row>

      <HiddenInput
        type="file"
        id={inputId} // ✅ 고유 id
        accept="image/*"
        onChange={handleChange}
      />

      <LabelBox htmlFor={inputId}>
        {/* ✅ 해당 input만 트리거 */}
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
  ${({ $labeltypo }) =>
    $labeltypo === "bodym2" ? typo("bodym2") : typo("h3")};
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
  width: 2.25rem;
  padding: 0.3rem;
`;
