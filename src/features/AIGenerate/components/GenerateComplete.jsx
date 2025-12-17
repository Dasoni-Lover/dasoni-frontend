import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Column, Row } from "../../../styles/flex";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CancelProcessButton from "../../../components/CancelProcessButton";
import ConfirmModal from "../../../components/ConfirmModal";
import aiBadge from "../assets/icon-ai.svg";

export default function GenerateComplete({
  setIsGenerated,
  generatedImage,
  hallId,
}) {
  const nav = useNavigate();

  const [isCanceled, setIsCanceled] = useState(false);
  const [badgedImage, setBadgedImage] = useState(null);

  const goGenerate = () => setIsGenerated(false);

  const goWritePost = () => {
    const imageToUse = badgedImage || generatedImage;
    nav("/write", {
      state: {
        hallId,
        generatedImage: imageToUse,
        isAI: true,
      },
    });
  };

  const handleCancelProcess = () => setIsCanceled(true);
  const goHome = () => nav("/home");

  // ✅ AI 뱃지(svg) 붙이기
  const addAIBadgeToImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const badge = new Image();

      img.crossOrigin = "anonymous";
      badge.crossOrigin = "anonymous";

      img.onload = () => {
        badge.onload = () => {
          const size = Math.min(img.width, img.height);
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;

          const ctx = canvas.getContext("2d");

          // 1️⃣ 중앙 1:1 crop
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;
          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

          // 2️⃣ AI 뱃지 크기 (height 기준, 비율 유지)
          const badgeHeight = 7.6 * 16; // 66px
          const badgeWidth = badgeHeight * (1.5 / 1.77013); // 약 55.93px
          const padding = size * 0.064;


          const x = size - badgeWidth - padding;
          const y = size - badgeHeight - padding;

          ctx.drawImage(badge, x, y, badgeWidth, badgeHeight);

          resolve(canvas.toDataURL("image/png"));
        };

        badge.onerror = reject;
        badge.src = aiBadge;
      };

      img.onerror = reject;
      img.src = src;
    });

  useEffect(() => {
    if (!generatedImage) return;

    let cancelled = false;

    addAIBadgeToImage(generatedImage)
      .then((url) => {
        if (!cancelled) setBadgedImage(url);
      })
      .catch((err) => {
        console.error("AI 뱃지 생성 실패:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [generatedImage]);

  // 다운로드는 항상 원본 이미지
  const handleDownload = () => {
    if (!generatedImage) return;

    const a = document.createElement("a");
    a.href = generatedImage;

    const inputName = prompt("저장할 파일명을 입력하세요", "memorial-image");
    if (!inputName) return;

    a.download = `${inputName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const displayImage = badgedImage || generatedImage;

  return (
    <div>
      <Column>
        <Row $justify="end" style={{ marginBottom: "3.38rem" }}>
          <CancelProcessButton
            title="작성 그만두기"
            onClick={handleCancelProcess}
          />
        </Row>

        <Row $justify="space-around" style={{ marginBottom: "13rem" }}>
          <GeneratedImg src={displayImage} alt="생성된 이미지" />
          <Column style={{ width: "24.5rem" }} $justify="space-between">
            <InformText />
            <Column $gap="1.25rem">
              <Button
                size="L"
                color="main"
                text="이 이미지로 게시물 작성하기"
                onClick={goWritePost}
              />
              <Button
                size="L"
                color="white"
                text="다시 생성"
                icon="restart"
                onClick={goGenerate}
              />
              <Button
                size="L"
                color="white"
                text="다운로드"
                icon="download"
                onClick={handleDownload}
              />
            </Column>
          </Column>
        </Row>
      </Column>

      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 개설을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm={goHome}
        onCancel={() => setIsCanceled(false)}
      />
    </div>
  );
}

/* ================= styled ================= */

const GeneratedImg = styled.img`
  width: 32.5rem;
  height: 32.5rem;
  border-radius: 0.4375rem;
  border: 3px solid #e9e9e9;
  background: lightgray 50% / cover no-repeat;
  box-shadow: 0 4px 22.6px rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;

const InformText = styled.div`
  ${typo("h2")};
  color: ${color("black")};
  white-space: pre-line;
`;
