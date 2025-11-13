import React from 'react'
import styled from 'styled-components'
import BarNavigate from '../components/BarNavigate'
import { color,typo } from '../styles/tokens'
import letter from "../features/Letters/assets/receive-letter-icon.svg"
import { SideDrawer } from '../features/Letters/components/SideDrawer'

const RecievedLetterBoxPage = () => {
  return (
    <Wrapper>
        <NavWrapper>
        <BarNavigate
          paths={["나의 추모관", "故 박영수의 추모관","임시보관함"]}
        />
      </NavWrapper>
      <TextWrapper>
        <Count>총 8개의 받은 편지가 있어요</Count>
        <Text>잠시 그리움에 머무르되, 이곳에 머물러 있지 말고 고인과 함께했던 기억을 품은 채 오늘의 삶으로 천천히 돌아가 주세요
            <br/>사랑은 사라지지 않고 여전히 당신 안에서, 따뜻한 온기로 오래도록 남아있을 거예요
            <br/>*음성 편지는 생전 고인의 정보를 바탕으로 만든 가상의 AI 창작물이에요
        </Text>
      </TextWrapper>
      <ContentWrapper>
        <Letter src={letter}/>
        <Letter src={letter}/>
        <Letter src={letter}/>
        <Letter src={letter}/>
        <Letter src={letter}/>
      </ContentWrapper>
      <SideDrawer/>
    </Wrapper>
  )
}

export default RecievedLetterBoxPage;

const Wrapper=styled.div`
width: 68.5rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
`
const NavWrapper=styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1.88rem;
    margin-bottom: 4.5rem;
`

const TextWrapper=styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    margin-bottom: 5rem;
`
const Count=styled.div`
  ${typo("h3")};
  color: ${color("black.70")};    
`
const Text=styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};    
`
const ContentWrapper = styled.div`
  width: 66.9375rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  justify-items: center;
`;

const Letter = styled.img`
  width: 20.625rem;
  height: 13.0625rem;
  flex-shrink: 0;
  aspect-ratio: 30 / 19;
  cursor: pointer;
`;
