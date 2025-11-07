// src/pages/WritePostPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import BarNavigate from "../components/BarNavigate";
import WritePostForm from "../features/WritePost/components/WritePostForm";
import { getHallInfo } from "../api/memorial"; // ✅ 추모관 정보 API

export default function WritePostPage() {
  const location = useLocation();
  const hallId = location.state?.hallId;

  const [hallName, setHallName] = useState("");

  useEffect(() => {
    const fetchHallName = async () => {
      try {
        const res = await getHallInfo(hallId);
        const name = res?.data?.name || res?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  // ✅ BarNavigate용 문구
  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  return (
    <div>
      <BarWrapper>
        {/* ✅ 실제 추모관 이름 반영 */}
        <BarNavigate
          paths={["홈", hallTitle, "게시물 작성"]}
          title="게시물 작성"
        />
      </BarWrapper>
      <WritePostForm />
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
