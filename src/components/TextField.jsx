// src/components/TextField.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import IconEssential from "../assets/icon-essential-eclipse.svg";
import { Column, Row } from "../styles/flex";

export default function TextField({
  title = "제목",
  essential = false,
  placeholder = "내용을 입력해주세요",
  value = "",
  onChange = () => {},
  titletypo = "h3",
  width = "45rem",
  height = "9.5rem",
  ...rest
}) {
  return (
    <Column>
      <Row style={{ marginBottom: "1.75rem" }}>
        <Label $titletypo={titletypo}>{title}</Label>
        {essential && <img src={IconEssential} alt="필수" />}
      </Row>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $width={width}
        $height={height}
        {...rest}
      />
    </Column>
  );
}

const Label = styled.div`
  ${({ $titletypo }) =>
    $titletypo === "bodym2" ? typo("bodym2") : typo("h3")};
  color: ${color("black.70")};
`;

const Input = styled.textarea`
  display: flex;
  width: ${({ $width }) => $width};
  min-height: ${({ $height }) => $height};
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
    color: ${color("black.10")};
  }

  box-sizing: border-box;
  outline: none;
  resize: none;
`;
