import React from 'react'
import profileimg from "../../../assets/profile-img.png"
import styled from 'styled-components'
import {color,typo} from "../../../styles/tokens"

const DefaultProfile = () => {
  return (
    <Wrapper>
        <Box>
            <Name>박영수</Name>
            <Date>1993. 2. 11 ~ 2021. 4. 24</Date>
        </Box>
        <Img src={profileimg}/>
    </Wrapper>
  )
}

const Wrapper=styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 36px;
`
const Box=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const Name=styled.div`
    ${typo("h1")};
    color: ${color("black.70")};
`
const Date=styled.div`
    ${typo("h3")};
    color: ${color("black.70")};
`
const Img=styled.img`
    display: flex;
    width: 200px;
    height: 200px;
    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 1/1;

    border-radius: 10px;
    border: solid 2px #E9E9E9;
    
`
export default DefaultProfile