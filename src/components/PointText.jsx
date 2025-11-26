import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import icon from "../assets/pointtext-icon.svg";

export const PointText = ({ question, bold = false, width }) => {
  return (
    <Wrapper $width={width}>
      <Text $bold={bold}>{question}</Text>
      <Icon src={icon} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: ${({ $width }) => ($width ? $width : "auto")};
`;

const Text = styled.div`
  ${typo("bodym2")};
  color: ${({ $bold }) => ($bold ? color("black.70") : color("black.50"))};
  white-space: nowrap;
`;

const Icon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
