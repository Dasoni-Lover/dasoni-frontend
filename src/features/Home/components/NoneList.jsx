// src/features/Home/components/NoneList.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export const NoneList = ({ tab }) => {
  const nav = useNavigate();

  const textLines =
    tab === 0
      ? ["현재 입장한 추모관이 없어요", "새로운 추모관에 입장해보세요"]
      : ["현재 개설한 추모관이 없어요", "새로운 추모관을 개설해보세요"];

  const buttonText = tab === 0 ? "새 추모관 입장하기" : "새 추모관 개설하기";
  const buttonRoute = tab === 0 ? "/enter" : "/open";

  return (
    <Wrapper>
      <TextWrapper>
        {textLines.map((line, idx) => (
          <Line key={idx}>{line}</Line>
        ))}
      </TextWrapper>

      <Button
        text={buttonText}
        size="M"
        width="13.75rem"
        icon="add"
        onClick={() => nav(buttonRoute)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 33.1875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.19rem;

  border-radius: 1.25rem;
border: 1px solid var(--5, #E9E9E9);
background: #FFF4E6;
box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.02);
`;

const TextWrapper = styled.div`
  text-align: center;
  line-height: 1.5;
`;

const Line = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
`;