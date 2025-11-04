import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export const InputFieldWhite = ({ placeholder, width = "50%" }) => {
  return (
    <Wrapper $width={width}>
      <StyledInput type="text" placeholder={placeholder} />
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
  border: 1px solid #A8A8A8;
  background: #FFF;
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
    color: #7C7C7C;
  }
`;


//<InputField placeholder="고인의 이름을 입력하세요" />
//<InputField placeholder="아이디를 입력하세요" width="100%" />