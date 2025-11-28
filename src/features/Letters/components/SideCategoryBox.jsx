import React from "react";
import styled from "styled-components";
import SideCategoryBoxItem from "./SideCategoryBoxItem";

export default function SideCategoryBox({ hallId, page }) {
  return (
    <Container>
      {/* 공통: 보낸 편지함 */}
      <SideCategoryBoxItem
        text="보낸 편지함"
        bgcolor="#FFF4E6"
        border="1px solid #FFBC67"
      />
            {/* page === me 일 때는 숨기기 */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem text="받은 편지함" />
      )}

      <SideCategoryBoxItem text="편지 쓰기" />

      {/* page === me 일 때는 숨기기 */}
      {(page === "admin" || page === "follower") && (
        <SideCategoryBoxItem text="고인 정보 수정" />
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
