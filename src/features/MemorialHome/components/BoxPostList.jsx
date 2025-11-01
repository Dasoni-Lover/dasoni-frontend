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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 18.3125rem;

`


export default BoxPostList
