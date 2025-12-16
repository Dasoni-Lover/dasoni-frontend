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
import {
  createLetterSettings,
  getLetterSettings,
  updateLetterSettings,
} from "../../../api/letters";
import IconCheck from "../../../assets/icon-check.svg";
import { uploadVoiceFile } from "../../../api/voice";
import SetTheDeadForm from "../components/SetTheDeadForm";
import ConfirmModal from "../../../components/ConfirmModal";

import EditTheDeadForm from "../components/EditTheDeadForm";

export default function SetTheDeadPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page; // "admin" | "follower" | "me"

  const isManager = page === "admin";
  const [hallName, setHallName] = useState("");
  const [step, setStep] = useState(1);
  const MAX_STEP = isManager ? 6 : 5;

  const [isStepValid, setIsStepValid] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // ✅ 기존 폼 데이터
  const [formData, setFormData] = useState({
    relation: "",
    nickname: "",
    frequentWords: "",
    tone: "",
    about: "",
    voiceFile: null,
  });

  // ✅ 고인정보 설정 여부 확인용 상태
  const [existingSettings, setExistingSettings] = useState(null);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  const isEditing = isSettingsLoaded && !!existingSettings;

  // ✅ 공통 이동 함수: 항상 hallId / page / activeMenu 포함해서 이동
  const goSentLetterBox = () => {
    navigate("/sent-letterbox", {
      state: { hallId, page, activeMenu: "sent" },
    });
  };

  // 추모관 이름
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

  // ✅ 고인정보 설정 조회
  useEffect(() => {
    const fetchSettings = async () => {
      if (!hallId) return;
      try {
        const data = await getLetterSettings(hallId);

        // ✅ "등록된 설정인지" 판단 (역할별 분기)
        const hasAnyValue =
          data &&
          (data.detail != null ||
            data.explanation != null ||
            data.isPolite != null ||
            data.calledName != null ||
            data.speakHabit != null ||
            (isManager ? data.voiceUrl != null : false));

        if (hasAnyValue) {
          setExistingSettings(data);

          setFormData((prev) => ({
            ...prev,
            relation: data.detail || "",
            about: data.explanation || "",
            tone:
              data.isPolite == null ? "" : data.isPolite ? "존댓말" : "반말",
            nickname: data.calledName || "",
            frequentWords: data.speakHabit || "",
            voiceFile: null,
          }));
        } else {
          // ✅ 방문자: voiceUrl만 있는 케이스도 여기로 떨어짐 (SetTheDeadForm)
          setExistingSettings(null);
          setFormData({
            relation: "",
            nickname: "",
            frequentWords: "",
            tone: "",
            about: "",
            voiceFile: null,
          });
        }
      } catch (err) {
        console.error("고인 정보 설정 조회 실패:", err);
      } finally {
        setIsSettingsLoaded(true);
      }
    };

    fetchSettings();
  }, [hallId, isManager]);

  const submitSettings = async () => {
    if (!hallId) {
      alert("추모관 정보가 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 🔹 역할별 voiceUrl 처리
      let voiceUrl = null;

      if (isManager) {
        // 관리자라면: 새로 업로드한 파일이 있으면 업로드, 없으면 기존 값 유지
        if (formData.voiceFile) {
          voiceUrl = await uploadVoiceFile(hallId, formData.voiceFile);
        } else {
          voiceUrl = existingSettings?.voiceUrl || null;
        }
      } else {
        // 방문자/친구(me, follower)는 voiceUrl을 보내지 않거나 null로 보냄
        voiceUrl = null;
      }

      const payload = {
        detail: formData.relation,
        explanation: formData.about,
        isPolite: formData.tone === "존댓말",
        calledName: formData.nickname,
        speakHabit: formData.frequentWords,
        voiceUrl: voiceUrl,
      };

      // 🔹 최초 생성 vs 수정 분기
      if (isEditing) {
        await updateLetterSettings(hallId, payload);
      } else {
        await createLetterSettings(hallId, payload);
      }

      // 🔹 저장 완료 모달 띄우기
      setIsConfirmOpen(true);
    } catch (e) {
      console.error("고인 정보 설정 저장 실패:", e);
      alert("고인 정보 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";
  const isLastStep = step === MAX_STEP;

  const handleNext = async () => {
    if (!isStepValid || isSubmitting) return;

    if (step < MAX_STEP) {
      setStep((prev) => prev + 1);
      return;
    }

    // 마지막 단계 → 저장
    await submitSettings();
  };

  const handlePrevOrCancel = () => {
    if (step === 1) {
      // ⬅️ 첫 단계에서 "뒤로" → 현재 추모관 정보·역할을 들고 보낸 편지함으로
      goSentLetterBox();
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleCancelProcess = () => {
    setIsCanceled(true);
  };

  return (
    <Background>
      <Container>
        <SideCategoryBox hallId={hallId} page={page} />

        <MainWrapper>
          <NavWrapper>
            <BarNavigate paths={["홈", hallTitle, "고인 정보 설정"]} />

            {/* 새로 작성일 때만 상단 "작성 그만두기" 버튼 노출 */}
            {!isEditing && (
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
            )}
          </NavWrapper>

          {/* ✅ 이미 설정된 경우: 수정 폼 */}
          {isEditing ? (
            <Row $justify={"space-between"} $align={"flex-start"}>
              <EditTheDeadForm
                formData={formData}
                setFormData={setFormData}
                isManager={isManager}
                voiceUrl={existingSettings?.voiceUrl}
              />

              <Column $gap={"1rem"}>
                <Button
                  size="M"
                  width="14rem"
                  text="저장하기"
                  onClick={submitSettings}
                  active={!isSubmitting}
                />
                <Button
                  size="M"
                  width="14rem"
                  color="white"
                  text="취소"
                  onClick={goSentLetterBox}
                />
              </Column>
            </Row>
          ) : (
            // ✅ 설정이 없을 때만 단계형 폼 + 버튼
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
          )}
        </MainWrapper>

        {/* 작성 그만두기 모달 */}
        <ConfirmModal
          isOpen={isCanceled}
          title="작성을 그만둘까요?"
          description="작성한 내용은 저장되지 않고 사라져요"
          confirmText="그만두기"
          cancelText="취소"
          onConfirm={goSentLetterBox}
          onCancel={() => {
            setIsCanceled(false);
          }}
        />

        {/* ✅ 저장 완료 모달 (생성 / 수정에 따라 타이틀 분기) */}
        <ConfirmModal
          isOpen={isConfirmOpen}
          title={
            isEditing
              ? "변경사항을 성공적으로 저장했어요"
              : "고인정보등록을 완료했어요"
          }
          image={IconCheck}
          confirmText="확인"
          onConfirm={() => {
            setIsConfirmOpen(false);
            goSentLetterBox();
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </Container>
    </Background>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    90deg,
    #fff1f2 9.13%,
    #fff6eb 76.44%,
    #ffefe5 100%
  );
`;

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

/* 안 쓰고 있지만 혹시 몰라 남겨둔 스타일 */
const AlreadySetBox = styled.div`
  padding: 3.25rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
`;

const AlreadySetText = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;
