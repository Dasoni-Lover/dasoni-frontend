import React from "react";
import styled from "styled-components";

export const MediumPhotoBox = ({ src, ...rest }) => {
  return <Img src={src} alt="사진" {...rest} />;
};

const Img = styled.img`
  width: 22.25rem;
  height: 22.25rem;
  border-radius: 5px;
  border: 2px solid #e9e9e9;
  box-sizing: border-box;
`;
