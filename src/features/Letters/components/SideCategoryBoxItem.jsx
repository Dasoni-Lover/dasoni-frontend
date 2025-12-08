import React from "react";
import styled from "styled-components";
import { typo, color } from "../../../styles/tokens";

export default function SideCategoryBoxItem({ text, bgcolor, border, onClick }) {
  return (
    <Container bgcolor={bgcolor} border={border} onClick={onClick}>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 3.25rem;
  padding: 0.9375rem 1rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  background: ${({ bgcolor }) => bgcolor || ""};
  border-top: ${({ border }) => border || "1px solid #ddd"};
  border-bottom: ${({ border }) => border || "1px solid #ddd"};
  border-radius: 0.25rem;

  cursor: pointer;
  box-sizing: border-box;

`;

const Text = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

