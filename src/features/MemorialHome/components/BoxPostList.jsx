import React from "react";
import styled from "styled-components";
import { NoPost } from "../components/NoPost";

const BoxPostList = ({ photos = [], onPostClick }) => {
  const hasPhotos = photos.length > 0;

  return (
    <Wrapper $hasPhotos={hasPhotos}>
      {hasPhotos ? (
        photos.map((photo) => (
          <Img
            key={photo.id}
            src={photo.url}
            alt={`photo-${photo.id}`}
            onClick={() => onPostClick && onPostClick(photo)}
          />
        ))
      ) : (
        <NoPost text="아직 작성된 게시글이 없습니다." />
      )}
    </Wrapper>
  );
};

export default BoxPostList;

const Wrapper = styled.div`
  ${({ $hasPhotos }) =>
    $hasPhotos
      ? `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 18.3125rem;
  `
      : `
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:1.25rem;
  `}
`;

const Img = styled.img`
  width: 22.25rem;
  height: 22.25rem;
  border-radius: 5px;
  border: 2px solid #e9e9e9;
  object-fit: cover;
  box-sizing: border-box;
  cursor: pointer;
`;
