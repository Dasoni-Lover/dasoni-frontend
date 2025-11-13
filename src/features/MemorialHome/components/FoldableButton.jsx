import React from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'

export default function FoldableButton({ text, src, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <Icon src={src} alt="icon" />
      <Text>{text}</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 7.56rem;
  display: flex;
  padding: 0.5rem 1.25rem 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
`

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.375rem;
`

const Text = styled.div`
  ${typo('h4')};
  color: ${color('black.50')};
`
