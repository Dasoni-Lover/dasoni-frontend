// src/features/Letters/components/SetTheDeadForm.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Row, Column } from "../../../styles/flex";
import chevron from "../../../assets/icon-chevron-right.svg";

import SetStep1 from "./SetStep1";
import SetStep2 from "./SetStep2";
import SetStep3 from "./SetStep3";
import SetStep4 from "./SetStep4";
import SetStep5 from "./SetStep5";
import SetStep6 from "./SetStep6";

export default function SetTheDeadForm({
  step = 1,
  maxStep = 6, // 🔹 총 단계 수 (관리자 6, 방문자 5)
  isManager = true, // 🔹 관리자 여부
  onStepValidChange,
  formData,
  setFormData,
}) {
  const [isDescOpen, setIsDescOpen] = useState(false);

  // 단계가 바뀔 때마다 기본적으로 유효성 false로 초기화
  useEffect(() => {
    if (onStepValidChange) {
      onStepValidChange(false);
    }
  }, [step, onStepValidChange]);

  // 진행바용 배열 (1~maxStep)
  const stepsArray = Array.from({ length: maxStep }, (_, i) => i + 1);

  return (
    <Wrapper>
      {/* 상단 흰색 카드 */}
      <WhiteBox>
        {/* 상단 진행바 */}
        <Row $gap={"0.58rem"} style={{ marginBottom: "1rem" }}>
          {stepsArray.map((i) => (
            <ProgressBar key={i} $active={step >= i} />
          ))}
        </Row>

        {/* 단계별 내용 */}
        {step === 1 && (
          <SetStep1
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <SetStep2
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <SetStep3
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <SetStep4
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 5 && (
          <SetStep5
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {/* ✅ 관리자일 때만 6단계 렌더링 */}
        {isManager && step === 6 && (
          <SetStep6
            onValidChange={onStepValidChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </WhiteBox>

      {/* 아래 설명 박스 */}
      <DescBox onClick={() => setIsDescOpen((prev) => !prev)}>
        <Row $align={"flex-start"} $gap={"0.75rem"}>
          <ToggleIcon $open={isDescOpen} src={chevron} />
          <Column $gap={"0.5rem"}>
            <DescTitle>고인 정보 설정은 왜 필요한가요?</DescTitle>
            {isDescOpen && (
              <>
                <DescText>
                  입력한 정보를 기반으로 AI 음성 편지를 생성해요. 설정을
                  완료하시면, 추모관에 입장한 다른 추모객들도 고인의 목소리를
                  통한 따뜻한 답장을 받아볼 수 있어요.
                </DescText>
                <DescTip>
                  Tip. 자세히 적을수록 더 깊이 있고 자연스러운 답장을 받을 수
                  있어요.
                </DescTip>
                <DescTitle style={{ marginTop: "1rem" }}>
                  그렇다면 편지 답장은 어떻게 받나요?
                </DescTitle>
                <DescText>
                  편지를 작성하시기 전, 답장 여부를 선택할 수 있어요.
                </DescText>
              </>
            )}
          </Column>
        </Row>
      </DescBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.25rem;
  width: 51.5rem;
`;

const WhiteBox = styled.div`
  display: flex;
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

const DescBox = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #f8e4ca;
  background: #fff4e6;
  cursor: pointer;
  box-sizing: border-box;
`;

const ToggleIcon = styled.img`
  display: inline-block;
  margin-top: 0.3rem;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.15s ease-out;
  color: ${color("main")};
  width: 0.875rem;
`;

const DescTitle = styled.div`
  ${typo("bodyb")};
  color: ${color("black.50")};
`;

const DescText = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;

const DescTip = styled.div`
  ${typo("bodym")};
  color: ${color("main")};
`;
