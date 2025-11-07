import React, { useState } from "react";
import styled from "styled-components";
import BarNavigate from "../components/BarNavigate";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import GenerateComplete from "../features/AIGenerate/components/GenerateComplete";
import Loding from "../features/AIGenerate/components/Loding";
import { generateAIImage } from "../api/ai";

export default function AIGeneratePage({ hallId = 1 }) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async (formData) => {
    // formData: { images: [File, File, File], prompt: "..." }
    setIsLoading(true);
    try {
      // 1️⃣ 파일을 base64로 변환
      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]); // base64Data만 추출
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const imagePayload = await Promise.all(
        formData.images.map(async (file, index) => {
          if (!file) return null;
          const base64Data = await convertToBase64(file);
          return { order: index + 1, base64Data };
        })
      );

      const body = {
        images: imagePayload.filter(Boolean),
        prompt: formData.prompt,
      };

      // 2️⃣ API 요청
      const base64Image = await generateAIImage(hallId, body);
      setGeneratedImage(base64Image);
      setIsGenerated(true);
    } catch (err) {
      console.error("AI 이미지 생성 실패:", err);
      alert("AI 이미지 생성에 실패했습니다. 다시 시도해주세요.");
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
