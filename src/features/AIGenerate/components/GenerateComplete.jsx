import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { Column, Row } from "../../../styles/flex";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CancelProcessButton from "../../../components/CancelProcessButton";
import ConfirmModal from "../../../components/ConfirmModal";

export default function GenerateComplete({ setIsGenerated, generatedImage }) {
  const nav = useNavigate();

  const goGenerate = () => setIsGenerated(false);

  const goWritePost = () => {
    nav("/write", {
      state: { generatedImage }, // ✅ 생성된 이미지를 state로 전달
    });
  };

  const [isCanceled, setIsCanceled] = useState(false);
  const handleCancelProcess = () => setIsCanceled(true);
  const goHome = () => nav("/home");

  // 생성되 이미지 저장 핸들러
  const handleDownload = () => {
    if (!generatedImage) return;

    const a = document.createElement("a");
    a.href = generatedImage;

    // 유저한테 파일명 먼저 물어보기
    const inputName = prompt("저장할 파일명을 입력하세요", "memorial-image");
    if (!inputName) return;

    a.download = `${inputName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
          <GeneratedImg src={generatedImage} alt="생성된 이미지" />
          <Column style={{ width: "24.5rem" }} $justify={"space-between"}>
            <InformText>{`요청하신 사항에 맞추어 \n이미지를 생성했어요`}</InformText>
            <Column $gap={"1.25rem"}>
              <Button
                size="L"
                color="main"
                text="이 이미지로 게시물 작성하기"
                onClick={goWritePost} // ✅ 게시물 작성 페이지로 이동
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
