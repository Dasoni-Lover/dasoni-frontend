import React from "react";
import styled from "styled-components";
import BarNavigate from "../components/BarNavigate";
import WritePostForm from "../features/WritePost/components/WritePostForm";

export default function WritePostPage() {
  return (
    <div>
      <BarWrapper>
        <BarNavigate title={"게시물 작성"} />
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
