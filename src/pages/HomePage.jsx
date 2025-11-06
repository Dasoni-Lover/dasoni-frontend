import React from 'react'
import styled from 'styled-components'
import HallTab from '../features/MemorialHome/components/HallTab'
import { CardList } from '../features/Home/components/CardList'
import { MemorialHallCount } from '../features/Home/components/MemorialHallCount'
import { color,typo } from '../styles/tokens'

export const HomePage = () => {
  return (
    <Wrapper>
      <Text>홈</Text>
      <HallTab role="home" />
      <Content>
        <MemorialHallCount/>
        <CardList/>
      </Content>
    </Wrapper>
  )
}


const Wrapper=styled.div`
  display: flex;
  width: 68.5rem;
  flex-direction: column;
  align-items: flex-start;
`
const Text=styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin-bottom: 6rem;
  margin-top: 4.37rem;
`
const Content=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  align-self: stretch;
  margin-top: 2.5rem;
`
