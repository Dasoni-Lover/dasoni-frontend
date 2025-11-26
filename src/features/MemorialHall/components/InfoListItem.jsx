import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

const InfoListItem = ({ type, content }) => {
  return (
    <Wrapper>
      <Type>{type}</Type>
      <Content>{content}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 0.625rem 2.25rem;
  gap: 0.25rem;

  justify-content: space-between;
  align-items: center;
`;

const Type = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  color: ${color("black.80")};
  font-family: "NanumOeHarMeoNiGeurSsi";
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.9rem;
  white-space: nowrap;
`;

export default InfoListItem;
