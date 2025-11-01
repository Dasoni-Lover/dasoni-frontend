import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div>
      <Example1>이렇게 쓰면 h1스타일 80%블랙</Example1>
      <Example2>이렇게 쓰면 h2스타일 50%블랙</Example2>
      <Example3>이렇게 쓰면 body-bold스타일 100%블랙</Example3>
      <button onClick={() => navigate("/memorial")}>추모관 홈화면 바로가기</button>
    </div>
  );
}

const Example1 = styled.div`
  ${typo("h1")};
  color: ${color("black.10")};
`;

const Example2 = styled.div`
  ${typo("h2")};
  color: ${color("black.10")};
`;

const Example3 = styled.div`
  ${typo("bodyb")};
  color: ${color("black.100")};
`;
