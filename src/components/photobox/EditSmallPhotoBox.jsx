import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import editbutton from '../../assets/edit-btn.svg';

export const EditSmallPhotoBox = ({ src: initialSrc, onFileSelect }) => {
  const [src, setSrc] = useState(initialSrc || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSrc(initialSrc || '');
  }, [initialSrc]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기
    const previewUrl = URL.createObjectURL(file);
    setSrc(previewUrl);

    // File 객체 그대로 전달 (Base64 변환 X)
    if (onFileSelect) onFileSelect(file);
  };

  return (
    <Wrapper>
      <Img src={src} alt="사진" />
      <EditIcon src={editbutton} alt="수정 버튼" onClick={handleEditClick} />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 12.5rem;
  height: 12.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: solid 2px #E9E9E9;
  box-sizing: border-box;
`;

const EditIcon = styled.img`
  position: absolute;
  width: 36px;
  height: 36px;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`;
