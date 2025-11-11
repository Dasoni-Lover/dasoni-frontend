import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'
import Button from '../../../components/Button'

import downicon from '../assets/dropdown-icon.png'
import righticon from '../assets/open-icon.svg'
import VisitorListItemContent from './VisitorListItemContent'

export default function VisitorListItem({ openAll }) {
  const [isOpen, setIsOpen] = useState(false)
  const [contentWidth, setContentWidth] = useState('auto')
  const idWrapperRef = useRef(null)

  // IdWrapper 너비 측정해서 content에 동일 적용
  useEffect(() => {
    if (idWrapperRef.current) {
      setContentWidth(`${idWrapperRef.current.offsetWidth}px`)
    }
  }, [])

  // 부모에서 전체 열기/닫기 상태를 제어
  useEffect(() => {
    setIsOpen(openAll)
  }, [openAll])

  const handleToggle = () => setIsOpen((prev) => !prev)

  return (
    <Container>
      <TopRow>
        <Wrapper>
          <Open src={isOpen ? downicon : righticon} onClick={handleToggle} />
          <IdWrapper ref={idWrapperRef}>
            <Id>1</Id>
            <Name>김민서</Name>
          </IdWrapper>
        </Wrapper>

        <ButtonWrapper>
          <Button text="수락" size="S" width="6.25rem" />
          <Button text="거절" size="S" width="6.25rem" color="white" />
        </ButtonWrapper>
      </TopRow>

      {isOpen && (
        <ContentWrapper style={{ width: contentWidth }}>
          <VisitorListItemContent />
        </ContentWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  box-sizing: border-box;
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  width: 50.5rem;
  padding: 0.5rem 0.625rem;
  align-items: center;
  gap: 1.875rem;
`

const Open = styled.img`
  cursor: pointer;
  padding: 0.375rem;
  height: 1.5rem;
`

const IdWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-right: 1rem;
  gap: 1rem;
  flex: 1 0 0;
`

const Id = styled.div`
  ${typo('bodyb')};
  color: ${color('black.70')};
`

const Name = styled.div`
  color: var(--70, #313131);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  flex: 1 0 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.25rem;
`

const ContentWrapper = styled.div`
  margin-left: 4.76rem;
  margin-top: 1.88rem;
  transition: all 0.3s ease;
  overflow: hidden;
`
