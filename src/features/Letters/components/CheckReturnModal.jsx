import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";

export const CheckReturnModal = ({ onClose, onConfirm, disableYes }) => {
  const [selectedOption, setSelectedOption] = useState("no");

  const modalContent = (
    <Wrapper>
      <Box>
        <Text>고인의 목소리로 답장을 받아보시겠어요?</Text>

        <RadioWrapper>
          {/* YES */}
          <RadioItem
            disabled={disableYes}
            onClick={() => {
              if (!disableYes) setSelectedOption("yes");
            }}
          >
            <HiddenRadio checked={selectedOption === "yes"} />
            <CustomRadio checked={selectedOption === "yes"} disabled={disableYes} />
            <Description>
              <RadioLabel>네, 답장을 받을게요</RadioLabel>
              <RadioLabe2>
                고인의 목소리로 AI 음성 답장을 보내 드려요<br/>
                <Bold>답장을 받는 편지는 하루에 한 번만 쓸 수 있어요</Bold>
              </RadioLabe2>
            </Description>
          </RadioItem>

          {/* NO */}
          <RadioItem onClick={() => setSelectedOption("no")}>
            <HiddenRadio checked={selectedOption === "no"} />
            <CustomRadio checked={selectedOption === "no"} />
            <Description>
              <RadioLabel>괜찮아요, 편지만 보낼게요</RadioLabel>
              <RadioLabe2>
                답장을 받지 않아도 보낸 편지함에 보관돼요
              </RadioLabe2>
            </Description>
          </RadioItem>
        </RadioWrapper>

        <ButtonWrapper>
          <Button text="확인" onClick={() => onConfirm(selectedOption)} />
          <Button text="취소" color="white" onClick={onClose} />
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(5.4px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200000;
`;

const Box = styled.div`
  display: inline-flex;
  padding: 5.25rem 4.75rem 2.75rem 4.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.75rem;
  border-radius: 1.25rem;
  background: #FFF;
`;

const Text = styled.div`
  ${typo("h2")};
  color: ${color("black.80")};
  text-align: center;
`;

const Bold=styled.span`
  font-weight: 650;
  color: #7e7e7e;
`

const RadioWrapper = styled.div`
  display: flex;
  width: 24.625rem;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioItem = styled.div`
  display: flex;
  gap: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;




const HiddenRadio = styled.input`
  display: none;
`;

const CustomRadio = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;

  /* 내부 작은 원 */
  &::after {
    content: "";
    width: 0.875rem;
    height: 0.875rem;
    background-color: #000;
    border-radius: 50%;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: 0.2s ease;
  }
`;

const Description=styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    flex: 1 0 0;
`

const RadioLabel = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;

const RadioLabe2 = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 24.5rem;
`;
