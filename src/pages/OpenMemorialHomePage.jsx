import React, { useState } from "react";
import { Column, Row } from "../styles/flex";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import CancelProcessButton from "../components/CancelProcessButton";
import OpenMemorialHomeForm from "../features/OpenMemorialHome/components/OpenMemorialHomeForm";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

export default function OpenMemorialHomePage() {
  const [step, setStep] = useState(1);
  const MAX_STEP = 4;

  const [isStepValid, setIsStepValid] = useState(false); //  현재 단계 유효 여부
  const [isCompleted, setIsCompleted] = useState(false); // 개설 완료
  const [isCanceled, setIsCanceled] = useState(false); // 작성 취소

  const isLastStep = step === MAX_STEP;

  const handleNext = () => {
    if (!isStepValid) return; //  필수값 미입력 시 막기

    if (step < MAX_STEP) {
      setStep(step + 1);
    } else {
      // 마지막 단계 "완료" 처리
      console.log("추모관 개설 완료 처리 TODO");
      setIsCompleted(true);
    }
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
      console.log("추모관 개설 취소 처리 TODO");
      return;
    }
    setStep(step - 1);
  };

  const handleCancelProcess = () => {
    setIsCanceled(true);
  };

  return (
    <div>
      <BarWrapper>
        <Column>
          <Title>추모관 개설</Title>
          <Row $justify={"space-between"}>
            <Subtitle>
              {`추모관 개설을 위한 정보를 입력해 주세요.\n추모관에 입장한 사람들이 볼 수 있어요`}
            </Subtitle>
            <CancelProcessButton onClick={handleCancelProcess} />
          </Row>
        </Column>
      </BarWrapper>

      <Row $justify={"space-between"}>
        {/*  폼에서 현재 단계의 유효 여부를 알려줌 */}
        <OpenMemorialHomeForm step={step} onStepValidChange={setIsStepValid} />

        <Column $gap={"1rem"}>
          <Button
            size="M"
            width="14rem"
            text={isLastStep ? "완료" : "다음"}
            onClick={handleNext}
            active={isStepValid} //  필수값 다 채워지면 true
          />
          <Button
            size="M"
            width="14rem"
            color="white"
            text={step === 1 ? "취소" : "뒤로"}
            onClick={handlePrevOrCancel}
          />
        </Column>
      </Row>
      <ConfirmModal
        isOpen={isCompleted}
        title="추모관 개설이 완료 되었어요"
        description="이곳에서 소중한 추억을 함께 나눠주세요"
        confirmText="개설한 추모관 가기"
        cancelText="홈으로"
      />
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 입장 요청을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onCancel={() => {
          setIsCanceled(false);
        }}
      />
    </div>
  );
}

const BarWrapper = styled.div`
  margin-top: 4.38rem;
  margin-bottom: 52px;
  display: flex;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  ${typo("h1")};
  color: black;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
  white-space: pre-line;
`;
