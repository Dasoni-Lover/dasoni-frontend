import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import editbutton from '../../assets/edit-btn.svg';

export const EditSmallPhotoBox = ({ src: initialSrc }) => {
  const [src, setSrc] = useState(initialSrc || '');
  const fileInputRef = useRef(null);

  // 아이콘 클릭 시 파일 선택창 열기
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 후 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSrc(event.target.result); // 선택한 이미지 미리보기
    };
    reader.readAsDataURL(file);
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
