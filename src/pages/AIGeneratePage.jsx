// src/pages/AIGeneratePage.jsx
import React, { useState } from "react";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import BarNavigate from "../components/BarNavigate";
import styled from "styled-components";
import GenerateComplete from "../features/AIGenerate/components/GenerateComplete";
import Loding from "../features/AIGenerate/components/Loding";
import { generateAIImage } from "../api/memorial-album";

export default function AIGeneratePage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async ({ images, prompt }) => {
    try {
      setIsLoading(true);

      // ✅ 객체로 전달해야 함
      const res = await generateAIImage({ images, prompt });

      setGeneratedImage(res.generatedImage);
      setIsGenerated(true);
    } catch (error) {
      console.error("AI 이미지 생성 실패:", error);
      alert("이미지 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
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
        <GenerateComplete
          setIsGenerated={setIsGenerated}
          generatedImage={generatedImage}
        />
      ) : (
        <AIGenerateForm onGenerate={handleGenerate} />
      )}

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
