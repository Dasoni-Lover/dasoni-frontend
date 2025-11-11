import React from 'react'
import styled from 'styled-components'
import VisitorListItem from './VisitorListItem'

export default function VisitorList({ openAll }) {
  return (
    <Container>
      {Array.from({ length: 4 }).map((_, i) => (
        <VisitorListItem key={i} openAll={openAll} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68.5rem;
  box-sizing: border-box;
  padding-right: 1.25rem;
  background: #E9E9E9;
`
