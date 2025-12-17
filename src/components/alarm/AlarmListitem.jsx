import React from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import { Tag } from "../Tag";
import deleteicon from "../../assets/delete-icon.svg";

export const AlarmListitem = ({ tagText, title, content, date, onDelete, onClick}) => {
  return (
    <Wrapper >
      <Left onClick={onClick}>
        <Box>
          <Tag text={tagText} />
          <Title>{title}</Title>
        </Box>
        <Content>{content}</Content>
        <Date>{date}</Date>
      </Left>

      <Icon
        src={deleteicon}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1.625rem;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  background: #fff4e6;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: #ffefd8;
  }
`;

const Left = styled.div`
  display: flex;
  width: 20.6875rem;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  height: 2.88rem;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.div`
  ${typo("bodyb")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
  white-space: pre-line;
`;

const Date = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
  margin-top: 0.25rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;
