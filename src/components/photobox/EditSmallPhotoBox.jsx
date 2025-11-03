import React from 'react';
import styled from 'styled-components';
import editbutton from '../../assets/edit-btn.svg'; // 아이콘 경로에 맞게 수정하세요

export const EditSmallPhotoBox = ({ src }) => {
  return (
    <Wrapper>
      <Img src={src} alt="사진" />
      <EditIcon src={editbutton} alt="수정 버튼" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative; /* 내부 요소를 absolute로 배치하기 위해 필요 */
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
`;

const EditIcon = styled.img`
  position: absolute;
  width: 36px;
  height: 36px;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`;
