import React from "react";
import styled from "styled-components";
import { CardListItem } from "./CardListItem";

export const CardList = ({ halls = [], onOpenModal }) => {
  // 현재 API는 추모관 입장 목록이므로 모두 "입장완료" 상태라고 가정
  return (
    <Wrapper>
      {halls.map((hall, index) => (
        <CardListItem
          key={index}
          status="입장완료"
          hall={hall}
          onOpenModal={onOpenModal}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 32.5rem);
  gap: 1.94rem 1.25rem;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin-bottom: 18.3125rem;
`;
