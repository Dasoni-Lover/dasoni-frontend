import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Column, Row } from "../../../styles/flex";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CancelProcessButton from "../../../components/CancelProcessButton";
import ConfirmModal from "../../../components/ConfirmModal";

export default function GenerateComplete({
  setIsGenerated,
  generatedImage,
  hallId,
}) {
  const nav = useNavigate();

  const [isCanceled, setIsCanceled] = useState(false);
  const [badgedImage, setBadgedImage] = useState(null); // 뱃지 붙인 최종 이미지 (서비스 내부 표시용)

  const goGenerate = () => setIsGenerated(false);

  const goWritePost = () => {
    // ✅ 서비스 내부에서는 AI 뱃지가 붙은 이미지를 사용
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

  // 이미지에 AI 뱃지 그려주는 함수 (서비스 내부 표시용)_1:1 버전
  const addAIBadgeToImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // CORS 허용된 경우 캔버스 사용 가능

      img.onload = () => {
        // 1) 1:1 캔버스 만들기 (기준은 짧은 변)
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");

        // 2) 원본 이미지에서 중앙 부분을 1:1로 crop
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;

        ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

        // 3) AI 뱃지 붙이기
        const badgeRadius = size * 0.07; // 1:1 기준 비율
        const padding = badgeRadius * 0.6;

        const cx = size - badgeRadius - padding;
        const cy = size - badgeRadius - padding;

        // 배경 원
        ctx.beginPath();
        ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.stroke();

        // AI 텍스트
        ctx.fillStyle = "#fff";
        ctx.font = `${badgeRadius * 1.1}px Pretendard, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AI", cx, cy + 1);

        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = (e) => reject(e);
      img.src = src;
    });

  // 컴포넌트 마운트/생성 이미지 변경 시, AI 뱃지 버전 생성 (서비스 내부용)
  useEffect(() => {
    if (!generatedImage) return;

    let cancelled = false;

    addAIBadgeToImage(generatedImage)
      .then((url) => {
        if (!cancelled) {
          setBadgedImage(url);
        }
      })
      .catch((err) => {
        console.error("AI 뱃지 생성 실패:", err);
        // 실패해도 최소한 원본 이미지는 계속 사용 가능
      });

    return () => {
      cancelled = true;
    };
  }, [generatedImage]);

  // ✅ 생성된 이미지 "다운로드"는 항상 원본(generatedImage)만 사용
  const handleDownload = () => {
    if (!generatedImage) return;

    const a = document.createElement("a");
    a.href = generatedImage; // <- 뱃지 안 붙인 원본만 다운로드

    const inputName = prompt("저장할 파일명을 입력하세요", "memorial-image");
    if (!inputName) return;

    a.download = `${inputName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 서비스 화면에 표시할 이미지는 뱃지 버전 우선
  const displayImage = badgedImage || generatedImage;

  return (
    <div>
      <Column>
        <Row $justify={"end"} style={{ marginBottom: "3.38rem" }}>
          <CancelProcessButton
            title="작성 그만두기"
            onClick={handleCancelProcess}
          />
        </Row>

        <Row $justify="space-around" style={{ marginBottom: "13rem" }}>
          <GeneratedImg src={displayImage} alt="생성된 이미지" />
          <Column style={{ width: "24.5rem" }} $justify={"space-between"}>
            <InformText></InformText>
            <Column $gap={"1.25rem"}>
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
  border: 3px solid var(--5, #e9e9e9);
  background: lightgray 50% / cover no-repeat;
  box-shadow: 0 4px 22.6px 0 rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;

const InformText = styled.div`
  ${typo("h2")};
  color: ${color("black")};
  white-space: pre-line;
`;
