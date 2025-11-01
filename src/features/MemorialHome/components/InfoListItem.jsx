import React from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'

const InfoListItem = ({ type, content }) => {
  return (
    <Wrapper>
      <Type>{type}</Type>
      <Content>{content}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 0.625rem 2.25rem;
  gap: 0.25rem;

  justify-content: space-between;
  align-items: flex-start;
`

const Type = styled.div`
  ${typo('bodym')};
  color: ${color('black.30')};
`

const Content = styled.div`
  ${typo('bodyb')};
  color: ${color('black.50')};
`

export default InfoListItem
