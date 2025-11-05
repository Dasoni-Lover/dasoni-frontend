import React from 'react'
import styled from 'styled-components'
import HallTab from '../features/MemorialHome/components/HallTab'
import { CardList } from '../features/Home/components/CardList'
import { MemorialHallCount } from '../features/Home/components/MemorialHallCount'
import { color,typo } from '../styles/tokens'
import { SearchTab } from '../features/EnterMemoralHome.jsx/components/SearchTab'
import { EnterModal } from '../features/EnterMemoralHome.jsx/components/EnterModal'

export const EnterMemorialHomePage = () => {
    
  return (
    <Wrapper>
      <Text>새 추모관 입장하기</Text>
      <SearchTab/>
      <Content>
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
  box-sizing: border-box;
`
const Text=styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin-bottom: 4rem;
  margin-top: 4.37rem;
`
const Content=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin-top: 2.5rem;
`
