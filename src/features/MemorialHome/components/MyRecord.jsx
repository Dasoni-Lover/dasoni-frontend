import React, { useState } from 'react'
import styled from 'styled-components'
import { UnderlineButton } from './UnderlineButtton'
import FoldableButton from './FoldableButton'
import VisitorList from "../components/VisitorList"

import upicon from "../assets/up-icon.svg"
import downicon from "../assets/dropdown-icon.png"

export default function MyRecord() {
  const [openAll, setOpenAll] = useState(false)
  const [activeTab, setActiveTab] = useState('request') // ✅ 현재 선택된 탭 상태

  const handleFoldAll = () => setOpenAll(false)
  const handleExpandAll = () => setOpenAll(true)

  return (
    <Wrapper>
      <Container>
        <ButtonWrapper>
          <UnderlineButton
            text="입장 요청"
            count={6}
            type={activeTab === 'request' ? 'click' : 'false'}
            onClick={() => setActiveTab('request')}
          />
          <UnderlineButton
            text="추모객 명단"
            count={2}
            type={activeTab === 'visitor' ? 'click' : 'false'}
            onClick={() => setActiveTab('visitor')}
          />
        </ButtonWrapper>

        <DropDownWrapper>
          <FoldableButton text="모두 접기" src={upicon} onClick={handleFoldAll} />
          <FoldableButton text="모두 펼치기" src={downicon} onClick={handleExpandAll} />
        </DropDownWrapper>
      </Container>

      {/* ✅ 탭 상태에 따라 VisitorList에 type 전달 */}
      <VisitorList openAll={openAll} type={activeTab} />
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
  justify-content: flex-start;
  align-items: center;
`

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 2rem;
  border-bottom: 1px solid var(--5, #E9E9E9);
  margin-bottom: 0.75rem;
`
