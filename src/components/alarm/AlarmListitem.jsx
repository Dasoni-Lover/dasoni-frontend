import React from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import { Tag } from "../Tag";
import deleteicon from "../../assets/delete-icon.svg";

export const AlarmListitem = ({
  tagText = "입장승인",
  content = "입장이 승인 되었어요.",
  title = "故 박영수 추모관",
  onDelete,
}) => {
  return (
    <Wrapper>
      <Left>
        <Box>
          <Tag text={tagText} />
          <Title>{title}</Title>
        </Box>
        <Content>{content}</Content>
      </Left>

      <Icon src={deleteicon} onClick={onDelete} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 27.4375rem;
  padding: 1rem 1.625rem;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--5, #E9E9E9);
  background: #FFF4E6;
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  width: 20.6875rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Box = styled.div`
  display: flex;
  height: 2.88rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
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
  cursor: pointer;
`;
