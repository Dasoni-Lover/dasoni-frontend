// src/features/Letters/components/EditTheDeadForm.jsx
import React, { useRef } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import VoiceRecord from "../../MemorialHall/components/VoiceRecord";
import { InputField } from "../../../components/InputField";
import RedDot from "../../../assets/icon-essential-eclipse.svg";

export default function EditTheDeadForm({
  formData,
  setFormData,
  isManager = true, // 관리자만 음성 파일 섹션 보이게 하고 싶으면 이 값으로 제어
  voiceUrl,
}) {
  const fileInputRef = useRef(null);

  const relation = formData?.relation || "";
  const about = formData?.about || "";
  const tone = formData?.tone || "";
  const nickname = formData?.nickname || "";
  const frequentWords = formData?.frequentWords || "";
  const voiceFile = formData?.voiceFile || null;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectTone = (selected) => {
    setFormData((prev) => ({ ...prev, tone: selected }));
  };

  // 파일 업로드
  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ 같은 파일 재선택해도 onChange 타게
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFormData((prev) => ({ ...prev, voiceFile: selected }));
  };

  const handleDeleteVoice = () => {
    setFormData((prev) => ({ ...prev, voiceFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card>
      {/* 고인과의 관계 */}
      <FormRow>
        <LabelCell>
          <Label>
            고인과의 관계
            <RequiredDot src={RedDot} />
          </Label>
        </LabelCell>
        <FieldCell>
          <InputField
            value={relation}
            width="100%"
            onChange={handleChange("relation")}
            placeholder="예) 엄마, 할아버지, 대학교 친구"
          />
        </FieldCell>
      </FormRow>

      {/* 고인의 특징 */}
      <FormRow>
        <LabelCell>
          <Label>
            고인의 특징
            <RequiredDot src={RedDot} />
          </Label>
        </LabelCell>
        <FieldCell>
          <Textarea
            value={about}
            onChange={handleChange("about")}
            placeholder={`예) 농담을 자주 하고 분위기를 밝게 만드는 스타일이었어요\n예) 항상 웃으면서 챙겨주던 따뜻한 사람이었어요`}
          />
        </FieldCell>
      </FormRow>

      {/* 평소 대화 말투 */}
      <FormRow>
        <LabelCell>
          <Label>
            고인의 평소 대화 말투
            <RequiredDot src={RedDot} />
          </Label>
        </LabelCell>
        <FieldCell>
          <ToneButtonRow>
            <ToneButton
              type="button"
              $active={tone === "존댓말"}
              onClick={() => handleSelectTone("존댓말")}
            >
              존댓말
            </ToneButton>
            <ToneButton
              type="button"
              $active={tone === "반말"}
              onClick={() => handleSelectTone("반말")}
            >
              반말
            </ToneButton>
          </ToneButtonRow>
        </FieldCell>
      </FormRow>

      {/* 자주 불러주던 호칭 */}
      <FormRow>
        <LabelCell>
          <Label>
            고인이 자주 불러주던 호칭
            <RequiredDot src={RedDot} />
          </Label>
        </LabelCell>
        <FieldCell>
          <InputField
            value={nickname}
            width="100%"
            onChange={handleChange("nickname")}
            placeholder="예) OO아, 우리 아들, 울 강아지"
          />
        </FieldCell>
      </FormRow>

      {/* 자주 사용하던 말/단어 */}
      <FormRow>
        <LabelCell>
          <Label>
            고인이 자주 사용하던 말이나 단어
            <RequiredDot src={RedDot} />
          </Label>
        </LabelCell>
        <FieldCell>
          <Textarea
            value={frequentWords}
            onChange={handleChange("frequentWords")}
            placeholder="예) 밥은 먹었어?, 위험하니까 일찍 다녀, 사랑해, 괜찮아 다 잘될 거야"
          />
        </FieldCell>
      </FormRow>

      {/* 음성 파일 (관리자일 때만) */}
      {isManager && (
        <FormRow>
          <LabelCell>
            <Label>
              고인 음성 파일
              <RequiredDot src={RedDot} />
            </Label>
          </LabelCell>
          <FieldCell>
            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="audio/mpeg,audio/mp3"
              onChange={handleFileChange}
            />

            {/* 파일도 없고 URL도 없으면 업로드 박스 */}
            {!voiceFile && !voiceUrl && (
              <VoiceUploadBox onClick={openFileDialog}>
                <VoiceUploadText>음성 파일 업로드</VoiceUploadText>
              </VoiceUploadBox>
            )}

            {/* 파일이 있거나, 기존 voiceUrl이 있으면 커스텀 플레이어 */}
            {(voiceFile || voiceUrl) && (
              <VoicePlayerWrapper>
                <VoiceRecord
                  file={voiceFile || null}
                  url={!voiceFile ? voiceUrl : undefined}
                  onReupload={openFileDialog}
                  onDelete={handleDeleteVoice}
                  showTime={false}
                  showDelete={false}
                />
              </VoicePlayerWrapper>
            )}
          </FieldCell>
        </FormRow>
      )}
    </Card>
  );
}

/* ================= styled ================= */

const Card = styled.div`
  width: 53.9375rem;
  padding: 3.25rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 8.2px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 5rem;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 1.75rem;
  gap: 10rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LabelCell = styled.div`
  width: 11rem;
  padding-top: 0.4rem;
`;

const FieldCell = styled.div`
  flex: 1;
`;

const Label = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
`;

const RequiredDot = styled.img`
  width: 1.25rem;
`;

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: 9.5rem;
  min-height: 9.5rem;
  padding: 1rem;
  align-items: flex-start;
  gap: 0.625rem;

  box-sizing: border-box;
  resize: none;
  outline: none;

  border-radius: 0.625rem;
  border: 2px solid var(--5, #e9e9e9);
  background: var(--Lightgrey, #f8f8f8);

  ${typo("h4")};
  color: ${color("black.70")};

  &::placeholder {
    color: ${color("black.10")};
  }
`;

const ToneButtonRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ToneButton = styled.button`
  display: flex;
  width: 100%;
  height: 2.75rem;
  padding: 0.8125rem 1.875rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.3125rem;
  border: 1px solid var(--5, #e9e9e9);

  background: ${({ $active }) => ($active ? color("main") : "#fff")};
  ${typo("h4")};
  color: ${color("black.70")};
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  transition: background 0.15s ease-out, color 0.15s ease-out;
`;

const HiddenInput = styled.input`
  display: none;
`;

const VoiceUploadBox = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.75rem;
  border: 1px dashed #e9e9e9;
  background: #fff8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const VoiceUploadText = styled.div`
  ${typo("bodym")};
  color: ${color("black.40")};
`;

const VoicePlayerWrapper = styled.div``;
