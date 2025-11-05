import React from 'react'
import styled from 'styled-components'
import { color,typo } from '../styles/tokens'
import BarNavigate from "../components/BarNavigate"
import {LetterList} from "../features/Letters/components/LetterList"
import calendar from "../assets/calendar-icon.svg"

export const SentLetterBoxPage = () => {
  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate/>
      </NavWrapper>
      <Title>총 3개의 보낸 편지가 있어요</Title>
      <CalendarWrapper>
        <Calendar src={calendar}/>
      </CalendarWrapper>
      <LetterList/>
    </Wrapper>
  )
}

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: center;
  margin-top: 1.81rem;
`
const Title=styled.div`
  width: 100%;
  ${typo("h3")};
  color: ${color("black.70")};
  margin-bottom: 1.5rem;
`
const NavWrapper=styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`

const Calendar=styled.img`
display: flex;
width: 2.5rem;
height: 2.5rem;
padding: 0.25rem;
justify-content: center;
align-items: center;
gap: 0.25rem;
flex-shrink: 0;
aspect-ratio: 1/1;
border-radius: 0.25rem;
border: 1px solid var(--10, #DDD);
background: var(--0, #FFF);

box-sizing: border-box;
`
const CalendarWrapper=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 1rem;
  cursor: pointer;

`