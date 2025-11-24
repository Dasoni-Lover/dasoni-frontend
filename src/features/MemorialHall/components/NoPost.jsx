import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

export const NoPost = ({ text = "작성한 게시물이 없어요" }) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  padding: 1.25rem 0; /* 20px → rem 단위 */
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: stretch;
  flex-wrap: wrap;

  ${typo("bodym")};
  color: ${color("black.30")};
`;
