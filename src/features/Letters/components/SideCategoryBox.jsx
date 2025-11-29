import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SideCategoryBoxItem from "./SideCategoryBoxItem";

export default function SideCategoryBox({ hallId, page }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 activeMenu를 페이지 이동 시 전달된 값으로 설정
  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu || "sent"
  );

  // ===========================
  //   보낸 편지함 클릭
  // ===========================
  const handleClickSentLetters = () => {
    setActiveMenu("sent");

    const nextPath = page === "me" ? "/leave-letterbox" : "/sent-letterbox";

    navigate(nextPath, {
      state: { hallId, page, activeMenu: "sent" },
    });
  };

  // ===========================
  //   편지 쓰기 클릭
  // ===========================
  const handleClickWriteLetter = () => {
    setActiveMenu("write");

    const nextPath = page === "me" ? "/leave-letter" : "/sent-letter";

    navigate(nextPath, {
      state: { hallId, page, activeMenu: "write" },
    });
  };

  // ===========================
  //   받은 편지함 클릭 (admin/follower)
  // ===========================
  const handleClickReceivedLetters = () => {
    setActiveMenu("received");

    navigate("/received-letterbox", {
      state: { hallId, page, activeMenu: "received" },
    });
  };

  // ===========================
  //   고인 정보 수정 클릭
  // ===========================
  const handleClickEditInfo = () => {
    setActiveMenu("edit");

    navigate("/edit-hallinfo", {
      state: { hallId, page, activeMenu: "edit" },
    });
  };

  return (
    <Container>
      {/* 보낸 편지함 */}
      <SideCategoryBoxItem
        text="보낸 편지함"
        bgcolor={activeMenu === "sent" ? "#FFF4E6" : undefined}
        border={activeMenu === "sent" ? "1px solid #FFBC67" : undefined}
        onClick={handleClickSentLetters}
      />

      {/* admin / follower만 받은 편지함 노출 */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem
          text="받은 편지함"
          bgcolor={activeMenu === "received" ? "#FFF4E6" : undefined}
          border={activeMenu === "received" ? "1px solid #FFBC67" : undefined}
          onClick={handleClickReceivedLetters}
        />
      )}

      {/* 편지 쓰기 */}
      <SideCategoryBoxItem
        text="편지 쓰기"
        bgcolor={activeMenu === "write" ? "#FFF4E6" : undefined}
        border={activeMenu === "write" ? "1px solid #FFBC67" : undefined}
        onClick={handleClickWriteLetter}
      />

      {/* 고인 정보 수정 */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem
          text="고인 정보 수정"
          bgcolor={activeMenu === "edit" ? "#FFF4E6" : undefined}
          border={activeMenu === "edit" ? "1px solid #FFBC67" : undefined}
          onClick={handleClickEditInfo}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 20.63rem;
  left: 3.75rem;

  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;
