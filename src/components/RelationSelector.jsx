// src/components/RelationSelector.jsx
import React from "react";
import styled from "styled-components";
import { Row } from "../styles/flex";
import { color, typo } from "../styles/tokens";

/**
 * props:
 *  - options: string[]   (예: ["가족이에요", "친구예요", "연인이에요"])
 *  - value: string|null  (현재 선택된 값)
 *  - onChange: (value|null) => void
 */
export default function RelationSelector({
  options = [],
  value,
  onChange,
  gap = "0.65rem",
  style,
}) {
  const handleClick = (option) => {
    // 같은 걸 다시 누르면 해제
    if (value === option) {
      onChange?.(null);
    } else {
      onChange?.(option);
    }
  };

  return (
    <Row $gap={gap} style={style}>
      {options.map((option) => (
        <Chip
          key={option}
          $selected={value === option}
          onClick={() => handleClick(option)}
        >
          {option}
        </Chip>
      ))}
    </Row>
  );
}

const Chip = styled.button`
  transition: all 0.2s ease;
  display: flex;
  width: 13.75rem;
  height: 2.75rem;
  padding: 0.8125rem 1.875rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.3125rem;
  border: 2px solid
    ${({ $selected }) => ($selected ? color("main") : color("black.5"))};
  background: ${({ $selected }) => ($selected ? color("main") : "#ffffff")};
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);

  ${typo("h4")};
  color: ${color("black.70")};

  cursor: pointer;
`;
