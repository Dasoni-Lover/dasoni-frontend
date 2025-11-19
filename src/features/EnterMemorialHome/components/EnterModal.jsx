import React from 'react';
import styled from 'styled-components';
import { color, typo } from "../../../styles/tokens";
import { CardListItemEnter } from './CardListItemEnter';
import Button from '../../../components/Button';

export const EnterModal = ({ hall, onClose }) => {
  const handleRequest = () => {
    // 요청 로직 추가 가능
    onClose();
  };

  const handleCancel = () => onClose();

  return (
    <Wrapper onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Text>해당 추모관에 입장 요청을 보낼까요?</Text>
        <CardListItemEnter hall={hall} type="none" />
        <ButtonWrapper>
          <Button text="요청하기" onClick={handleRequest} />
          <Button text="취소" color="white" onClick={handleCancel} />
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(5.4px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Box = styled.div`
  display: flex;
  width: 43.9375rem;
  height: 42.1875rem;
  padding: 5.25rem 4.75rem 2.75rem 4.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: var(--0, #FFF);
  box-sizing: border-box;
`;

const Text = styled.div`
  ${typo("h2")};
  color: ${color("black.80")};
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  width: 24.5rem;
`;
