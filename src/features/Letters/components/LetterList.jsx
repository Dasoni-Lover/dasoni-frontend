// src/features/Letters/components/LetterList.jsx
import React from 'react';
import styled from 'styled-components';
import { LetterListItem } from './LetterListItem';

export const LetterList = ({ letters, onItemClick, isNarrow }) => {
  return (
    <Wrapper>
      {letters.map(letter => (
        <LetterListItem
          key={letter.letterId}
          letter={letter}
          onClick={() => onItemClick(letter.letterId)}
          isNarrow={isNarrow}
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
