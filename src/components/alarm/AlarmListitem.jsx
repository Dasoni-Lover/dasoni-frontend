import React from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import { Tag } from "../Tag";
import deleteicon from "../../assets/delete-icon.svg";

export const AlarmListitem = ({
  tagText = "입장승인",
  content = "입장이 승인 되었어요. 언제든 방문하여 소중한 추억을 함께 나눠주세요.",
  tagOn = true, // on/off
  title = "故 박영수 추모관",
}) => {
  return (
    <Wrapper>
      <Left>
        <Box>
          <Tag text={tagText} on={tagOn} />
          <Title>{title}</Title>
        </Box>
        <Content>{content}</Content>
      </Left>
      <Icon src={deleteicon} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 31.25rem;
  padding: 1rem 1.625rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--5, #E9E9E9);
  background: var(--0, #FFF);
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  width: 20.6875rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  padding: 0.625rem 0;
`;

const Title = styled.div`
  ${typo("bodyb")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

