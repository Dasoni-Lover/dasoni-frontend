import React from 'react'
import styled from 'styled-components'
import VisitorListItem from './VisitorListItem'

export default function VisitorList({ openAll }) {
  return (
    <Box>
      <Container>
        {Array.from({ length: 4 }).map((_, i) => (
        <ItemWrapper key={i}>
          <VisitorListItem openAll={openAll} />
        </ItemWrapper>
      ))}
      </Container>
    </Box>
  )
}

const Box=styled.div`
width: 68.5rem;
box-sizing: border-box;
  background: #e9e9e9;
  border-radius: 0 0 0.625rem 0.625rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68.5rem;
  box-sizing: border-box;
  padding-right: 1.25rem;
  background: #e9e9e9;
  border-radius: 0.625rem;
  border: 1px solid #ddd;
`

// 각 아이템 사이 구분선
const ItemWrapper = styled.div`
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`
