// src/features/RequestEntry/components/RequstEntryForm.jsx
import React from "react";
import styled from "styled-components";
import { color } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import RequestStep1 from "./RequestStep1";
import RequestStep2 from "./RequestStep2";
import RequestStep3 from "./RequestStep3";

export default function RequstEntryForm({ step = 1, onStepValidChange }) {
  return (
    <WhiteBox>
      {/* 상단 진행바 */}
      <Row $gap={"0.58rem"}>
        {[1, 2, 3].map((i) => (
          <ProgressBar key={i} $active={step >= i} />
        ))}
      </Row>

      {/* 단계별 내용 */}
      {step === 1 && <RequestStep1 onValidChange={onStepValidChange} />}
      {step === 2 && <RequestStep2 onValidChange={onStepValidChange} />}
      {step === 3 && <RequestStep3 onValidChange={onStepValidChange} />}
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
