// src/features/MemorialHome/components/VisitorListItem.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { color, typo } from '../../../styles/tokens';
import Button from '../../../components/Button';
import ConfirmModal from '../../../components/ConfirmModal';
import VisitorListItemContent from './VisitorListItemContent';
import { respondRequest } from '../../../api/visitor';

import downicon from '../assets/dropdown-icon.png';
import righticon from '../assets/open-icon.svg';

export default function VisitorListItem({ openAll, type, item, index, hallId, onActionComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState('auto');
  const idWrapperRef = useRef(null);

  useEffect(() => {
    if (idWrapperRef.current) setContentWidth(`${idWrapperRef.current.offsetWidth}px`);
  }, []);

  useEffect(() => setIsOpen(openAll), [openAll]);

const handleRequest = async (isAccept) => {
  try {
    console.log('=== handleRequest 호출 ===');
    console.log('요청 대상 item:', item);
    console.log('수락 여부 isAccept:', isAccept); // 🔥 여기에 수락(true)/거절(false) 찍힘

    const res = await respondRequest(hallId, item.requestId, isAccept);
    console.log('응답 결과:', res);

    alert(isAccept ? '입장 요청이 수락되었습니다.' : '입장 요청이 거절되었습니다.');

    if (onActionComplete) onActionComplete(item, isAccept);
  } catch (err) {
    console.error('요청 처리 실패:', err);
    alert('요청 처리에 실패했습니다.');
  }
};


  return (
    <Container>
      <TopRow>
        <Wrapper>
          <Open src={isOpen ? downicon : righticon} onClick={() => setIsOpen(!isOpen)} />
          <IdWrapper ref={idWrapperRef}>
            <Id>{index}</Id>
            <Name>{item.name}</Name>
          </IdWrapper>
        </Wrapper>

        <ButtonWrapper>
          {type === 'request' ? (
            <>
              <Button text="수락" size="S" width="6.25rem" onClick={() => handleRequest(true)} />
              <Button text="거절" size="S" width="6.25rem" color="white" onClick={() => handleRequest(false)} />
            </>
          ) : (
            <Button
              text="내보내기"
              size="S"
              width="6.25rem"
              color="white"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </ButtonWrapper>
      </TopRow>

      {isOpen && (
        <ContentWrapper style={{ width: contentWidth }}>
          <VisitorListItemContent item={item} />
        </ContentWrapper>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="해당 추모객을 내보낼까요?"
        description="추모객은 다시 요청을 보낼 수 있어요"
        confirmText="내보내기"
        cancelText="취소"
        onConfirm={() => console.log("추모객 내보내기")}
        onCancel={() => setIsModalOpen(false)}
        subImage={downicon}
        subText={item.name}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 50.5rem;
  padding: 0.5rem 0.625rem;
  align-items: center;
  gap: 1.875rem;
`;

const Open = styled.img`
  cursor: pointer;
  padding: 0.375rem;
  height: 1.5rem;
`;

const IdWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1rem;
  gap: 1rem;
  flex: 1 0 0;
`;

const Id = styled.div`
  ${typo('bodyb')};
  color: ${color('black.70')};
`;

const Name = styled.div`
  color: var(--70, #313131);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 130%;
  flex: 1 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.25rem;
`;

const ContentWrapper = styled.div`
  margin-left: 4.76rem;
  margin-top: 1.88rem;
  transition: all 0.3s ease;
  overflow: hidden;
`;
