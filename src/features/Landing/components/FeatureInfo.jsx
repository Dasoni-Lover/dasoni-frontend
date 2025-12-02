import React from "react";
import { color, typo } from "../../../styles/tokens";
import styled from "styled-components";

export default function FeatureInfo({
  highlight = false,
  title,
  main,
  sub,
  align,
}) {
  return (
    <Wrapper $align={align}>
      <Title $highlight={highlight}>{title}</Title>
      <MainText>{main}</MainText>
      <SubText $align={align}>{sub}</SubText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === "left" ? "flex-start" : "center")};
  white-space: pre-line;
  margin-top: 4.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.25rem 0.75rem;
  border-bottom: ${({ $highlight }) =>
    $highlight ? "none" : "4px solid #FFBC67"};

  background: ${({ $highlight }) => ($highlight ? color("main") : "#fff4e6")};

  color: ${({ $highlight }) => ($highlight ? "#fff" : color("main"))};

  ${typo("h2")};
  margin-bottom: 1.5rem;
`;
const MainText = styled.div`
  color: var(--80, #0e0e0e);
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 145%; /* 3.625rem */
`;

const SubText = styled.div`
  color: var(--50, #7a7a7a);
  text-align: ${({ $align }) => ($align === "left" ? "left" : "center")};
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 145%; /* 2.175rem */
`;
