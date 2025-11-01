import React from "react";
import styled from "styled-components";
import closebtn from "../../assets/close-btn.png";
import openbtn from "../../assets/open-btn.png";
import SideBarList from "../sidebar/SideBarList"; 

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <Wrapper isOpen={isOpen}>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        <img
          src={isOpen ? closebtn : openbtn}
          alt="toggle"
          className={isOpen ? "close" : "open"}
        />
      </ToggleButton>

      {isOpen && (
        <Menu>
          <SideBarList />
        </Menu>
      )}
    </Wrapper>
  );
};

export default SideBar;


const Wrapper = styled.div`
  position: fixed;
  top: 6.25rem; 
  left: 0;
  width: ${({ isOpen }) => (isOpen ? "300px" : "60px")};
  height: calc(100vh - 6.25rem);
  background: ${({ isOpen }) => (isOpen ? "var(--0, #fff)" : "transparent")};
  border-right: ${({ isOpen }) =>
    isOpen ? "1.079px solid var(--10, #DDD)" : "none"};
  transition: all 0.3s ease;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  justify-content: flex-start;
  gap: ${({ isOpen }) => (isOpen ? "23.91px" : "0")};
  flex-shrink: 0;

  padding: ${({ isOpen }) =>
    isOpen ? "44.244px 30.705px 582px 31.295px" : "30px 40px"};
  box-sizing: border-box;
  overflow: hidden;
`;


const ToggleButton = styled.button`
  align-self: ${({ isOpen }) => (isOpen ? "flex-end" : "center")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s ease;

  img {
    display: block;

    &.close {
      width: 38.85px;
      height: 38.85px;
    }

    &.open {
      width: 32px;
      height: 33px;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Menu = styled.div`
  width: 100%;
`;

