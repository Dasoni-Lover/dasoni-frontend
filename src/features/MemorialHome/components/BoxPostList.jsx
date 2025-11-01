import React from 'react'
import BoxPostListItem from './BoxPostListItem'
import styled from 'styled-components'

const BoxPostList = () => {
  return (
    <Wrapper>
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 항상 3열 고정 */
  gap: 12px; /* row-gap + column-gap */
`


export default BoxPostList
