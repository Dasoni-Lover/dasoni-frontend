import React from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";

export const Tag = ({ text = "입장승인", on = true }) => {
  // on/off 상태로 색상 결정
  const colors = on
    ? { bg: "#FFF4E6", border: "#FFCC8C", text: "#EF8F53" } // on
    : { bg: "#DDD", border: "#ACACAC", text: "#ACACAC" }; // off

  return <Wrapper $bg={colors.bg} $border={colors.border} $color={colors.text}>{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid ${({ $border }) => $border};
  background: ${({ $bg }) => $bg};
  ${typo("bodyb")};
  color: ${({ $color }) => $color};
`;
