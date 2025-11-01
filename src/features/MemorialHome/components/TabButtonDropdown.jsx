import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import dropdownicon from "../assets/dropdown-icon.png"; // 화살표 이미지
import { color, typo } from '../../../styles/tokens';

const TabButtonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('업로드순');
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 시 닫힘
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
      <SimpleButton>AI 이미지만 보기</SimpleButton>

      <DropdownContainer>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <span>{selected}</span>
          <Icon src={dropdownicon} alt="dropdown icon" $isOpen={isOpen} />
        </Button>

        {isOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleSelect('업로드순')}>
              업로드순
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect('최신순')}>
              최신순
            </DropdownItem>
            <DropdownItem onClick={() => handleSelect('오래된순')}>
              오래된순
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

const SimpleButton = styled.button`
  display: flex;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; 

  border-radius: 4px;
  border: 1px solid #DDD;
  background-color: white;

  ${typo("bodyb")};
  color: ${color("black.50")};

  &:hover {
    background-color: #f5f5f5;
  }
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
  top: 2.1875rem; 
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1); // 2px 8px -> rem
  z-index: 10;
  min-width: 6.25rem; 
`;

const DropdownItem = styled.div`
  padding: 0.5rem 0.75rem; 
  font-size: 0.875rem; 
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
