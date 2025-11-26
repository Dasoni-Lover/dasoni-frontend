import React from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import IconFolder from "../assets/icon-folder.svg";
import IconAdd from "../assets/icon-add.svg";
import IconSearch from "../assets/icon-search.svg";
import IconRestart from "../assets/icon-restart.svg";
import IconDownload from "../assets/icon-download-black.svg";

export default function Button({
  text,
  size = "L",
  color: variant = "main",
  active = true,
  width = "100%",
  icon = false,
  ...rest
}) {
  // 🔥 문자열 icon 매핑 추가
  const iconMap = {
    add: IconAdd,
    folder: IconFolder,
    search: IconSearch,
    restart: IconRestart,
    download: IconDownload,
  };

  const iconSrc =
    icon === true
      ? IconFolder
      : typeof icon === "string"
      ? iconMap[icon] || null
      : icon || null;

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
    if (!$active) return "#F8E4CA";
    if ($color === "white") return "#fff";
    return color("main");
  }};

  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  white-space: nowrap;
  color: ${({ $active }) => ($active ? color("black.70") : "#fff")};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
`;
