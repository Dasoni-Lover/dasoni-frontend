// src/features/Letters/components/LetterListItem.jsx
import React from 'react';
import styled from 'styled-components';
import { color, typo } from '../../../styles/tokens';
import deleteicon from "../assets/delete-icon.svg";


export const LetterListItem = ({
  letter,
  onClick,
  onDelete,
  isNarrow,
  showDelete = false,
}) => {
  return (
    <Container onClick={onClick}>
      <Left $isNarrow={isNarrow}>
        <Wrapper>
          <To>TO. {letter.toName}</To>
          <Date>&nbsp;· {letter.completedAt}</Date>
        </Wrapper>
        <Content>{letter.excerpt}</Content>
      </Left>

      {/* ✅ 클릭 영역 확장 wrapper */}
      <DeleteButton
        $visible={showDelete}
        onClick={(e) => {
          if (!showDelete) return;
          e.stopPropagation();
          onDelete(letter.letterId);
        }}
      >
        <DeleteIcon src={deleteicon} />
      </DeleteButton>
    </Container>
  );
};


const Container = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 1.25rem 1.375rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.625rem;
  border: 1px solid #E9E9E9;
  background: #FFF;
  box-shadow: -4px -4px 10px rgba(0,0,0,0.03),
               4px 4px 10px rgba(0,0,0,0.03);
`;

const Left = styled.div`
  width: ${({ $isNarrow }) => ($isNarrow ? "17rem" : "56.375rem")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  transition: width 0.3s ease;
`;

const DeleteButton = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

const DeleteIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
