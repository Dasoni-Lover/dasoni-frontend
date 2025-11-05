import React,{useState} from 'react'
import styled from 'styled-components'
import { color,typo } from '../../../styles/tokens'
import {InputField} from "../../../components/InputField"
import Button from "../../../components/Button"
import DatePicker from "../../../components/DatePicker"

export const SearchTab = () => {
    const [date, setDate] = useState(null);
  return (
    <Wrapper>
        <Box>
            <Type>고인의 성함</Type>
            <InputField width="100%"/>
        </Box>
        <Box>
            <Type>고인의 생일</Type>
            <DatePicker selected={date} onChange={setDate} placeholder="YYYY/M/D" width="100%"/>
        </Box>
        <Box>
            <Type>고인의 기일</Type>
            <DatePicker selected={date} onChange={setDate} placeholder="YYYY/M/D" width="100%"/>
        </Box>
        <ButtonBox>
            <Button text="작성하기" size="M" icon={true} />
        </ButtonBox>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    display: flex;
    flex-direction: row;
    padding: 1.25rem;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.25rem;
    align-self: stretch;
    border-radius: 0.75rem;
    background: var(--Lightgrey, #F8F8F8);
`

const Box=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4375rem;
    width: 15rem;
    box-sizing: border-box;
`
const ButtonBox=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    width: 15rem;
`

const Type=styled.div`
   ${typo("bodym")};
  color: ${color("black.50")};   
`
