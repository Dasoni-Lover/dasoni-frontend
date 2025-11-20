import React, { useState, useEffect } from "react";
import AIGenerateForm from "../features/AIGenerate/components/AIGenerateForm";
import BarNavigate from "../components/BarNavigate";
import styled from "styled-components";
import GenerateComplete from "../features/AIGenerate/components/GenerateComplete";
import Loding from "../features/AIGenerate/components/Loding";
import { generateAIImage } from "../api/memorial-album";
import { getHallInfo } from "../api/memorial";
import { useLocation } from "react-router-dom";

export default function AIGeneratePage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [hallInfo, setHallInfo] = useState(null);

  const location = useLocation();
  const hallId = location.state?.hallId ?? 1;

  console.log("🔥 현재 받은 hallId:", hallId);
console.log("📦 location.state:", location.state);

  useEffect(() => {
    const fetchHallInfo = async () => {
      try {
        const res = await getHallInfo(hallId);
        setHallInfo(res?.data);
      } catch (error) {
        console.error("추모관 정보 불러오기 실패:", error);
      }
    };
    fetchHallInfo();
  }, [hallId]);

  const handleGenerate = async ({ images, prompt }) => {
    try {
      setIsLoading(true);

      // ⚠️ 서버 요구 base64 형식 확인
      const formattedImages = images.map((img) => ({
        order: img.order,
        base64Data: img.base64Data, // 이미 fileToBase64에서 순수 base64만 추출했음
      }));

      const res = await generateAIImage({ images: formattedImages, prompt, hallId });

      if (!res.generatedImage) {
        throw new Error("AI 이미지 생성 실패: 서버에서 null 반환");
      }

      setGeneratedImage(res.generatedImage);
      setIsGenerated(true);
    } catch (error) {
      console.error(
        "AI 이미지 생성 실패:",
        error.response?.data || error.message || error
      );
      alert(
        error.response?.data?.message || "이미지 생성에 실패했습니다. 권한과 사진을 확인해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hallTitle = hallInfo?.name ? `故 ${hallInfo.name}의 추모관` : "추모관";

  return (
    <PageWrapper>
      <BarWrapper>
        <BarNavigate
          paths={["홈", hallTitle, "AI 이미지 생성"]}
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
