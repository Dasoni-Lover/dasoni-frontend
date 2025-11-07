// src/pages/WritePostPage.jsx
import React from "react";
import styled from "styled-components";
import BarNavigate from "../components/BarNavigate";
import WritePostForm from "../features/WritePost/components/WritePostForm";
import { useLocation } from "react-router-dom";

export default function WritePostPage() {
  const location = useLocation();
  const { hallId, isEdit, photoId, postData } = location.state || {};

  const initialImageUrl = postData?.imageUrl || ""; // ✨ 기존 사진 URL

  return (
    <div>
      <BarWrapper>
        <BarNavigate
          paths={[
            "홈",
            `故 ${hallId}의 추모관`,
            isEdit ? "게시글 수정" : "게시물 작성",
          ]}
          title={isEdit ? "게시글 수정" : "게시물 작성"}
        />
      </BarWrapper>

      <WritePostForm
        hallId={hallId}
        isEdit={isEdit}
        photoId={photoId}
        initialData={postData}
        initialImageUrl={initialImageUrl} // ✨ 여기 추가
      />
    </div>
  );
}

const BarWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  display: flex;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;
