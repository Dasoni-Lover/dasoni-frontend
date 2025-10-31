import React from 'react'
import nextbtn from "../assets/next-btn.png" 
import styled from 'styled-components'
import { color,typo } from '../styles/tokens'

const BarNavigate = () => {
  return (
    <Wrapper>
      <Text>홈</Text>
      <Next src={nextbtn}/>
      <Text>故 박영수의 추모관</Text>
    </Wrapper>
  )
}

const Wrapper =styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  align-self: stretch;
`
const Text=styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`

const Next=styled.img`
  width: 28px;
  height: 28px;
`

export default BarNavigate