// src/features/Letters/pages/SetTheDeadPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

import SideCategoryBox from "../components/SideCategoryBox";
import BarNavigate from "../../../components/BarNavigate";
import Button from "../../../components/Button";
import CancelProcessButton from "../../../components/CancelProcessButton";
import { Row, Column } from "../../../styles/flex";

import { getHallInfo } from "../../../api/memorial";
import SetTheDeadForm from "../components/SetTheDeadForm";
import ConfirmModal from "../../../components/ConfirmModal";

export default function SetTheDeadPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [hallName, setHallName] = useState("");
  const [step, setStep] = useState(1);
  const MAX_STEP = 6;

  const [isStepValid, setIsStepValid] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // 전체 폼 데이터 (필요하면 나중에 API payload로 사용)
  const [formData, setFormData] = useState({
    relation: "",
    nickname: "",
    frequentWords: "",
    tone: "", // "존댓말" | "반말"
    about: "",
    voiceFile: null,
  });

  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId) return;
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  const isLastStep = step === MAX_STEP;

  const handleNext = () => {
    if (!isStepValid) return;

    if (step < MAX_STEP) {
      setStep((prev) => prev + 1);
      return;
    }

    // ✅ TODO: 마지막 단계(완료)에서 저장 API 연동
    console.log("🔍 최종 고인 정보 formData:", formData);
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
      // 첫 단계에서 '취소' 클릭 → 편지 리스트로 이동 (또는 홈)
      navigate("/home");
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleCancelProcess = () => {
    setIsCanceled(true);
  };

  return (
    <Container>
      {/* 왼쪽 사이드 카테고리 */}
      <SideCategoryBox hallId={hallId} page={page} />

      {/* 오른쪽 메인 영역 */}
      <MainWrapper>
        <NavWrapper>
          <BarNavigate paths={["홈", hallTitle, "고인 정보 설정"]} />
          <Row
            $justify={"space-between"}
            $align={"center"}
            style={{ marginTop: "4.5rem" }}
          >
            <Title>고인 정보 설정</Title>
            <CancelProcessButton
              title="작성 그만두기"
              onClick={handleCancelProcess}
            />
          </Row>
        </NavWrapper>

        {/* 본문: 폼 + 버튼 영역 */}
        <Row $justify={"space-between"} $align={"flex-start"}>
          <SetTheDeadForm
            step={step}
            onStepValidChange={setIsStepValid}
            formData={formData}
            setFormData={setFormData}
          />

          <Column $gap={"1rem"}>
            <Button
              size="M"
              width="14rem"
              text={isLastStep ? "완료" : "다음"}
              onClick={handleNext}
              active={isStepValid}
            />
            {step !== 1 && (
              <Button
                size="M"
                width="14rem"
                color="white"
                text="뒤로"
                onClick={handlePrevOrCancel}
              />
            )}
          </Column>
        </Row>
      </MainWrapper>
      {/*  그만두기 클릭 시 */}
      <ConfirmModal
        isOpen={isCanceled}
        title="작성을 그만둘까요?"
        description="작성한 내용은 저장되지 않고 사라져요"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm=""
        onCancel={() => {
          setIsCanceled(false);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.81rem;
  width: 73.625rem;
`;

const MainWrapper = styled.div`
  flex: 1;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.69rem;
`;

// 왼쪽 상단에 Title
const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.100")};
`;
