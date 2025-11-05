// src/components/Button.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import IconFolder from "../assets/icon-folder.svg";

/**
 * <Button
 *   text="버튼명"
 *   size="L"            // "L" | "M" | "S" (default: "L")
 *   color="main"        // "main"(default) | "white"
 *   active={true}       // true(default) | false
 *   width="100%"        // px/rem/% 등 모두 가능 (default: "100%")
 *   icon={false}        // flase(default) | true
 * />
 */
export default function Button({
  text,
  size = "L",
  color: variant = "main",
  active = true,
  width = "100%",
  icon = false,
  ...rest
}) {
  return (
    <ButtonWrapper
      $size={size}
      $color={variant}
      $active={active}
      $width={width}
      {...rest}
    >
      {icon ? <Icon src={IconFolder} /> : null}
      {text}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  /* 타이포 사이즈 매핑 (L: h3, M/S: h4) */
  ${({ $size }) => ($size === "L" ? typo("h3") : typo("h4"))}
  transition: all 0.2s ease;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  box-sizing: border-box;
  width: ${({ $width }) => $width};
  padding: ${({ $size }) =>
    $size === "S" ? "5px 13px" : "0.8125rem 1.875rem"};
  border-radius: 0.5rem;
  border: 1px solid ${color("black.5")};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);

  background-color: ${({ $color, $active }) => {
    if (!$active) return "#E2CBAF"; // 비활성 상태
    if ($color === "white") return "#fff";
    return color("main"); // 기본값
  }};

  /* 클릭 비활성화 */
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  white-space: nowrap;

  color: ${({ $active }) => ($active ? color("black.70") : "#938675")};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
`;
