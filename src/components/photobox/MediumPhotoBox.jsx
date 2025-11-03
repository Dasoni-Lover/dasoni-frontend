import React from 'react';
import styled from 'styled-components';

export const MediumPhotoBox = ({ src }) => {
  return <Img src={src} alt="사진" />;
};

const Img = styled.img`
  width: 22.25rem;
  height: 22.25rem;
  border-radius: 5px;
  border: 2px solid #E9E9E9;
  box-sizing: border-box;
`;
