import React from 'react'
import DefaultProfile from './DefaultProfile'
import InfoList from './InfoList'
import styled from 'styled-components'
import { color,typo } from '../../../styles/tokens'


const Profile = () => {
  return (
    <Container>
      <Wrapper>
        <DefaultProfile/>
        <Content>함께있을 때 즐거웠던 사람</Content>
      </Wrapper>
      <InfoList/>
    </Container>
  )
}

const Container=styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  margin-bottom: 52px;
`
const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const Content=styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`


export default Profile