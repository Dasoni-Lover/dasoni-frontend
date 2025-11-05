import React from 'react'
import styled from 'styled-components'
import sideIcon from '../assets/drawer.svg' // 실제 아이콘 이미지

export const SideDrawer = () => {
  return <DrawerButton src={sideIcon} alt="Side Drawer" />
}

const DrawerButton = styled.img`
  position: fixed;
  margin-top: 8.06rem;
  right: 5rem;
  width: 17.5rem;
  height: 17.5rem;
  cursor: pointer;
  z-index: 1000;
`
