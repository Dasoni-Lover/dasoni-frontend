import React,{useState} from 'react'
import styled from 'styled-components'
import { RoundButton } from './RoundButtton'
import FoldableButton from './FoldableButton'
import VisitorList from "../components/VisitorList"

import upicon from "../assets/up-icon.svg"
import downicon from "../assets/dropdown-icon.png"

export default function MyRecord() {
  const [openAll, setOpenAll] = useState(false)

  const handleFoldAll = () => setOpenAll(false)
  const handleExpandAll = () => setOpenAll(true)

  return (
    <Wrapper>
      <ButtonWrapper>
        <RoundButton text="입장 요청" count={6} />
        <RoundButton text="추모객 명단" count={2} type="white" />
      </ButtonWrapper>

      <DropDownWrapper>
        <FoldableButton text="모두 접기" src={upicon} onClick={handleFoldAll} />
        <FoldableButton text="모두 펼치기" src={downicon} onClick={handleExpandAll} />
      </DropDownWrapper>

      <ScrollArea>
        <VisitorList openAll={openAll} />
      </ScrollArea>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 36.8rem;
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.06rem;
  align-items: center;
  padding-bottom: 0.75rem;
  background: #e9e9e9;
  padding-top: 2rem;
`

const DropDownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
  height: 3.25rem;
  padding-bottom: 1.5rem;
  background: #e9e9e9;
`

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  
  /* 스크롤 기능은 유지하면서 드래그바(스크롤바) 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 */
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
`

