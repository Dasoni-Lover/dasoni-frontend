import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";

/**
 * <ButtonL
 *   text="버튼명"
 *   color="white"        // 선택: "main"(기본) | "white"
 *   active={false}       // 선택: 기본 true, false 시 비활성 색상 적용
 *   width="200px"        // 선택: 기본 100%, px/rem/% 모두 가능
 * />
 */
export default function ButtonL({
  text,
  color = "main",
  active = true,
  width = "100%",
}) {
  return (
    <ButtonWrapper $color={color} $active={active} $width={width}>
      {text}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  ${typo("h3")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  box-sizing: border-box;
  width: ${({ $width }) => $width};
  padding: 0.8125rem 1.875rem;
  border-radius: 0.5rem;
  border: 1px solid ${color("black.5")};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);

  background-color: ${({ $color, $active }) => {
    if (!$active) return "#E2CBAF"; // 비활성 상태
    if ($color === "white") return "#fff";
    return color("main"); // 기본값
  }};

  color: ${({ $active }) => ($active ? color("black.70") : "#938675")};
`;
