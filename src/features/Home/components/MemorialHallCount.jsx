import React from "react";
import styled from "styled-components";
import addicon from "../assets/add-icon.svg";
import { color, typo } from "../../../styles/tokens";

export const MemorialHallCount = ({ count = 0 }) => {
  return (
    <Wrapper>
      <Text>{count}곳의 추모관에 입장해 있어요</Text>
      <ButtonWrapper>
        <Icon src={addicon} />
        <Content>입장하기</Content>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
`;

const Text = styled.div`
  ${typo("h4")};
  color: ${color("black.30")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 1.25rem;
  align-items: center;
  flex-direction: row;
  gap: 0.38rem;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
`;

const Content = styled.div`
  ${typo("h4")};
  color: ${color("black.100")};
`;
