// src/components/TagSelector.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import Toast from "../components/Toast"; // 🔥 추가

/**
 * props:
 *  - tagRows: { color: string; words: string[] }[]
 *      예: [{ color: "#FEB9BC", words: ["다정한", ...] }, ...]
 *  - value: string[]                (현재 선택된 태그 배열)
 *  - onChange: (newSelected: string[]) => void
 *  - max: number                    (최대 선택 개수, 기본 3)
 */
export default function TagSelector({
  tagRows = [],
  value = [],
  onChange,
  max = 3,
}) {
  const [isToastOpen, setIsToastOpen] = useState(false); // 🔥 추가

  const handleClick = (word) => {
    const isSelected = value.includes(word);

    if (isSelected) {
      onChange?.(value.filter((w) => w !== word));
      return;
    }

    if (value.length >= max) {
      // 최대 개수면 토스트 띄우기 🔥
      setIsToastOpen(true);
      return;
    }

    onChange?.([...value, word]);
  };

  return (
    <>
      {tagRows.map((row) => (
        <TagGrid
          key={row.color}
          style={{ borderLeft: `7px solid ${row.color}` }}
        >
          {row.words.map((word) => (
            <Chip
              key={word}
              $selected={value.includes(word)}
              onClick={() => handleClick(word)}
            >
              {word}
            </Chip>
          ))}
        </TagGrid>
      ))}

      {/* 🔥 기존 UI 변경 없이 Toast만 추가 */}
      <Toast
        text="단어는 3개까지 선택할 수 있어요"
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </>
  );
}

const TagGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  padding: 0.75rem 1.44rem;
`;

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
