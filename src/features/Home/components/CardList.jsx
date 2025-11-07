import React from 'react'
import styled from 'styled-components'
import { CardListItem } from './CardListItem'

export const CardList = ({ onOpenModal }) => {
  // 카드 상태 
  const cardData = [
    { status: "요청중" },
    { status: "입장완료" },
    { status: "거절" },
    { status: "요청안함" },
    { status: "요청중" },
  ];

  // 요청중인 카드가 항상 위로 오도록 정렬
  const sortedData = [...cardData].sort((a, b) => {
    if (a.status === "요청중" && b.status !== "요청중") return -1;
    if (a.status !== "요청중" && b.status === "요청중") return 1;
    return 0;
  });

  return (
    <Wrapper>
      {sortedData.map((card, index) => (
        <CardListItem
          key={index}
          status={card.status || "입장완료"}
          onOpenModal={onOpenModal}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 32.5rem);
  gap: 1.94rem 1.25rem;
  justify-content: center; 
  align-items: start;
  width: 100%;
  margin-bottom: 18.3125rem;
`;
