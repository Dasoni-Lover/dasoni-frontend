import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import dropdownicon from "../assets/dropdown-icon.png";
import { color, typo } from '../../../styles/tokens';

const TabButtonDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('최신 업로드순');
  const [isAIMode, setIsAIMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onFilterChange({ sortOption: option, isAIMode }); // 부모로 전달
  };

  const handleToggleAI = () => {
  setIsAIMode((prev) => {
    const newVal = !prev;
    // 🚫 렌더 중 즉시 호출 X → 🚀 다음 tick에 실행
    setTimeout(() => {
      onFilterChange({ sortOption: selected, isAIMode: newVal });
    }, 0);
    return newVal;
  });
};


  return (
    <Wrapper ref={dropdownRef}>
      {/* ✅ AI 토글 */}
      <ToggleButton onClick={handleToggleAI} $isOn={isAIMode}>
        <ToggleCircle $isOn={isAIMode} />
        <ToggleLabel $isOn={isAIMode}>AI이미지만 보기</ToggleLabel>
      </ToggleButton>

      {/* ✅ 드롭다운 */}
      <DropdownContainer>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <span>{selected}</span>
          <Icon src={dropdownicon} alt="dropdown icon" $isOpen={isOpen} />
        </Button>

        {isOpen && (
          <DropdownMenu>
            {['최신 업로드순', '오래된 업로드순', '최신 사진순', '오래된 사진순'].map((option) => (
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
  height: 2rem;
  position: relative;
`;

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOn ? 'flex-start' : 'flex-end')};
  width: 9rem;
  height: 2rem;
  padding: 0.9rem;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.$isOn ? "#FFCC8C": color('black.50'))};
  background-color: ${(props) => (props.$isOn ? "#FFF4E6": '#f2f2f2')};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 0.25rem;
  left: ${(props) => (props.$isOn ? 'calc(100% - 1.8rem)' : '0.4rem')};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  transition: left 0.5s ease;
`;

const ToggleLabel = styled.span`
  ${typo('bodyb')};
  color: ${(props) => (props.$isOn ? "#EF8F53": color('black.50'))};
  font-size: 0.875rem;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #7A7A7A;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
`;

const Icon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);
  z-index: 10;
  width: 9rem;
`;

const DropdownItem = styled.div`
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  color: #7A7A7A;
  cursor: pointer;
  &:hover { background-color: #f0f0f0; }
`;
