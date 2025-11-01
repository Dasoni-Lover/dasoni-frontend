import React from 'react'
import styled from 'styled-components'
import InfoListItem from './InfoListItem'

const InfoList = () => {
  return (
    <Wrapper>
      <InfoListItem type="우리가 기억하는 당신은" content="믿음직한 · 용감한 · 친근한" />
      <InfoListItem type="모신 곳" content="국립기억의 숲 A-261 구역" />
      <InfoListItem type="관련 연락처" content="박영진 010-1234-5678" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 0.75rem 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

export default InfoList
