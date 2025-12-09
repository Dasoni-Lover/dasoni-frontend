import React from "react";
import styled from "styled-components";

export const MediumPhotoBox = ({ src, ...rest }) => {
  return <Img src={src} alt="사진" {...rest} />;
};

const Img = styled.img`
  width: 22.25rem;
  height: 22.25rem;
  border-radius: 0.625rem;
  border: 2px solid var(--5, #E9E9E9);
  background: url(<path-to-image>) / cover no-repeat;
  box-sizing: border-box;
  object-fit: cover; /* 비율 유지하며 자르기 */
`;
