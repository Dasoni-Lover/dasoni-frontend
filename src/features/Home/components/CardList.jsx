import React from "react";
import styled from "styled-components";
import { CardListItem } from "./CardListItem";

export const CardList = ({ halls = [], type }) => {
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
  grid-template-columns: repeat(3, 25.625rem);
  gap: 1.9375rem 2.25rem;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom:5rem;
`;
