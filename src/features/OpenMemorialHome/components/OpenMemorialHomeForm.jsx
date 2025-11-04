import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";
import { InputField } from "../../../components/InputField";

export default function OpenMemorialHomeForm() {
  const [step, setStep] = useState(null);

  return (
    <WhiteBox>
      <Row $gap={"0.58rem"}>
        <ActiveProgress />
        <InactiveProgress />
        <InactiveProgress />
        <InactiveProgress />
      </Row>
      <StepTitle>고인의 성함을 입력해 주세요.</StepTitle>
      <InputField placeholder="성함을 입력해 주세요." />
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

const ActiveProgress = styled.div`
  width: 2.125rem;
  height: 0.625rem;
  border-radius: 0.25rem;
  background: ${color("main")};
`;

const InactiveProgress = styled.div`
  width: 2.125rem;
  height: 0.625rem;
  border-radius: 0.25rem;
  background: ${color("black.10")};
`;

const StepTitle = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
  margin-top: 1rem;
  margin-bottom: 2.75rem;
`;
