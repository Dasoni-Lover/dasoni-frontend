import React,{useState} from 'react'
import styled from 'styled-components'
import { color,typo } from '../../../styles/tokens'
import {InputField} from "../../../components/InputField"
import Button from "../../../components/Button"
import DatePicker from "../../../components/DatePicker"
import searchicon from "../../../assets/search-icon.svg"

export const SearchTab = () => {
    const [birthdate, setBirthDate] = useState(null);
    const [deaddate, setDeadDate] = useState(null);

  return (
    <Wrapper>
        <Box>
            <Type>고인의 성함</Type>
            <InputField width="100%" placeholder="고인 성함"/>
        </Box>
        <Box>
            <Type>고인의 생일</Type>
            <DatePicker selected={birthdate} onChange={setBirthDate} placeholder="1993/2/11" width="100%" height='2.65rem'/>
        </Box>
        <Box>
            <Type>고인의 기일</Type>
            <DatePicker selected={deaddate} onChange={setDeadDate} placeholder="2021/4/24" width="100%" height='2.65rem'/>
        </Box>
        <ButtonBox>
            <Button text="작성하기" size="M" icon={searchicon} style={{ padding: "0.46rem" }}/>
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
