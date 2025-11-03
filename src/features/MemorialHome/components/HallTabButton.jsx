import React from 'react'
import styled from 'styled-components'
import { typo, color } from '../../../styles/tokens'

const HallTabButton = ({ text, isActive, onClick }) => {
  return (
    <Wrapper isActive={isActive} onClick={onClick}>
      <Text isActive={isActive}>{text}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 11.5rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  background-color: ${({ isActive }) => (isActive ? '#FFBC67' : 'white')};
  cursor: pointer;
  transition: background-color 0.2s ease;
`

const Text = styled.div`
  ${typo('h4')};
  color: ${({ isActive }) => (isActive ? 'black.80' : color('black.30'))};
  transition: color 0.2s ease;
`

export default HallTabButton
