import React from 'react'
import styled from 'styled-components'

export const SmallPhotoBox = ({src}) => {
  return (
    <div>
        <Img src={src}/>
    </div>
  )
}

const Img=styled.img`
    display: flex;
    width: 12.5rem;
    height: 12.5rem;

    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 1/1;

    border-radius: 10px;
    border: solid 2px #E9E9E9;
    
`