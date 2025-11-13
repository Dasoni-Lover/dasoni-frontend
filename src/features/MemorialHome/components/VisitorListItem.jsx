import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { color, typo } from '../../../styles/tokens'
import Button from '../../../components/Button'
import ConfirmModal from '../../../components/ConfirmModal' // ✅ 추가

import downicon from '../assets/dropdown-icon.png'
import righticon from '../assets/open-icon.svg'
import VisitorListItemContent from './VisitorListItemContent'

export default function VisitorListItem({ openAll, type }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) // ✅ 모달 상태 추가
  const [contentWidth, setContentWidth] = useState('auto')
  const idWrapperRef = useRef(null)

  useEffect(() => {
    if (idWrapperRef.current) {
      setContentWidth(`${idWrapperRef.current.offsetWidth}px`)
    }
  }, [])

  useEffect(() => {
    setIsOpen(openAll)
  }, [openAll])

  const handleToggle = () => setIsOpen((prev) => !prev)

  // 모달 제어 함수
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleConfirm = () => {
    // 실제 "내보내기" 실행 로직 위치 (API 요청 등)
    console.log("사용자를 내보냈습니다!")
    setIsModalOpen(false)
  }

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
          {type === 'request' ? (
            <>
              <Button text="수락" size="S" width="6.25rem" />
              <Button text="거절" size="S" width="6.25rem" color="white" />
            </>
          ) : (
            <Button
              text="내보내기"
              size="S"
              width="6.25rem"
              color="white"
              onClick={handleOpenModal} // 클릭 시 모달 열기
            />
          )}
        </ButtonWrapper>
      </TopRow>

      {isOpen && (
        <ContentWrapper style={{ width: contentWidth }}>
          <VisitorListItemContent />
        </ContentWrapper>
      )}

      {/* 모달 렌더링 */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="해당 추모객을 내보낼까요?"
        description="추모객은 다시 요청을 보낼 수 있어요"
        confirmText="내보내기"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
        subImage={downicon}
        subText = "이예림"
      />
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