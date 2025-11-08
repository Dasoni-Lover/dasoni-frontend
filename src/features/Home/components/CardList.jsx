import React from "react";
import styled from "styled-components";
import { CardListItem } from "./CardListItem";

export const CardList = ({ halls = [], type = "my" }) => {
  return (
    <Wrapper>
      {halls.map((hall, index) => (
        <CardListItem key={index} hall={hall} type={type} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 32.5rem);
  gap: 1.94rem 1.25rem;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin-bottom: 18.3125rem;
`;
