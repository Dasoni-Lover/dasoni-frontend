import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export const MemorialHallCount = ({ count = 0, tab = 0 }) => {
  const nav = useNavigate();

  const text =
    tab === 0
      ? `${count}곳의 추모관에 입장해 있어요`
      : `${count}곳의 추모관을 개설했어요`;

  const buttonText = tab === 0 ? "추모관 입장하기" : "새 추모관 개설하기";
  const buttonRoute = tab === 0 ? "/enter" : "/open";

  const handleClick = () => {
    nav(buttonRoute);
  };

  return (
    <Wrapper>
      <Text>{text}</Text>

      <Button
        text={buttonText}
        size="M"
        onClick={handleClick}
        width="13.75rem"
        color="white"
        icon="add"
      />
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
