import React from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";

export const Tag = ({ text = "입장승인"}) => {
  return <Wrapper >{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid var(--main, #FFBC67);
  background: var(--main, #FFBC67);
  ${typo("bodyb")};
  color: #fff;
`;
