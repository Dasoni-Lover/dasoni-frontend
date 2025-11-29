import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";

export const CheckReturnModal = ({ onClose, onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState("yes");

  // 바깥 클릭 → 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Wrapper onClick={handleBackdropClick}>
      <Box>
        <Text>고인의 목소리로 답장을 받아보시겠어요?</Text>

        <RadioWrapper>
          <RadioItem onClick={() => setSelectedOption("yes")}>
            <HiddenRadio
              type="radio"
              checked={selectedOption === "yes"}
              onChange={() => setSelectedOption("yes")}
            />
            <CustomRadio checked={selectedOption === "yes"} />
            <RadioLabel>예, 받고 싶어요</RadioLabel>
          </RadioItem>

          <RadioItem onClick={() => setSelectedOption("no")}>
            <HiddenRadio
              type="radio"
              checked={selectedOption === "no"}
              onChange={() => setSelectedOption("no")}
            />
            <CustomRadio checked={selectedOption === "no"} />
            <RadioLabel>아니요, 괜찮아요</RadioLabel>
          </RadioItem>
        </RadioWrapper>

        <ButtonWrapper>
          <Button text="확인" onClick={() => onConfirm(selectedOption)} />
          <Button text="취소" color="white" onClick={onClose} />
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(5.4px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
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

const RadioWrapper = styled.div`
  display: flex;
  width: 24.625rem;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const CustomRadio = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid #FFBC67;
  background-color: ${({ checked }) => (checked ? "#FFBC67" : "transparent")};
  transition: 0.2s ease;
`;

const RadioLabel = styled.div`
  ${typo("body1")};
  color: ${color("black.70")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 24.5rem;
`;
