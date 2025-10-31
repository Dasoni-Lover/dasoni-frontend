import React from 'react'
import styled from 'styled-components'
import postimg from "../assets/post-img.png"

const BoxPostListItem = () => {
  return (
    <>
    <Img src={postimg}/>
    </>
  )
}

const Img=styled.img`
    width: 356px;
height: 356px;

border-radius: 5px;
border: 2px solid #E9E9E9;
`

export default BoxPostListItem