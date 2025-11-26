import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import dropdownicon from "../assets/dropdown-icon.png";
import { color, typo } from "../../../styles/tokens";

const TabButtonDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("최신 업로드순");

  // 기존 isHideAI 이름 유지
  // 의미는 "AI 이미지 숨기기" (true면 AI 제외)
  const [isHideAI, setisHideAI] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    //  부모로 전달 (isHideAI = AI 숨기기 여부)
    onFilterChange({ sortOption: option, isHideAI });
  };

  // AI 숨기기 토글
  const handleToggleAI = () => {
    setisHideAI((prev) => {
      const newVal = !prev;
      // 🚫 렌더 중 즉시 호출 X → 🚀 다음 tick에 실행
      setTimeout(() => {
        // isHideAI: true면 AI 이미지를 숨김(제외)
        onFilterChange({ sortOption: selected, isHideAI: newVal });
      }, 0);
      return newVal;
    });
  };

  return (
    <Wrapper ref={dropdownRef}>
      {/* AI 토글 (AI 이미지 숨기기) */}
      <ToggleWrapper onClick={handleToggleAI}>
        <ToggleTrack $isOn={isHideAI}>
          <ToggleCircle $isOn={isHideAI} />
        </ToggleTrack>
        <ToggleText $isOn={isHideAI}>AI 이미지 숨기기</ToggleText>
      </ToggleWrapper>

      {/* 드롭다운 */}
      <DropdownContainer>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <span>{selected}</span>
          <Icon src={dropdownicon} alt="dropdown icon" $isOpen={isOpen} />
        </Button>

        {isOpen && (
          <DropdownMenu>
            {[
              "최신 업로드순",
              "오래된 업로드순",
              "최신 사진순",
              "오래된 사진순",
            ].map((option) => (
              <DropdownItem key={option} onClick={() => handleSelect(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default TabButtonDropdown;

/* 🎨 스타일 */
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  height: 3.5rem;
  position: relative;
`;

const ToggleWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const ToggleTrack = styled.div`
  position: relative;
  width: 3rem;
  height: 1.0625rem;
  border-radius: 1.25rem;
  border: 1px solid var(--10, #ddd);
  background: var(--Lightgrey, #f8f8f8);
  transition: all 0.25s ease;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.9375rem;
  height: 1.9375rem;
  border-radius: 50%;
  background: ${({ $isOn }) => ($isOn ? "#FFBC67" : "white")};
  border: 1px solid ${({ $isOn }) => ($isOn ? "#FFA431" : "#d9d9d9")};
  left: ${({ $isOn }) => ($isOn ? "-0.6rem" : "calc(100% - 1.65rem)")};
  transition: all 0.35s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const ToggleText = styled.span`
  ${typo("bodym")};
  color: ${color("black.70")};
  white-space: nowrap;
`;

/* ===================== 드롭다운 ===================== */
const DropdownContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #7a7a7a;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
`;

const Icon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 9rem;
`;

const DropdownItem = styled.div`
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  color: #7a7a7a;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
