import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { color,typo } from '../../../styles/tokens';
import letterbtn from "../assets/letter-btn.svg";
import linksharebtn from "../assets/linkshare-btn.svg";
import letterhover from "../assets/letter-hover.svg";
import linksharehover from "../assets/linkshare-hover.svg";

const LetterAndLinkShare = ({ onLinkShareClick }) => {
  const [isLetterHover, setIsLetterHover] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const navigate = useNavigate(); // ✅ 네비게이터 생성

  // Letter 클릭 시 /sent-letter로 이동
  const handleLetterClick = () => {
    navigate("/sent-letter");
  };

  return (
    <Wrapper>
      <LinkShare
        src={isLinkHover ? linksharehover : linksharebtn}
        onClick={onLinkShareClick}
        onMouseEnter={() => setIsLinkHover(true)}
        onMouseLeave={() => setIsLinkHover(false)}
      />
      <Letter
        src={isLetterHover ? letterhover : letterbtn}
        onMouseEnter={() => setIsLetterHover(true)}
        onMouseLeave={() => setIsLetterHover(false)}
        onClick={handleLetterClick} 
      />
      <Text>마우스를 올려보세요!</Text>
    </Wrapper>
  );
};

export default LetterAndLinkShare;

const Wrapper = styled.div`
  display: flex;
  width: 10.3125rem;
  height: 15.8125rem;
  padding-right: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const LinkShare = styled.img`
  width: 6.3125rem;
  height: 4.875rem;
  padding-right: 0.82rem;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const Letter = styled.img`
    width: 10.125rem;
height: 9.5rem;
  filter: drop-shadow(1.5px 3px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;



`;


const Text=styled.div`
    ${typo("bodym")};
  color: ${color("black.50")};
  margin-top: 1.13rem;
`
