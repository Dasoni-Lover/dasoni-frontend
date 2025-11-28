// src/features/Letters/components/LetterList.jsx
import React from 'react';
import styled from 'styled-components';
import { LetterListItem } from './LetterListItem';

export const LetterList = ({ letters, onItemClick, onDelete, isNarrow, showDelete }) => {
  return (
    <Wrapper>
      {letters.map((letter) => (
        <LetterListItem
          key={letter.letterId}
          letter={letter}
          onClick={() => onItemClick(letter.letterId)}
          onDelete={onDelete}
          isNarrow={isNarrow}
          showDelete={showDelete}
        />
      ))}
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;
