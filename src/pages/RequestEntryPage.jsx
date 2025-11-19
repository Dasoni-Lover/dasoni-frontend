import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // 추가
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Column, Row } from "../styles/flex";
import CancelProcessButton from "../components/CancelProcessButton";
import RequestEntryForm from "../features/RequestEntry/components/RequestEntryForm";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";

export default function RequestEntryPage() {
  const location = useLocation();
  const hall = location.state?.hall; // 모달에서 전달한 hall 데이터

  const [step, setStep] = useState(1);
  const MAX_STEP = 3;
  const [isStepValid, setIsStepValid] = useState(false);
  const isLastStep = step === MAX_STEP;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const handleNext = () => {
    if (!isStepValid) return;
    if (step < MAX_STEP) setStep(step + 1);
    else setIsCompleted(true);
  };

  const handlePrevOrCancel = () => {
    if (step === 1) setIsCanceled(true);
    else setStep(step - 1);
  };

  const handleCancelProcess = () => setIsCanceled(true);

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
          {hall && <HallInfo>현재 선택된 추모관: {hall.name}</HallInfo>}
        </Column>
      </BarWrapper>

      <Row $justify={"space-between"}>
        <RequestEntryForm step={step} onStepValidChange={setIsStepValid} />

        <Column $gap={"1rem"}>
          <Button
            size="M"
            width="14rem"
            text={isLastStep ? "완료" : "다음"}
            onClick={handleNext}
            active={isStepValid}
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
        title="성공적으로 입장 요청을 보냈어요"
        description="관리자가 요청을 승인하면 알림을 보내드릴게요"
        confirmText="흠으로"
      />
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 입장요청을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onCancel={() => setIsCanceled(false)}
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

const HallInfo = styled.div`
  ${typo("h4")};
  color: ${color("black.70")};
  margin-top: 1rem;
`;
