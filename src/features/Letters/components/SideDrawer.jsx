import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import sideIcon from "../assets/drawer-bg.svg";
import first from "../assets/first.svg";
import second from "../assets/second.svg";
import third from "../assets/third.svg";
import firstopen from "../assets/first-open.svg";
import secondopen from "../assets/second-open.svg";
import thirdopen from "../assets/third-open.svg";

export const SideDrawer = ({ hallId }) => {
  const [hovered, setHovered] = useState({ first: false, second: false, third: false });
  const navigate = useNavigate();

  return (
    <DrawerWrapper>
      <DrawerButton src={sideIcon} alt="Side Drawer" />

      <DrawerItem
        src={hovered.first ? firstopen : first}
        alt="First"
        top="7.81rem"
        right="1.38rem"
        isHovered={hovered.first}
        onMouseEnter={() => setHovered(prev => ({ ...prev, first: true }))}
        onMouseLeave={() => setHovered(prev => ({ ...prev, first: false }))}
        onClick={() => navigate('/sent-letterbox', { state: { hallId } })} // hallId 전달
      />

      <DrawerItem
        src={hovered.second ? secondopen : second}
        alt="Second"
        top="10.81rem"
        right="1.38rem"
        isHovered={hovered.second}
        onMouseEnter={() => setHovered(prev => ({ ...prev, second: true }))}
        onMouseLeave={() => setHovered(prev => ({ ...prev, second: false }))}
      />

      <DrawerItem
        src={hovered.third ? thirdopen : third}
        alt="Third"
        top="13.81rem"
        right="1.38rem"
        isHovered={hovered.third}
        onMouseEnter={() => setHovered(prev => ({ ...prev, third: true }))}
        onMouseLeave={() => setHovered(prev => ({ ...prev, third: false }))}
      />
    </DrawerWrapper>
  );
};

const DrawerWrapper = styled.div`
  position: fixed;
  margin-top: 8.06rem;
  right: 7rem;
  width: 17.5rem;
  height: 17.5rem;
  z-index: 1000;
`;

const DrawerButton = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const DrawerItem = styled.img`
  position: absolute;
  width: ${props => (props.isHovered ? '12.625rem' : '11.6875rem')};
  height: ${props => (props.isHovered ? '4.5rem' : '2.9375rem')};
  top: ${props => props.top};
  left: 4.44rem;
  cursor: pointer;
  z-index: ${props => (props.isHovered ? 2000 : 1000)};
  transition: all 0.15s ease;
  transform: ${({ isHovered }) => (isHovered ? 'translateY(-0.4rem)' : 'translateY(0)')};
`;
