import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export const InputField = ({ placeholder }) => {
  return (
    <Wrapper>
      <StyledInput type="text" placeholder={placeholder} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 3.25rem;
  width: 50%;
  padding: 1rem 1rem;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.375rem;
  border: 2px solid var(--5, #e9e9e9);
  background: var(--Lightgrey, #f8f8f8);
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  ${typo("h4")};
  color: ${color("black.70")};
  outline: none;

  &::placeholder {
    color: ${color("black.10")};
  }
`;

//<InputField placeholder="고인의 이름을 입력하세요" />
