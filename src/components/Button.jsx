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
 *   icon={false}        // false(default) | true | 아이콘 경로(svg, png)
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
  // icon이 true면 기본 폴더 아이콘, 경로면 그대로 사용
  const iconSrc = icon === true ? IconFolder : icon || null;

  return (
    <ButtonWrapper
      $size={size}
      $color={variant}
      $active={active}
      $width={width}
      {...rest}
    >
      {iconSrc && <Icon src={iconSrc} alt="icon" />}
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

  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  white-space: nowrap;
  color: ${({ $active }) => ($active ? color("black.70") : "#938675")};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
`;

// 기본 폴더 아이콘
//<Button text="작성하기" icon={true} />          

// 다른 아이콘
// <Button text="삭제하기" icon={IconTrash} />  