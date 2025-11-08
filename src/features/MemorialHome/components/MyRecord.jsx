import React from 'react'
import styled from 'styled-components'
import { RoundButton } from './RoundButtton'
import FoldableButton from './FoldableButton'

export default function MyRecord() {
  return (
    <Wrapper>
        <ButtonWrapper>
            <RoundButton text="입장 요청" count={6}  />
            <RoundButton text="추모객 명단" count={2} type='white'/>
        </ButtonWrapper>
        <DropDownWrapper>
            <FoldableButton/>
            <FoldableButton/>
        </DropDownWrapper>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    margin-top: 2rem;
    width: 100%;
    height: 41.3rem;
    background: #E9E9E9;
`
const ButtonWrapper=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.06rem;
    align-items: center;
    margin-bottom: 0.75rem;
`
const DropDownWrapper=styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.25rem;
    align-self: stretch;
    height: 3.25rem;

    margin-bottom: 1.5rem;
`
