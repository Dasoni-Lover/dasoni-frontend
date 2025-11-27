// src/features/OpenMemorialHall/components/OpenMemorialHallForm.jsx
import React from "react";
import styled from "styled-components";
import { color } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";

import OpenStep1 from "./OpenStep1";
import OpenStep2 from "./OpenStep2";
import OpenStep3 from "./OpenStep3";
import OpenStep4 from "./OpenStep4";
import OpenStep5 from "./OpenStep5";

/**
 * step: 1~5
 * onStepValidChange: (boolean) => void
 * formData: 전체 폼 데이터
 * setFormData: 폼 데이터 업데이트 함수
 */
export default function OpenMemorialHallForm({
  step = 1,
  onStepValidChange,
  formData,
  setFormData,
}) {
  return (
    <WhiteBox>
      {/* 상단 진행바 */}
      <Row $gap={"0.58rem"}>
        {[1, 2, 3, 4, 5].map((i) => (
          <ProgressBar key={i} $active={step >= i} />
        ))}
      </Row>
      {/* 단계별 내용 */}
      {step === 1 && (
        <OpenStep1
          onValidChange={onStepValidChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <OpenStep2
          onValidChange={onStepValidChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <OpenStep3
          onValidChange={onStepValidChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <OpenStep4
          onValidChange={onStepValidChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 5 && (
        <OpenStep5
          onValidChange={onStepValidChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </WhiteBox>
  );
}

const WhiteBox = styled.div`
  display: flex;
  width: 45rem;
  padding: 3.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;

  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
`;

const ProgressBar = styled.div`
  width: 2.125rem;
  height: 0.625rem;
  border-radius: 0.25rem;
  background: ${({ $active }) => ($active ? color("main") : color("black.10"))};
`;
