import React from "react";
import styled from "styled-components";
import IconDelete from "../../../assets/icon-delete.svg";
import { color, typo } from "../../../styles/tokens";
import { Row } from "../../../styles/flex";

export default function CancelProcessButton() {
  return (
    <Row $justify={"end"}>
      <Wrapper>
        <img src={IconDelete} />
        <CancleText> 작성취소하기</CancleText>
      </Wrapper>
    </Row>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1.25rem 0.5rem 1rem;
  align-items: center;
  gap: 0.125rem;
  margin-bottom: 3.25rem;
`;

const CancleText = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
`;
