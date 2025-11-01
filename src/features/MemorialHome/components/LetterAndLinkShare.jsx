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
    width: 10.3125rem;
    height: 15.8125rem;
    padding-right: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    flex-shrink: 0;
`;

const LinkShare = styled.img`
  width: 4.25rem;
  height: 3.75rem;
  flex-shrink: 0;
  aspect-ratio: 17/15;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const Letter = styled.img`
  width: 8.125rem;
  height: 9.25rem;
  flex-shrink: 0;
  aspect-ratio: 65/74;
  filter: drop-shadow(1.5px 3px 2px rgba(0, 0, 0, 0.25));
`;

export default LetterAndLinkShare;
