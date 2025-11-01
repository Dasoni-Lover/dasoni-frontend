import React, { useState } from 'react'
import styled from 'styled-components'
import HallTabButton from './HallTabButton'

const HallTab = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Wrapper>
      <HallTabButton 
        text="공유앨범" 
        isActive={activeIndex === 0} 
        onClick={() => setActiveIndex(0)} 
      />
      <HallTabButton 
        text="나와의 앨범" 
        isActive={activeIndex === 1} 
        onClick={() => setActiveIndex(1)} 
      />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 2px solid #313131;
`

export default HallTab
