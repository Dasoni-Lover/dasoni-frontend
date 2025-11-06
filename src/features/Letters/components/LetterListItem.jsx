import React from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'

export const LetterListItem = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <To>TO.박영수</To>
        <Date>&nbsp;· 2025/10/15</Date>
      </Wrapper>
      <Content>
        영수야, 오늘은 네가 좋아하던 가을 날씨야. 하늘도 높고 바람도 맑아서 ...
      </Content>
    </Container>
  )
}


const Container = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 1.25rem 1.375rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  box-sizing: border-box;

  border-radius: 0.625rem;
  border: 1px solid var(--5, #E9E9E9);
  background: var(--0, #FFF);
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const To = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
`

const Date = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
  width: 100%; // 부모 폭에 맞춤
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;