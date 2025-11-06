import React, { useState } from "react";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import BarNavigate from "../components/BarNavigate";
import styled from "styled-components";
import GenerateComplete from "../features/AIGenerate/components/GenerateComplete";

export default function AIGeneratePage() {
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <div>
      <BarWrapper>
        <BarNavigate paths={["홈", "故 박영수의 추모관", "AI 이미지 생성"]} title="AI 이미지 생성"/>
      </BarWrapper>

      {isGenerated ? (
        <GenerateComplete setIsGenerated={setIsGenerated} />
      ) : (
        <AIGenerateForm setIsGenerated={setIsGenerated} />
      )}
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
