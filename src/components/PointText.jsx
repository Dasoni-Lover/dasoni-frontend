import React from 'react'
import styled from 'styled-components'
import { color,typo } from '../styles/tokens';
import icon from "../assets/pointtext-icon.svg"

export const PointText = ({question}) => {
  return (
    <Wrapper>
        <Text>{question}</Text>
        <Icon src={icon}/>
    </Wrapper>
  );
};

const Wrapper=styled.div`
    display: inline-flex;
    align-items: center;
    width: 50%;
`

const Text=styled.div`
  ${typo("bodym2")};
  color: ${color("black.50")};
`

const Icon=styled.img`
    width: 1.25rem;
    height: 1.25rem;
`