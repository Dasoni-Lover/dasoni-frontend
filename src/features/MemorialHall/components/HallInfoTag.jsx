import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

export default function HallInfoTag({ title, content }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 0.375rem 1.125rem 0.375rem 1.125rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--Lightgrey, #f8f8f8);
  background: #fff;
`;

const Title = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;
