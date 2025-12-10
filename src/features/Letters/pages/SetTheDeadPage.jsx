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
import { createLetterSettings } from "../../../api/letters";
import { uploadVoiceFile } from "../../../api/voice";
import SetTheDeadForm from "../components/SetTheDeadForm";
import ConfirmModal from "../../../components/ConfirmModal";

export default function SetTheDeadPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page; // "admin" | "follower" | "me" (실제 호출은 admin/follower)

  // ✅ 역할 플래그 (관리자 여부)
  const isManager = page === "admin";

  const [hallName, setHallName] = useState("");
  const [step, setStep] = useState(1);
  const MAX_STEP = isManager ? 6 : 5; // ✅ 관리자 6단계, 방문자 5단계

  const [isStepValid, setIsStepValid] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 전체 폼 데이터
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

  // ✅ 다음 버튼
  const handleNext = async () => {
    if (!isStepValid || isSubmitting) return;

    // 마지막 단계가 아니면 단순 step 증가
    if (step < MAX_STEP) {
      setStep((prev) => prev + 1);
      return;
    }

    // ✅ 마지막 단계 → API 호출
    if (!hallId) {
      alert("추모관 정보가 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1) 관리자 + 음성 파일 있을 때만 S3 업로드
      let voiceUrl = null;
      if (isManager && formData.voiceFile) {
        voiceUrl = await uploadVoiceFile(hallId, formData.voiceFile);
      }

      // 2) payload 매핑
      const payload = {
        detail: formData.relation, // 관계(사랑하는 사이 등)
        explain: formData.about, // 고인에 대한 설명
        isPolite: formData.tone === "존댓말", // true: 존댓말, false: 반말
        calledName: formData.nickname, // 애칭/호칭
        speakHabit: formData.frequentWords, // 자주 쓰던 말
        voiceUrl: voiceUrl, // 관리자면 url, 아니면 null
      };

      await createLetterSettings(hallId, payload);

      // 3) 완료 후 이동 (원하는 경로로 변경 가능)
      navigate("/sent-letterbox", {
        state: { hallId, page, activeMenu: "sent" },
      });
    } catch (e) {
      console.error("고인 정보 설정 저장 실패:", e);
      alert("고인 정보 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
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
            maxStep={MAX_STEP}
            isManager={isManager}
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
              active={isStepValid && !isSubmitting}
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
        onConfirm={() => navigate("/home")}
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

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.100")};
`;
