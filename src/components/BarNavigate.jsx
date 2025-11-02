import React from "react";
import nextbtn from "../assets/next-btn.png";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Column } from "../styles/flex";

const BarNavigate = ({ title }) => {
  return (
    <>
      <Column>
        <Wrapper>
          <Text>홈</Text>
          <Next src={nextbtn} />
          <Text>故 박영수의 추모관</Text>
        </Wrapper>
        <Title>{title}</Title>
      </Column>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 1.75rem;
  align-items: center;
  align-self: stretch;
`;
const Text = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;

const Next = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const Title = styled.div`
  margin-top: 0.5rem;
  ${typo("h2")};
  color: ${color("black.70")};
`;

export default BarNavigate;
