import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideCategoryBoxItem from "./SideCategoryBoxItem";

export default function SideCategoryBox({ hallId, page }) {
  const navigate = useNavigate();

  // ===========================
  //   보낸 편지함 클릭
  // ===========================
  const handleClickSentLetters = () => {

    if (page === "me") {
      navigate("/leave-letterbox", {
        state: { hallId, page },
      });
    } else {
      navigate("/sent-letterbox", {
        state: { hallId, page },
      });
    }
  };

  // ===========================
  //   편지 쓰기 클릭
  // ===========================
  const handleClickWriteLetter = () => {

    if (page === "me") {
      navigate("/leave-letter", {
        state: { hallId, page },
      });
    } else {
      navigate("/sent-letter", {
        state: { hallId, page },
      });
    }
  };

  // ===========================
  //   받은 편지함 클릭 (admin/follower)
  // ===========================
  const handleClickReceivedLetters = () => {
    navigate("/received-letterbox", {
      state: { hallId, page },
    });
  };

  // ===========================
  //   고인 정보 수정 클릭
  // ===========================
  const handleClickEditInfo = () => {
    navigate("/edit-hallinfo", {
      state: { hallId, page },
    });
  };

  return (
    <Container>
      {/* 보낸 편지함 */}
      <SideCategoryBoxItem
        text="보낸 편지함"
        bgcolor="#FFF4E6"
        border="1px solid #FFBC67"
        onClick={handleClickSentLetters}
      />

      {/* admin / follower만 받은 편지함 노출 */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem
          text="받은 편지함"
          onClick={handleClickReceivedLetters}
        />
      )}

      {/* 편지 쓰기 */}
      <SideCategoryBoxItem
        text="편지 쓰기"
        onClick={handleClickWriteLetter}
      />

      {/* 고인 정보 수정 (admin/follower만) */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem
          text="고인 정보 수정"
          onClick={handleClickEditInfo}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  margin-top: 14.37rem;
  left: 3.75rem;

  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;
