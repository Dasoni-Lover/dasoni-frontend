import React from 'react'
import styled from 'styled-components'
import { color,typo } from '../../../styles/tokens'

export const NoPost = () => {
  return (
    <Wrapper>작성한 게시물이 없어요</Wrapper>
  )
}

const Wrapper=styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: stretch;
    flex-wrap: wrap;

    ${typo("bodym")};
    color: ${color("black.30")};
`