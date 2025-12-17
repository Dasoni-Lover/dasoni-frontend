import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

export default function CalendarList({ letters, onSelect, onClose }) {
  return (
    <Wrapper>
      <Header>
        <Title>이 달에 쓴 편지</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>

      {letters.map((l) => (
        <Item key={l.letterId} onClick={() => onSelect(l.letterId)}>
          <Date>{l.completedAt}</Date>
          <ToName>To. {l.toName}</ToName>
          <Excerpt>{l.excerpt}</Excerpt>
        </Item>
      ))}
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  ${typo("h3")};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${color("black.50")};

  &:hover {
    color: ${color("black.70")};
  }
`;

const Item = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #fff4e6;
  }
`;

const Date = styled.div`
  ${typo("bodym")};
  color: ${color("black.40")};
`;

const ToName = styled.div`
  ${typo("bodyb")};
`;

const Excerpt = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;
