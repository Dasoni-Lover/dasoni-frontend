// src/pages/OpenMemorialHallPage.jsx
import React, { useState } from "react";
import { Column, Row } from "../styles/flex";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import CancelProcessButton from "../components/CancelProcessButton";
import OpenMemorialHallForm from "../features/OpenMemorialHall/components/OpenMemorialHallForm";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { createOtherHall } from "../api/other-hall";
import { getPresignedUrlForImage, uploadFileToS3 } from "../api/files"; // ✅ 공용 presigned 유틸

export default function OpenMemorialHallPage() {
  const [step, setStep] = useState(1);
  const MAX_STEP = 5;

  const [isStepValid, setIsStepValid] = useState(false);
  const isLastStep = step === MAX_STEP;

  const [isCompleted, setIsCompleted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // ✅ 모든 단계의 값을 한 번에 들고 있을 formData
  const [formData, setFormData] = useState({
    name: "",
    birthDate: null,
    deathDate: null,
    profileUrl: "", // 추후 필요하면 사용
    profileFile: null, // ✅ 프로필 사진 File 객체
    place: "",
    phone: "",
    docsFile: null, // 사망확인서 파일
    relation: "",
    natures: [],
    review: "",
    secret: null,
  });

  const [createdHallId, setCreatedHallId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nav = useNavigate();

  const formatDateDot = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`; // 예: 1930.01.02
  };

  const normalizeRelation = (relationLabel) => {
    if (!relationLabel) return "";

    // 화면에 보이는 텍스트에서 어미 제거 ("가족이에요" -> "가족")
    const base = relationLabel.replace("이에요", "").replace("예요", "");

    switch (base) {
      case "가족":
      case "연인":
      case "친구":
        return base; // "가족", "연인", "친구" 중 하나를 반환
      default:
        return base;
    }
  };

  const handleNext = async () => {
    if (!isStepValid || isSubmitting) return;

    if (step < MAX_STEP) {
      setStep(step + 1);
    } else {
      try {
        setIsSubmitting(true);

        let docsUrl = "";
        let profileUrl = "";

        // 1) 사망확인서 파일 S3 업로드
        if (formData.docsFile) {
          const { uploadUrl, fileUrl, contentType } =
            await getPresignedUrlForImage(formData.docsFile);

          await uploadFileToS3(uploadUrl, formData.docsFile, contentType);
          docsUrl = fileUrl;
        }

        // 2) 프로필 사진 파일 S3 업로드
        if (formData.profileFile) {
          const { uploadUrl, fileUrl, contentType } =
            await getPresignedUrlForImage(formData.profileFile);

          await uploadFileToS3(uploadUrl, formData.profileFile, contentType);
          profileUrl = fileUrl;
        }

        const payload = {
          name: formData.name,
          relation: normalizeRelation(formData.relation),
          birthday: formatDateDot(formData.birthDate), // "YYYY.MM.DD" 그대로 사용
          deadday: formatDateDot(formData.deathDate),
          natures: formData.natures || [],
          review: formData.review || "",
          profile: profileUrl,
          place: formData.place || "",
          phone: formData.phone || "",
          docs: docsUrl,
          secret:
            typeof formData.secret === "boolean" ? formData.secret : false,
        };

        console.log("🔍 create payload", payload);

        const res = await createOtherHall(payload);
        const hallId = res?.hallId;

        if (hallId) {
          setCreatedHallId(hallId);
          localStorage.setItem("currentHallId", String(hallId));
        }

        setIsCompleted(true);
      } catch (e) {
        console.error("추모관 개설 API 실패:", e);
        if (e.response) {
          console.error("status:", e.response.status);
          console.error("response.data:", e.response.data);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
      setIsCanceled(true);
      return;
    }
    setStep(step - 1);
  };

  const handleCancelProcess = () => {
    setIsCanceled(true);
  };

  const goHome = () => {
    nav("/home");
  };

  const goHall = () => {
    if (!createdHallId) {
      nav("/home");
      return;
    }

    nav("/memorial", {
      state: { hallId: createdHallId },
    });
  };

  return (
    <div style={{ width: "74rem" }}>
      <BarWrapper>
        <Column>
          <Title>추모관 개설</Title>
          <Row $justify={"space-between"}>
            <Subtitle>
              {`추모관 개설을 위한 정보를 입력해 주세요.\n추모관에 입장한 사람들이 볼 수 있어요`}
            </Subtitle>
            <CancelProcessButton
              title={"개설 그만두기"}
              onClick={handleCancelProcess}
            />
          </Row>
        </Column>
      </BarWrapper>

      <Row $justify={"space-between"}>
        {/* ✅ 폼에서 현재 단계의 유효 여부 + formData 제어 */}
        <OpenMemorialHallForm
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
            active={isStepValid && !isSubmitting}
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

      {/*  완료 클릭 시 */}
      <ConfirmModal
        isOpen={isCompleted}
        title="추모관 개설이 완료 되었어요"
        description="이곳에서 소중한 추억을 함께 나눠주세요"
        confirmText="개설한 추모관 가기"
        cancelText="홈으로"
        onCancel={goHome}
        onConfirm={goHall} // ✅ 개설한 추모관으로 이동
      />

      {/*  그만두기 클릭 시 */}
      <ConfirmModal
        isOpen={isCanceled}
        title="추모관 개설을 그만둘까요?"
        confirmText="그만두기"
        cancelText="취소"
        onConfirm={goHome}
        onCancel={() => {
          setIsCanceled(false);
        }}
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

  @media (max-width: 1200px) {
    justify-content: flex-start;
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
