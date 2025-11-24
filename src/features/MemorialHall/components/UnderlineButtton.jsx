import React from 'react';
import styled, { css } from 'styled-components';

export const UnderlineButton = ({ text = "입장 요청", count = 0, type = "click", onClick }) => {
  return (
    <Wrapper type={type} onClick={onClick}>
      <Text type={type}>{text}</Text>
      {count !== null && count !== undefined && <Count type={type}>{count}</Count>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;

  ${({ type }) =>
    type === "click"
      ? css`
          border-bottom: 3px solid var(--70, #4A4A4A);
        `
      : css`
          border-bottom: 3px solid var(--30, #ACACAC);
        `}
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 130%;
  ${({ type }) =>
    type === "click"
      ? css`
          color: var(--80, #0E0E0E);
        `
      : css`
          color: var(--50, #7A7A7A);
        `}
`;

const Count = styled.div`
  color: var(--red, #D74D4D);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 145%;
  display: flex;
  padding: 0.0625rem 0.5rem;
  justify-content: center;
  align-items: center;
`;
