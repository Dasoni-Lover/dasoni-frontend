import React from 'react';
import styled, { css } from 'styled-components';

export const RoundButton = ({ text = "입장 요청", count = 0, type = "yellow" }) => {
  return (
    <Wrapper type={type}>
      <Text type={type}>{text}</Text>
      {count !== null && count !== undefined && <Count type={type}>{count}</Count>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 16rem;
  height: 2.75rem;
  box-sizing: border-box;
  padding: 0.5rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 18.75rem;
  border: 1px solid var(--5, #E9E9E9);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.07);

  ${({ type }) =>
    type === "yellow"
      ? css`
          background: var(--main, #FFBC67);
        `
      : css`
          background: var(--0, #FFF);
        `}
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;

  ${({ type }) =>
    type === "yellow"
      ? css`
          color: var(--70, #313131);
        `
      : css`
          color: var(--30, #ACACAC);
        `}
`;

const Count = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  border-radius: 50%;

  ${({ type }) =>
    type === "yellow"
      ? css`
          color: var(--0, #FFF);
          background: #D74D4D;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          color: var(--30, #ACACAC);
          background: transparent;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
`;

//<RoundButton text="대기 중" count={3} type="white" />