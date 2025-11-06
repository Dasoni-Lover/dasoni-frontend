import React, { useState } from "react";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import BarNavigate from "../components/BarNavigate";
import styled from "styled-components";
import GenerateComplete from "../features/AIGenerate/components/GenerateComplete";
import Loding from "../features/AIGenerate/components/Loding";

export default function AIGeneratePage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);

    // ✅ 나중에 여기에 실제 API 요청 로직 들어감
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
    }, 2000); // 2초 후 완료로 전환
  };

  return (
    <PageWrapper>
      <BarWrapper>
        <BarNavigate
          paths={["홈", "故 박영수의 추모관", "AI 이미지 생성"]}
          title="AI 이미지 생성"
        />
      </BarWrapper>

      {isGenerated ? (
        <GenerateComplete setIsGenerated={setIsGenerated} />
      ) : (
        <AIGenerateForm onGenerate={handleGenerate} />
      )}

      {/* ✅ 로딩 모달 */}
      <Loding isOpen={isLoading} onCancel={() => setIsLoading(false)} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;

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
