import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export const InputFieldWhite = ({
  placeholder,
  width = "50%",
  value,
  onChange,
  border, // ✅ border props 추가
  ...rest
}) => {
  return (
    <Wrapper $width={width} $border={border}>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 3.25rem;
  width: ${({ $width }) => $width};
  padding: 0.8125rem 0.9375rem;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.25rem;
  border: 2px solid
    ${({ $border }) => ($border === "red" ? color("red") : "#a8a8a8")}; /* ✅ 조건부 border color */
  background: #fff;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  ${typo("bodym")};
  color: ${color("black.80")};
  outline: none;

  &::placeholder {
    color: #7c7c7c;
  }
`;
