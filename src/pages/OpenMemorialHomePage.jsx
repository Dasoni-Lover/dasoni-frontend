import React from "react";
import { Column, Row } from "../styles/flex";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import CancelProcessButton from "../components/CancelProcessButton";
import OpenMemorialHomeForm from "../features/OpenMemorialHome/components/OpenMemorialHomeForm";
import Button from "../components/Button";

export default function OpenMemorialHomePage() {
  return (
    <div>
      <BarWrapper>
        <Column>
          <Title>추모관 개설</Title>
          <Row $justify={"space-between"}>
            <Subtitle>
              {`추모관 개설을 위한 정보를 입력해 주세요.\n 추모관에 입장한 사람들이 볼 수 있어요`}
            </Subtitle>
            <CancelProcessButton />
          </Row>
        </Column>
      </BarWrapper>
      <Row $justify={"space-between"}>
        <OpenMemorialHomeForm />
        <Column $gap={"1rem"}>
          <Button size="M" width="14rem" text="다음" />
          <Button size="M" width="14rem" color="white" text="취소" />
        </Column>
      </Row>
    </div>
  );
}

const BarWrapper = styled.div`
  margin-top: 4.38rem;
  margin-bottom: 52px;
  display: flex;

  > * {
    width: 1096px;
  }

  @media (max-width: 1200px) {
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  ${typo("h1")};
  color: black;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
  white-space: pre-line;
`;
