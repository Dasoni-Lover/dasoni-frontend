import React from 'react';
import styled from 'styled-components';
import { color, typo } from '../../../styles/tokens';
import deleteicon from "../assets/delete-icon.svg";

export const LetterListItem = ({ letter, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <To>TO. {letter.toName}</To>
        <Date>&nbsp;· {letter.completedAt}</Date>
      </Wrapper>
      <Content>{letter.excerpt}</Content>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 1.25rem 1.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  border: 1px solid var(--5, #E9E9E9);
  background: var(--0, #FFF);
  box-shadow: -4px -4px 10px 0 rgba(0, 0, 0, 0.03), 4px 4px 10px 0 rgba(0, 0, 0, 0.03);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const To = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
`;

const Date = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
