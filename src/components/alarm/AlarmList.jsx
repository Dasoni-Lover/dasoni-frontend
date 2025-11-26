import React from "react";
import styled from "styled-components";
import { AlarmListitem } from "./AlarmListitem";

export const AlarmList = () => {
  return (
    <Container>
      <AlarmListitem 
        tagText="입장승인" 
        content="입장이 승인 되었어요. 언제든 방문하여 소중한 추억을 함께 나눠주세요." 
        tagOn={true} 
      />
      <AlarmListitem 
        tagText="입장 요청" 
        content="새로운 입장 요청이 있어요." 
        tagOn={true} 
      />
      <AlarmListitem 
        tagText="편지 도착" 
        content="새로운 편지가 도착했어요. 편지함에서 확인해보세요" 
        tagOn={true} 
      />
      <AlarmListitem 
        tagText="기념일 알림" 
        content="내일은 기념일이에요! 오늘 편지를 작성하면 내일 답장을 받을 수 있어요" 
        tagOn={true} 
      />
      <AlarmListitem 
        tagText="기념일 알림" 
        content="내일은 기념일이에요! 오늘 편지를 작성하면 내일 답장을 받을 수 있어요" 
        tagOn={true} 
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;  /* Wrapper의 남은 높이를 그대로 사용 */
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-sizing: border-box;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;
