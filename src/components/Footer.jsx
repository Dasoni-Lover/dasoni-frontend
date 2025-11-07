import React from "react";
import styled from "styled-components";
import { typo } from "../styles/tokens";

const Footer = () => {
  return <Wrapper>© Dasoni all rights reserved.</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 5rem;
  background: var(--Lightgrey, #F8F8F8);

  ${typo("bodym2")};
  color: #ddd;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Footer;

//flex: 1; /* footer 위 공간 채우기 */
