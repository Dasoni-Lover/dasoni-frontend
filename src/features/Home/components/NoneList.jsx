import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export const NoneList = ({
  tab,
  bgColor = "#FFF4E6",        // ⭐ 디폴트 배경색
  borderColor = "#E9E9E9",     // ⭐ 디폴트 보더색
  buttonColor = "white",       // ⭐ 디폴트 버튼 색
  enterTexts = ["현재 입장한 추모관이 없어요", "새로운 추모관에 입장해보세요"], // ⭐ tab=0일 때 텍스트
  openTexts = ["현재 개설한 추모관이 없어요", "새로운 추모관을 개설해보세요"]   // ⭐ tab≠0일 때 텍스트
}) => {
  const nav = useNavigate();

  // ⭐ tab 값에 따라 텍스트 세트 변경
  const textLines = tab === 0 ? enterTexts : openTexts;

  const buttonText = tab === 0 ? "새 추모관 입장하기" : "새 추모관 개설하기";
  const buttonRoute = tab === 0 ? "/enter" : "/open";

  return (
    <Wrapper bgColor={bgColor} borderColor={borderColor}>
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
        color={buttonColor}
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
  border: 1px solid ${({ borderColor }) => borderColor};
  background: ${({ bgColor }) => bgColor};

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


{/* <NoneList
  tab={1}
  bgColor="#fafafa"
  borderColor="#ddd"
  buttonColor="black"
  openTexts={["아무것도 없어요!", "추모관을 새로 만들어보세요!"]}
/> */}
