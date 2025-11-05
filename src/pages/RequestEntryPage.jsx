import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Column, Row } from "../styles/flex";
import CancelProcessButton from "../components/CancelProcessButton";
import RequestEntryForm from "../features/RequestEntry/components/RequestEntryForm";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

Button;
export default function RequestEntryPage() {
  const [step, setStep] = useState(1);
  const MAX_STEP = 3;

  const [isStepValid, setIsStepValid] = useState(false); //  현재 단계 유효 여부
  const isLastStep = step === MAX_STEP;

  const [isCompleted, setIsCompleted] = useState(false); // 요청 완료
  const [isCanceled, setIsCanceled] = useState(false); // 요청 취소

  const handleNext = () => {
    if (!isStepValid) return; //  필수값 미입력 시 막기

    if (step < MAX_STEP) {
      setStep(step + 1);
    } else {
      // 마지막 단계 "완료" 처리
      console.log("입장요청 완료 처리 TODO");
      setIsCompleted(true);
    }
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
      console.log("입장요청 취소 처리 TODO");
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
          <Title>입장 요청 보내기</Title>
          <Row $justify={"space-between"}>
            <Subtitle>
              {`입장 요청을 위한 정보를 입력해 주세요.\n추모관 관리자가 볼 수 있는 정보예요.`}
            </Subtitle>
            <CancelProcessButton onClick={handleCancelProcess} />
          </Row>
        </Column>
      </BarWrapper>

      <Row $justify={"space-between"}>
        {/*  폼에서 현재 단계의 유효 여부를 알려줌 */}
        <RequestEntryForm step={step} onStepValidChange={setIsStepValid} />

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
      {/*  완료 클릭 시 */}
      <ConfirmModal
        isOpen={isCompleted}
        title="성공적으로 입장 요청을 보냈어요"
        description="관리자가 요청을 승인하면 알림을 보내드릴게요"
        confirmText="흠으로"
      />
      {/*  그만두기 클릭 시 */}
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 입장요청을 그만둘까요?"
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
