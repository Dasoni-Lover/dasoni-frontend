import React from 'react'
import styled from 'styled-components'
import MiniAlarm from './MiniAlarm'
import MiniProflie from './MiniProflie'
import { color,typo } from '../../styles/tokens'

const SideBarList = () => {
  return (
    <Container>
        <Wrapper1>
          <MiniProflie/>
          <MiniAlarm/>
        </Wrapper1>
        <Wrapper2>
          <Text>홈</Text>
          <Text>입장/개설</Text>
          <Text>박영진의 추모관</Text>
          <Text>로그아웃</Text>
        </Wrapper2>

    </Container>
  )
}

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;

`
const Wrapper1=styled.div`
    display: flex;
    width: 100%;
    padding: 8px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    border-bottom: 1.079px solid #E9E9E9;
`
const Wrapper2=styled.div`
    display: flex;
    height: 194px;
    padding: 0 4.317px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex-shrink: 0;
    align-self: stretch;
`
const Text = styled.div`
  display: flex;
  padding: 4px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  ${typo("h3")};
  color: ${color("black.50")};
  border-left: 3px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    border-left: 3px solid ${color("black.80")};
    color: ${color("black.80")};
  }
`;

export default SideBarList;