// src/pages/WritePostPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BarNavigate from "../components/BarNavigate";
import WritePostForm from "../features/WritePost/components/WritePostForm";
import { useLocation } from "react-router-dom";
import { getHallInfo } from "../api/memorial";

export default function WritePostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    hallId,
    isEdit = false,
    photoId,
    postData,
    isAI = false,
    fromMyHall = false,
  } = location.state || {};
  console.log("🔥 WritePostPage 받은 hallId:", hallId);
  console.log("📦 location.state:", location.state);

  const [hallName, setHallName] = useState("");

  // 고인 이름 가져와서 "故 {이름}의 추모관" 표시
  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId || fromMyHall) return; // ✅ 나의 추모관 플로우는 hallName 안 불러도 됨
      try {
        const res = await getHallInfo(hallId);
        const name = res?.data?.name || res?.name || "";
        setHallName(name);
      } catch (e) {
        console.error("추모관 이름 불러오기 실패:", e);
      }
    };
    fetchHallName();
  }, [hallId, fromMyHall]);

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "추모관";
  // ✅ 경로 분기: 나의 추모관 vs 일반 추모관
  const paths = fromMyHall
    ? ["나의 추모관", isEdit ? "게시글 수정" : "게시물 작성"]
    : ["홈", hallTitle, isEdit ? "게시글 수정" : "게시물 작성"];

  const initialImageUrl = postData?.imageUrl || "";

  return (
    <div>
      <BarWrapper>
      <BarNavigate
        paths={paths}
        title="게시물 작성"
        onPathClick={(path) => {
          if (path === "홈") {
            // hallId 유지하면서 홈으로 이동
            navigate("/home", { state: { hallId } });
          }else if (path === hallTitle){
            navigate("/memorial", { state: { hallId } });
          }else if (path === "나의 추모관"){
            navigate("/memorial", { state: { hallId } });
          }
        }}
      />
      </BarWrapper>

      <WritePostForm
        hallId={hallId}
        isEdit={isEdit}
        photoId={photoId}
        initialData={postData} // ✅ content, occurredAt, isPrivate
        initialImageUrl={initialImageUrl} // ✅ 기존 사진 썸네일
        isAI={isAI}
        isMyHallWrite={fromMyHall}
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
