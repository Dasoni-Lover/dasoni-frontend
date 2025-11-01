import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import dropdownicon from "../assets/dropdown-icon.png" // 화살표 이미지
import { color,typo } from '../../../styles/tokens'

const TabButtonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('업로드순')
  const dropdownRef = useRef(null)

  // 드롭다운 외부 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
  }

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
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 12px 4px 8px 4px;
  height: 31px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 8px 0;
`

const SimpleButton = styled.button`
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 4px;
  border: 1px solid #DDD;
  background-color: white;

  ${typo("bodyb")};
  color: ${color("black.50")};

  &:hover {
    background-color: #f5f5f5;
  }
`

const DropdownContainer = styled.div`
  position: relative;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #7A7A7A;
  font-size: 16px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;

`

const Icon = styled.img`
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 100px;
`

const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`

export default TabButtonDropdown
