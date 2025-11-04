import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import dropdownicon from "../assets/dropdown-icon.png";
import { color, typo } from '../../../styles/tokens';

const TabButtonDropdown = () => {
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
  };

  return (
    <Wrapper ref={dropdownRef}>
      {/* ✅ 토글 버튼 (글씨 포함) */}
      <ToggleButton onClick={() => setIsAIMode((prev) => !prev)} $isOn={isAIMode}>
        <ToggleCircle $isOn={isAIMode} />
        <ToggleLabel $isOn={isAIMode}>AI이미지만 보기</ToggleLabel>
      </ToggleButton>

      <DropdownContainer>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <span>{selected}</span>
          <Icon src={dropdownicon} alt="dropdown icon" $isOpen={isOpen} />
        </Button>

        {isOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleSelect('최신 업로드순')}>
              최신 업로드순
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect('오래된 업로드순')}>
              오래된 업로드순
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect('최신 사진순')}>
              최신 사진순
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect('오래된 사진순')}>
              오래된 사진순
            </DropdownItem>
          </DropdownMenu>
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default TabButtonDropdown;



const Wrapper = styled.div`
  display: flex;
  padding: 0.75rem 0.25rem 0.5rem 0.25rem;
  height: 1.9375rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0.5rem 0;
`;

/* 글씨 포함 토글 */
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
  overflow: hidden;
`;

/* 동그라미 */
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
  z-index: 2;
`;

/* 글씨 (토글 안에 표시됨) */
const ToggleLabel = styled.span`
  ${typo('bodyb')};
  color: ${(props) => (props.$isOn ? "#EF8F53": color('black.50'))};
  font-size: 0.875rem;
  z-index: 1;
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
  min-width: 6.25rem;
`;

const DropdownItem = styled.div`
  text-align: left;
  padding: 0.6rem 0.75rem;
  font-size: 1rem;
  color: #7A7A7A;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
