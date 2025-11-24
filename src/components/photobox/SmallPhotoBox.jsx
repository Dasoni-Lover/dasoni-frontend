import React from "react";
import styled from "styled-components";
import { Tag } from "../Tag";

export const SmallPhotoBox = ({ src, tagText, showTag = false }) => {
  return (
    <Wrapper>
      <Img src={src} alt="photo" />
      {showTag && (
        <TagWrapper>
          <Tag text={tagText} />
        </TagWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Img = styled.img`
  display: flex;
  width: 22.25rem;
  height: 22.25rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  border: solid 2px #e9e9e9;
`;

const TagWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 0.94rem;
`;

//<SmallPhotoBoxWithTag src="/images/sample.jpg" tagText="대표" showTag />
