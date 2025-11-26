// src/features/MemorialHall/components/AddPostModal.jsx
import React from "react";
import styled from "styled-components";
import ai from "../assets/go-to-ai-icon.svg";
import computer from "../assets/go-to-computer-icon.svg";
import { color, typo } from "../../../styles/tokens";
import xicon from "../assets/x-icon.svg";

export default function AddPostModal({
  onClose,
  onSelectAI,
  onSelectComputer,
}) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <BackWrapper>
          <Back src={xicon} onClick={onClose} />
        </BackWrapper>

        <Wrapper>
          <TitleWrapper>
            <AddPhoto>사진 추가하기</AddPhoto>
            <Where>게시물에 사용할 사진을 어디서 가져올까요?</Where>
          </TitleWrapper>

          <ButtonWrapper>
            <Button onClick={onSelectAI}>
              <IconWrapper>
                <Icon1 src={ai} />
              </IconWrapper>
              <TextWrapper>
                <Title>AI 이미지 생성하기</Title>
                <Content>AI 이미지를 생성하여 게시물을 작성해요</Content>
              </TextWrapper>
            </Button>

            <Button onClick={onSelectComputer}>
              <IconWrapper>
                <Icon2 src={computer} />
              </IconWrapper>
              <TextWrapper>
                <Title>컴퓨터에서 불러오기</Title>
                <Content>사진 파일을 선택하여 올릴 수 있어요</Content>
              </TextWrapper>
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const ModalContainer = styled.div`
  width: 38rem;
  display: inline-flex;
  padding: 2.5rem 2.75rem 3.75rem 2.75rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.125rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

const BackWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Back = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const AddPhoto = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const Where = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Button = styled.div`
  display: flex;
  width: 32.5rem;
  padding: 1.25rem 1.875rem;
  align-items: center;
  gap: 1.9375rem;
  border-radius: 0.375rem;
  border: 1px solid #e9e9e9;
  background: #f8f8f8;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: #fff4e6;
  }

  transition: 0.2s ease;
`;

const IconWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
`;

const Icon1 = styled.img`
  width: 3.5rem;
  height: 4.1rem;
`;

const Icon2 = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
`;
