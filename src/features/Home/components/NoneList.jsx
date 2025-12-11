import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export const NoneList = () => {
  const nav = useNavigate();

  const buttonText1 ="새 추모관 입장하기";
  const buttonRoute1 = "/enter";
  const buttonText2 = "새 추모관 개설하기";
  const buttonRoute2 = "/open";

  return (
    <Wrapper>
      <TextWrapper>
        <Text1>현재 입장하거나 개설한 추모관이 없어요</Text1>
        <Text2>다른 추모관에 입장하거나, 새로운 추모관을 개설해 보세요</Text2>
      </TextWrapper>

      <ButtonWrapper>
      <Button
        text={buttonText1}
        size="M"
        width="13.75rem"
        height="2.75rem"
        icon="add"
        onClick={() => nav(buttonRoute1)}
      />
      <Button
        text={buttonText2}
        size="M"
        width="13.75rem"
        height="2.75rem"
        icon="add"
        onClick={() => nav(buttonRoute2)}
      />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
  margin-bottom: 1.25rem;
`;

const TextWrapper = styled.div`
display: flex;
padding: 0 0.25rem;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 0.25rem;
flex: 1 0 0;
`;

const Text1=styled.div`
    ${typo("h4")};
  color: ${color("black.50")};
`

const Text2=styled.div`
    ${typo("h3")};
  color:#FFBC67;
`

const ButtonWrapper=styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`
