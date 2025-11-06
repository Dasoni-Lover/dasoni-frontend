import React, { useState } from 'react';
import styled from 'styled-components';
import HallTabButton from './HallTabButton';

const HallTab = ({ role = 'visitor' }) => { //기본값 visitor
  const [activeIndex, setActiveIndex] = useState(0);

  // 역할에 따른 탭 구성
  const tabConfig = {
    visitor: ['공유앨범', '나와의 앨범'],
    owner: ['나의 기록', '추모객 관리', '녹음 파일 관리'],
    manager: ['공유앨범', '나와의 앨범', '추모객 관리'],
    home: ['내가 입장한 추모관', '내가 관리하는 추모관'],
  };

  const tabs = tabConfig[role] || tabConfig.visitor; // 안전하게 visitor fallback

  return (
    <Wrapper>
      {tabs.map((text, index) => (
        <HallTabButton
          key={index}
          text={text}
          isActive={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </Wrapper>
  );
};

export default HallTab;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 2px solid var(--70, #313131);
`;

// <HallTab role="visitor" />
