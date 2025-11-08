import React from 'react'
import styled from 'styled-components'

export default function FoldableButton() {
  return (
    <Wrapper>FoldableButton</Wrapper>
  )
}

const Wrapper=styled.div`
    width: 7.56rem;
    height: 2.25rem;
    display: flex;
    padding: 0.5rem 1.25rem 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;
`
