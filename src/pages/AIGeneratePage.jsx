import React from "react";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import BarNavigate from "../components/BarNavigate";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

export default function AIGeneratePage() {
  return (
    <div>
      <BarWrapper>
        <BarNavigate title={"AI 이미지 생성"} />
      </BarWrapper>

      <AIGenerateForm />
    </div>
  );
}

const BarWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;
