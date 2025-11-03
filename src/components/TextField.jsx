import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import IconEssential from "../assets/icon-essential-eclipse.svg";
import { Column, Row } from "../styles/flex";

export default function TextField({ title, essential, placeholder }) {
  return (
    <Column>
      <Row style={{ marginBottom: "1.75rem" }}>
        <Label>{title}</Label>
        {essential ? <img src={IconEssential} alt="필수" /> : null}
      </Row>
      <Input placeholder={placeholder} />
    </Column>
  );
}

const Label = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Input = styled.textarea`
  display: flex;

  width: 45rem;
  min-height: 9.5rem;
  padding: 2rem;
  align-items: flex-start;
  gap: 0.625rem;

  border-radius: 0.625rem;
  border: 2px solid ${color("black.5")};
  background: ${color("lightgrey")};

  ${typo("h4")};
  color: ${color("black.70")};

  &::placeholder {
    ${typo("h4")};
    color: ${color("black.10")}; /* 연한 회색 */
  }

  box-sizing: border-box;
  outline: none;
  resize: none;
`;
