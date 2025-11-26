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
  const [badgedImage, setBadgedImage] = useState(null); // 뱃지 붙인 최종 이미지

  const goGenerate = () => setIsGenerated(false);

  const goWritePost = () => {
    // 배지 붙은 이미지가 있으면 그걸, 아니면 원본 이미지 사용
    const imageToUse = badgedImage || generatedImage;
    nav("/write", {
      state: {
        hallId,
        generatedImage: imageToUse,
      },
    });
  };

  const handleCancelProcess = () => setIsCanceled(true);
  const goHome = () => nav("/home");

  // 이미지에 AI 뱃지 그려주는 함수
  const addAIBadgeToImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // CORS 허용된 경우 캔버스 사용 가능

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = Math.max(img.width, img.height);

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        // 1) 원본 이미지 그리기
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 2) 뱃지 위치/크기 계산 (우하단)
        const badgeRadius = Math.min(canvas.width, canvas.height) * 0.08; // 이미지 크기에 비례
        const padding = badgeRadius * 0.6;
        const cx = canvas.width - badgeRadius - padding;
        const cy = canvas.height - badgeRadius - padding;

        // 3) 동그란 배경
        ctx.beginPath();
        ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFEEF0"; // 배경색
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FFC896"; // 테두리색
        ctx.stroke();

        // 4) "AI" 텍스트
        ctx.fillStyle = "#EF8F53";
        ctx.font = `${badgeRadius * 0.9}px Pretendard, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AI", cx, cy + 1);

        // 5) 최종 이미지를 dataURL로 변환
        const resultUrl = canvas.toDataURL("image/png");
        resolve(resultUrl);
      };

      img.onerror = (e) => reject(e);
      img.src = src;
    });

  // 컴포넌트 마운트/생성 이미지 변경 시, AI 뱃지 버전 생성
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
        // 실패해도 최소한 원본 이미지는 계속 사용 가능하도록 둠
      });

    return () => {
      cancelled = true;
    };
  }, [generatedImage]);

  // 생성된 이미지 저장 핸들러
  const handleDownload = () => {
    const imageToDownload = badgedImage || generatedImage;
    if (!imageToDownload) return;

    const a = document.createElement("a");
    a.href = imageToDownload;

    const inputName = prompt("저장할 파일명을 입력하세요", "memorial-image");
    if (!inputName) return;

    a.download = `${inputName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const displayImage = badgedImage || generatedImage;

  return (
    <Row>
      <Column>
        <Row $justify={"end"} style={{ marginBottom: "3.38rem" }}>
          <CancelProcessButton
            title="작성 그만두기"
            onClick={handleCancelProcess}
          />
        </Row>

        <Row $gap={"2.8rem"} style={{ marginBottom: "13rem" }}>
          <GeneratedImg src={displayImage} alt="생성된 이미지" />
          <Column style={{ width: "24.5rem" }} $justify={"space-between"}>
            <InformText>{`요청하신 사항에 맞추어 \n이미지를 생성했어요`}</InformText>
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
    </Row>
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
