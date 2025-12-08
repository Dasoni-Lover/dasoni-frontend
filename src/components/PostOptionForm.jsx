// src/components/PostOptionForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import IconEssential from "../assets/icon-essential-eclipse.svg";
import IconRadioBlank from "../assets/icon-radio-blank.svg";
import IconRadioFilled from "../assets/icon-radio-filled.svg";

import { color, typo } from "../styles/tokens";
import { Column, Row } from "../styles/flex";
import Button from "./Button";
import DatePicker from "./DatePicker";

import { uploadPhotoPost } from "../api/memorial-album";
import { getPresignedUrlForImage, uploadFileToS3 } from "../api/files";
import { updatePhoto } from "../api/memorial"; // ✨ 수정 API 추가

export default function PostOptionForm({
  content,
  hallId,
  isEdit = false, // ✨ 수정 여부
  photoId, // ✨ 수정 대상 사진 ID
  initialDate = null,
  initialScope = "public",
  photoFile,
  isAI = false,
  hideScope = false, // ✅ 추가
}) {
  const [scope, setScope] = useState(initialScope);
  const [date, setDate] = useState(initialDate);
  const nav = useNavigate();

  const formatDateDot = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleSubmit = async () => {
    try {
      // 글 내용은 선택사항으로 변경
      const safeContent = content?.trim() || "";

      if (!date) {
        alert("사진 속 날짜를 선택해 주세요.");
        return;
      }

      const occurredAt = formatDateDot(date);
      const isPrivateValue = scope === "private" ? 1 : 0; // ✨ 수정 API 명세에 맞게 숫자

      // ✨ [수정 모드] : 사진 업로드 없이 patch
      if (isEdit) {
        if (!hallId || !photoId) {
          alert("수정 대상 정보를 찾을 수 없습니다.");
          return;
        }

        const payload = {
          content: safeContent,
          occurredAt,
          isPrivate: isPrivateValue,
        };

        console.log(
          "📝 updatePhoto payload:",
          payload,
          "hallId:",
          hallId,
          "photoId:",
          photoId
        );
        await updatePhoto(hallId, photoId, payload);

        alert("게시물이 수정되었습니다.");
        nav("/memorial", {
          state: { hallId },
          replace: true, // (선택) 뒤로가기 시 글작성 화면으로 안 돌아오게
        });
        return;
      }

      // ✨ [새 글 작성] : 기존 로직 그대로
      const file = photoFile;
      if (!file) {
        alert("사진을 업로드해주세요.");
        return;
      }

      // 1) presigned URL 발급
      const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
        file
      );

      // 2) S3에 실제 업로드
      await uploadFileToS3(uploadUrl, file, contentType);

      // 3) 업로드된 파일 URL로 게시글 등록
      const payload = {
        url: fileUrl,
        content: safeContent,
        occurredAt,
        isPrivate: scope === "private",
        isAI: isAI,
        hallId,
      };

      const res = await uploadPhotoPost(payload);
      console.log("게시글 업로드 완료:", res);
      alert("게시물이 등록되었습니다.");
      nav("/memorial", {
        state: { hallId },
        replace: true, // (선택)
      });
    } catch (error) {
      console.error("게시글 저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <Column
      $justify={"space-between"}
      style={hideScope ? { height: "18.5rem" } : undefined}
    >
      <Column>
        <Column $gap={"0.75rem"}>
          <Row>
            <Label>사진 속 날짜</Label>
            <img src={IconEssential} alt="필수" />
          </Row>

          <DatePicker
            selected={date}
            onChange={setDate}
            placeholder="YYYY/M/D"
            maxDate={new Date()} 
            direction="row-reverse" 
          />
        </Column>

        {/* 공유 범위 */}
        {/* ✅ 공유 범위: 나의 추모관 글쓰기에서는 숨김 */}
        {!hideScope && (
          <Column>
            <Label style={{ marginTop: "2.75rem" }}>공유 범위</Label>

            <RadioCard role="radiogroup" aria-label="공유 범위">
              {/* 공개 */}
              <RadioOption
                role="radio"
                tabIndex={0}
                aria-checked={scope === "public"}
                onClick={() => setScope("public")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setScope("public");
                  }
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    setScope("private");
                  }
                }}
              >
                <RadioIcon
                  src={scope === "public" ? IconRadioFilled : IconRadioBlank}
                  alt={scope === "public" ? "선택됨" : "선택 안 됨"}
                  aria-hidden
                />
                <Column $gap={"0.25rem"}>
                  <RadioMainText>공유앨범</RadioMainText>
                  <RadioSubText>
                    추모관에 입장한 사람들이 게시물을 볼 수 있어요
                  </RadioSubText>
                </Column>
              </RadioOption>

              {/* 비공개 */}
              <RadioOption
                role="radio"
                tabIndex={0}
                aria-checked={scope === "private"}
                onClick={() => setScope("private")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setScope("private");
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    setScope("public");
                  }
                }}
              >
                <RadioIcon
                  src={scope === "private" ? IconRadioFilled : IconRadioBlank}
                  alt={scope === "private" ? "선택됨" : "선택 안 됨"}
                  aria-hidden
                />
                <Column $gap={"0.25rem"}>
                  <RadioMainText>나와의 앨범</RadioMainText>
                  <RadioSubText>나만 게시물을 볼 수 있어요</RadioSubText>
                </Column>
              </RadioOption>
            </RadioCard>
          </Column>
        )}
      </Column>

      <Column $gap={"1.25rem"}>
        <Button
          text={isEdit ? "수정 완료" : "작성하기"}
          onClick={handleSubmit}
        />
        <Button text={"취소"} color={"white"} onClick={() => nav(-1)} />
      </Column>
    </Column>
  );
}

const Label = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

// 이하 스타일 동일
const RadioCard = styled.div`
  background: ${color("black.05")};
  border-radius: 10px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RadioOption = styled.label`
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
`;

const RadioIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const RadioMainText = styled.div`
  ${typo("bodym")};
  color: ${color("black.80")};
`;

const RadioSubText = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
