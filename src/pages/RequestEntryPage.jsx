// src/pages/RequestEntryPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Column, Row } from "../styles/flex";
import CancelProcessButton from "../components/CancelProcessButton";
import RequestEntryForm from "../features/RequestEntry/components/RequestEntryForm";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { joinHall } from "../api/hall-entry";

export default function RequestEntryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const hall = location.state?.hall;

  const [step, setStep] = useState(1);
  const MAX_STEP = 3;

  const [isStepValid, setIsStepValid] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // form 전체 데이터
  const [formData, setFormData] = useState({
    relation: "",
    detail: "",
    natures: [], // 배열 형태로 유지
    review: "",
  });

  const handleNext = async () => {
    if (!isStepValid) return;

    if (step < MAX_STEP) {
      setStep(step + 1);
      return;
    }

    // 마지막 스텝 → API 요청
    try {
      if (!hall || !hall.hallId) {
        console.error("hall 정보가 없습니다. hall:", hall);
        return;
      }

      const relationMap = {
        "친구예요": "친구",
        "가족이에요": "가족",
        "지인이에요": "지인",
        "동료예요": "동료"
      };


      const payload = {
        relation: relationMap[formData.relation] || formData.relation,
        detail: formData.detail,
        natures: formData.natures, // ⭐ 배열 그대로 보냄 (백엔드 명세)
        review: formData.review,
      };

      // natures 개수 체크 (옵션)
      if (payload.natures.length !== 3) {
        console.warn(
          "natures는 정확히 3개여야 합니다. 현재:",
          payload.natures
        );
        // 필요하면 아래처럼 막을 수 있음
        // return alert("고인을 표현하는 단어 3개를 선택해 주세요.");
      }

      console.log("입장 요청 payload:", payload);

      await joinHall(hall.hallId, payload);

      setIsCompleted(true);
    } catch (e) {
      console.error("입장 요청 실패:", e);
      console.log("입장 요청 실패 - 응답 데이터:", e.response?.data);
    }
  };

  const handlePrevOrCancel = () => {
    if (step === 1) setIsCanceled(true);
    else setStep(step - 1);
  };

  return (
    <div>
      <BarWrapper>
        <Column>
          <Title>입장 요청 보내기</Title>
          <Row $justify={"space-between"}>
            <Subtitle>
              {`입장 요청을 위한 정보를 입력해 주세요.\n추모관 관리자가 볼 수 있는 정보예요.`}
            </Subtitle>
            <CancelProcessButton onClick={() => setIsCanceled(true)} />
          </Row>

          {hall && <HallInfo>현재 선택된 추모관: {hall.name}</HallInfo>}
        </Column>
      </BarWrapper>

      <Row $justify={"space-between"}>
        <RequestEntryForm
          step={step}
          onStepValidChange={setIsStepValid}
          formData={formData}
          onFormDataChange={(data) =>
            setFormData((prev) => ({ ...prev, ...data }))
          }
        />

        <Column $gap={"1rem"}>
          <Button
            size="M"
            width="14rem"
            text={step === MAX_STEP ? "완료" : "다음"}
            onClick={handleNext}
            active={isStepValid}
          />

          <Button
            size="M"
            width="14rem"
            color="white"
            text={step === 1 ? "취소" : "뒤로"}
            onClick={handlePrevOrCancel}
          />
        </Column>
      </Row>

      {/* 완료 모달 */}
      <ConfirmModal
        isOpen={isCompleted}
        title="성공적으로 입장 요청을 보냈어요"
        description="관리자가 요청을 승인하면 알림을 보내드릴게요"
        confirmText="홈으로"
        onConfirm={() => navigate("/home")}
      />

      {/* 취소 모달 */}
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 입장요청을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm={() => navigate("/home")}
        onCancel={() => setIsCanceled(false)}
      />
    </div>
  );
}

const BarWrapper = styled.div`
  margin-top: 4.38rem;
  margin-bottom: 52px;
  display: flex;
  > * {
    width: 1096px;
  }
`;

const Title = styled.div`
  ${typo("h1")};
  color: black;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
  white-space: pre-line;
`;

const HallInfo = styled.div`
  ${typo("h4")};
  color: ${color("black.70")};
  margin-top: 1rem;
`;
