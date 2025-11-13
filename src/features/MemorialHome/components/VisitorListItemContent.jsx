import React from 'react'
import styled from 'styled-components'
import { color,typo } from '../../../styles/tokens'

export default function VisitorListItemContent() {
  return (
    <Container>
        <Wrapper>
            <Type>이름</Type>
            <Content>김민서</Content>
        </Wrapper>
        <Wrapper>
            <Type>관계</Type>
            <Content>친구</Content>
        </Wrapper>
        <Wrapper>
            <Type>영진님을 표현하는 단어</Type>
            <Content>소중한 · 밝은</Content>
        </Wrapper>
        <Wrapper>
            <Type>관계 세부 설명</Type>
            <Content>중학교 동창입니다.</Content>
        </Wrapper>
        <Wrapper>
            <Type>영진님 한 줄 소개</Type>
            <Content>중학교 동창입니다. 중학교 동창입니다.</Content>
        </Wrapper>
    </Container>
  )
}

const Container=styled.div`
    display: flex;
    padding: 0 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;

    margin-bottom: 1.25rem;
`

const Wrapper=styled.div`
    width: 100%;
    display: flex;
    height: 1.5rem;
    align-items: center;
    gap: 0.25rem;
    align-self: stretch;
`
const Type=styled.div`
    width: 10.75rem;
    ${typo("bodym")};
    color: ${color("black.50")};
`
const Content=styled.div`
    ${typo("bodym")};
    color: ${color("black.70")};
    flex: 1 0 0;
`