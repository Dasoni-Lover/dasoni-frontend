import React from 'react'
import styled from 'styled-components'
import { LetterListItem } from './LetterListItem'

export const LetterList = () => {
  return (
    <Wrapper>
        <LetterListItem/>
        <LetterListItem/>
        <LetterListItem/>
    </Wrapper>
  )
}

const Wrapper=styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
`
