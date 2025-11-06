import React, { useState } from 'react'
import styled from 'styled-components'
import { color, typo } from '../styles/tokens'
import BarNavigate from "../components/BarNavigate"
import { SentLetter } from '../features/Letters/components/SentLetter'
import Button from '../components/Button'
import ConfirmModal from '../components/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { SideDrawer } from '../features/Letters/components/SideDrawer'

export const SentLetterPage = () => {
  const navigate = useNavigate()
  const [letterText, setLetterText] = useState('')
  const [toName, setToName] = useState('')
  const [fromName, setFromName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('') // "cancel" | "submit"

  const isActive =
    letterText.trim().length >= 50 &&
    toName.trim().length > 0 &&
    fromName.trim().length > 0

  const handleOpenModal = (type) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const handleConfirm = () => {
    navigate('/sent-letterbox') // 편지함으로 이동
  }

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate paths={["홈", "故 박영수의 추모관", "편지쓰기"]}/>
      </NavWrapper>

      <TextWrapper>
        <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
        <Content>
          고인께 전하고 싶은 말과 함께 편지에 마음을 담으면, 다소니가 전달해 드릴게요 <br />
          생일, 기일, 명절 등 기념일에 편지에 대한 답장이 올 거예요.
        </Content>
      </TextWrapper>

      <SentLetter
        to={toName}
        from={fromName}
        value={letterText}
        onToChange={setToName}
        onFromChange={setFromName}
        onValueChange={setLetterText}
      />

      <ButtonWrapper>
        <Button
          text="취소"
          size="M"
          color="white"
          onClick={() => handleOpenModal('cancel')}
        />
        <Button
          text="전달하기"
          size="M"
          active={isActive}
          onClick={() => handleOpenModal('submit')}
        />
      </ButtonWrapper>

      {/* ✅ ConfirmModal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title={
          modalType === 'cancel'
            ? '작성을 그만둘까요?'
            : '편지를 전달했어요'
        }
        description={
          modalType === 'cancel'
            ? '작성한 내용은 저장되지 않고 사라져요'
            : '조금만 기다리면 답장이 올 거예요'
        }
        confirmText={modalType === 'cancel' ? '그만 두기' : '확인'}
        cancelText={modalType === 'cancel' ? '취소' : null} // ✅ 전달하기 모달에는 닫기 버튼 없음
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
      <SideDrawer/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 68.5rem;
  margin-top: 1.81rem;
  position: relative;
`

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const TextWrapper = styled.div`
  width: 100%;
  margin-top: 4.5rem;
  margin-bottom: 4.12rem;
  gap: 0.62rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`

const ButtonWrapper = styled.div`
  margin-top: 4.62rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`