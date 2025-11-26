// src/components/photobox/EditSmallPhotoBox.jsx
import React, { useRef } from "react";
import styled from "styled-components";
import editbutton from "../../assets/edit-btn.svg";

export const EditSmallPhotoBox = ({ src, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ File 객체를 그대로 부모에게 전달
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Wrapper>
      <Img src={src} alt="사진" />
      <EditIcon src={editbutton} alt="수정 버튼" onClick={handleEditClick} />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 22.5rem;
  height: 22.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: solid 2px #e9e9e9;
  box-sizing: border-box;
`;

const EditIcon = styled.img`
  position: absolute;
  width: 56px;
  height: 56px;
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
`;
