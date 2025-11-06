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
        <Content>
          오늘 아침, 창밖으로 햇살이 부드럽게 들어왔다. 빛이 방 안을 가득 채우며 어제와는 조금 다른 기분을 선물했다. 평소처럼 커피를 내리며 향을 맡는데, 왜인지 모르게 마음이 편안해졌다. 어제의 걱정들은 잠시 뒤로 밀려나고, 오늘 하루를 어떻게 채울까 하는 설렘이 찾아왔다. 창문 밖을 보니 길가의 나무들이 바람에 살짝 흔들리고, 새들이 지저귀는 소리가 들린다. 계절은 여전히 가을을 머금고 있어, 나뭇잎들의 색이 점점 붉게 물들고 있었다. 이런 풍경 속에서 잠깐의 산책을 떠올리니, 마음이 한결 가벼워졌다.

최근 들어 나는 작은 변화들이 큰 행복으로 이어질 수 있다는 생각을 자주 한다. 친구와의 짧은 대화, 책 속 한 문장, 혹은 길을 걷다 마주친 작은 꽃 한 송이까지. 이런 사소한 순간들이 모여 나의 하루를 의미 있게 만든다. 바쁘게 살아가는 동안 놓치기 쉬운 것들이지만, 눈을 조금만 돌리면 항상 우리 주변에 존재한다는 사실이 놀랍다. 그래서 나는 의식적으로 작은 행복들을 찾아 기록하려고 노력한다. 오늘의 커피 향, 창밖 나무의 색, 그리고 짧지만 의미 있는 웃음까지.

사람들과의 관계도 비슷한 원리로 작동한다. 작은 관심과 배려가 쌓이면 신뢰와 친밀감으로 이어진다. 오늘은 친구에게 짧게 안부를 묻고, 가족에게 감사의 말을 전했다. 그 반응은 예상보다 따뜻했고, 나 역시 기분이 한결 밝아졌다. 우리는 종종 먼 미래나 큰 목표에만 집중하지만, 사실 행복은 지금, 여기, 이 순간들 속에 있다는 것을 느낀다.

점심을 먹고 나서 잠시 카페에 들렀다. 따뜻한 차를 마시며 사람들을 바라보니 각자의 삶이 얼마나 다채로운지 새삼 느껴졌다. 누군가는 노트북에 집중하고, 누군가는 친구와 수다를 떨고, 또 누군가는 조용히 책을 읽는다. 각자에게 소중한 시간이 존재하며, 나는 그 속에서 잠시 나를 돌아본다. 오늘 하루, 무엇을 느꼈는지, 어떤 순간이 마음에 남았는지 생각하며 글을 써 내려가는 순간이 참 소중하다.

삶은 때로는 복잡하고 예측할 수 없지만, 작은 순간들 속에서 충분히 아름다움을 느낄 수 있다. 그리고 그 순간들을 발견하고 기록하는 것은 우리 자신을 이해하고, 삶을 더 풍요롭게 만드는 과정이라고 생각한다. 오늘 하루, 나는 소소한 행복을 발견하고, 그 감정을 마음 속 깊이 담아두었다. 내일도, 또 그다음 날도, 이런 순간들이 쌓여 나만의 이야기가 되기를 바란다.
        </Content>
      </InputBox>
      <Date>2025/10/04</Date>

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
const Date=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 0.62rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--50, #7A7A7A);

    ${typo("bodym")};
  color: ${color("black.30")};
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
  height: 19.3rem;
  padding: 0.94rem 0.5rem;

  overflow-y: auto;       /* 세로 스크롤 */
  overflow-x: hidden;     /* 가로 스크롤 방지 */
  -webkit-overflow-scrolling: touch; /* 모바일에서 부드럽게 */

  /* 스크롤바 숨기기 */
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`
