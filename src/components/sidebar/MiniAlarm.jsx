import React from 'react'
import alarmicon from "../../assets/alarm-icon.png"
import styled from 'styled-components'
import { color,typo } from '../../styles/tokens'

const MiniAlarm = () => {
  return (
    <Container>
        <Box>
            <AlarmIcon src={alarmicon} alt="프로필 이미지" />
            <Text>알림</Text>
        </Box>
        <Count>0</Count>
    </Container>
  )
}

const Container=styled.div`
    display: flex;
    width: 100%;
    height: 2.9375rem;
    padding: 0.625rem;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
`
const Box=styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
`
const AlarmIcon=styled.img`
    width: 1.079rem;
    height: 1.079rem;
    flex-shrink: 0;
`
const Text=styled.div`
    ${typo("h3")};
  color: ${color("black.50")};
`
const Count=styled.p`
    color: var(--50, #7A7A7A);
    text-align: center;
    font-family: Pretendard;
    font-size: 19.424px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; 
    
`

export default MiniAlarm;