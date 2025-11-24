import React from "react";
import styled from "styled-components";

export default function FirstPage() {
  return (
    <div>
      <Container>
        <Content>기억이 머무는 다솜 마을에 오신걸 환영해요</Content>
        <Content>다소니는 AI와 함께 사랑하는 사람을 기억해요</Content>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 15.56rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;

const Content = styled.div`
  color: var(--70, #313131);
  text-align: right;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;
