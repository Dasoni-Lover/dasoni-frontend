import React from 'react'
import BoxPostListItem from './BoxPostListItem'
import styled from 'styled-components'
import {MediumPhotoBox} from "../../../components/photobox/MediumPhotoBox"
import postimg from "../assets/post-img.png"

const BoxPostList = () => {
  return (
    <Wrapper>
     <MediumPhotoBox src={postimg}/>
     <MediumPhotoBox src={postimg}/>
     <MediumPhotoBox src={postimg}/>
     <MediumPhotoBox src={postimg}/>
     <MediumPhotoBox src={postimg}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 18.3125rem;

`


export default BoxPostList
