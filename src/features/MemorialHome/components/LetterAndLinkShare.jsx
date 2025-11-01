import React from 'react';
import styled from 'styled-components';
import letterbtn from "../assets/letter-btn.png";
import linksharebtn from "../assets/linkshare-btn.png";

const LetterAndLinkShare = ({ onLinkShareClick }) => {
  return (
    <Wrapper>
        <LinkShare src={linksharebtn} onClick={onLinkShareClick} />
        <Letter src={letterbtn}/>
    </Wrapper>
  );
};

const Wrapper=styled.div`
    display: flex;
    width: 165px;
    height: 253px;
    padding-right: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    flex-shrink: 0;
`;

const LinkShare = styled.img`
  width: 68px;
  height: 60px;
  flex-shrink: 0;
  aspect-ratio: 17/15;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const Letter = styled.img`
  width: 130px;
  height: 148px;
  flex-shrink: 0;
  aspect-ratio: 65/74;
  filter: drop-shadow(1.5px 3px 2px rgba(0, 0, 0, 0.25));
`;

export default LetterAndLinkShare;
