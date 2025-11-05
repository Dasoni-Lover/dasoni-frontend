import React from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'
import letterbg from "../assets/letter-bg.svg"

export const Letter = () => {


  return (
    <Container>
      <Row1>
          <To>T0.박영수</To>
      </Row1>

      <InputBox>
        <Content>영수야, 오늘은 네가 좋아하던 가을 날씨야. 하늘도 높고 바람도 맑아서 그런지, 문득 네가 더 그리워졌어. 벌써 이렇게 시간이 흘렀는데도, 너와 함께했던 기억들은 여전히 내 마음 한켠에 따뜻하게 남아 있어. 너를 만난 건 내 인생 가장 큰 행운이었고, 그 추억 덕분에 나는 여전히 하루하루를 버틸 수 있어. 어디서든 편히 웃고 있길 바랄게, 영수야.</Content>
      </InputBox>

      <Row2>
        <From>From.박영진</From>
      </Row2>
    </Container>
  )
}

const Container = styled.div`
  width: 56.25rem;
  height: 32rem;
  border-radius: 0.625rem;
  padding: 0.81rem 1.38rem;

  background-image: url(${letterbg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #d9d9d9;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const To=styled.div`
    color: var(--80, #0E0E0E);
    /* Heading5 */
    font-family: "Nanum OeHarMeoNiGeurSsi";
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 145%;
`
const From=styled.div`
    color: var(--80, #0E0E0E);
    /* Heading5 */
    font-family: "Nanum OeHarMeoNiGeurSsi";
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 145%;
`
const Content=styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
`

const Row1 = styled.div`
  display: flex;
  align-items: center;
`

const Row2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`


const InputBox = styled.div`
  border-top: 1px solid var(--50, #7A7A7A);
  border-bottom: 1px solid var(--50, #7A7A7A);
  height: 23.125rem;
  padding: 0.94rem 0.5rem;
`
