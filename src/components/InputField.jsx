import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export const InputField = ({
  placeholder,
  value,
  onChange,
  width = "50%",
  borderColor = "#e9e9e9", // ⭐ 디폴트 기존값
  bgColor = "#f8f8f8", // ⭐ 디폴트 기존값
}) => {
  return (
    <Wrapper $width={width} $borderColor={borderColor} $bgColor={bgColor}>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 3.25rem;
  width: ${({ $width }) => $width};
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: 0.375rem;

  /* ⭐ 프롭스로 받은 borderColor / bgColor 사용 */
  border: 2px solid ${({ $borderColor }) => $borderColor};
  background: ${({ $bgColor }) => $bgColor};

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
    ${typo("h4")};
    color: ${color("black.10")};
  }
`;

//<InputField placeholder="고인의 이름을 입력하세요" />
//<InputField placeholder="아이디를 입력하세요" width="100%" borderColor="#ddd" bgColor="#fff"/>
