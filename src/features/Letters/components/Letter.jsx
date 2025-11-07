import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import letterbg from "../assets/letter-bg.svg";

export const Letter = ({ data }) => {
  if (!data) return null;

  return (
    <Container>
      <Row1>
        <To>TO. {data.toName}</To>
      </Row1>

      <InputBox>
        <Content>{data.content}</Content>
      </InputBox>

      <Date>{data.completedAt}</Date>

      <Row2>
        <From>From. {data.fromName}</From>
      </Row2>
    </Container>
  );
};

const Container = styled.div`
  width: 56.25rem;
  height: 32rem;
  border-radius: 0.625rem;
  padding: 0.81rem 1.38rem;
  background-image: url(${letterbg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const To = styled.div`
  color: var(--80, #0e0e0e);
  font-family: "Nanum OeHarMeoNiGeurSsi";
  font-size: 2rem;
  font-weight: 400;
  line-height: 145%;
`;

const From = styled.div`
  color: var(--80, #0e0e0e);
  font-family: "Nanum OeHarMeoNiGeurSsi";
  font-size: 2rem;
  font-weight: 400;
  line-height: 145%;
`;

const Date = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.62rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--50, #7a7a7a);
  ${typo("bodym")};
  color: ${color("black.30")};
`;

const Content = styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
`;

const Row1 = styled.div`
  display: flex;
  align-items: center;
`;

const Row2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const InputBox = styled.div`
  border-top: 1px solid var(--50, #7a7a7a);
  height: 19.3rem;
  padding: 0.94rem 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
