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
    gap: 2rem;

`
const Wrapper1=styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    border-bottom: 1.079px solid #E9E9E9;
`
const Wrapper2=styled.div`
    display: flex;
    height: 12.125rem;
    padding: 0 0.27rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    flex-shrink: 0;
    align-self: stretch;
`
const Text = styled.div`
  display: flex;
  padding: 0.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
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