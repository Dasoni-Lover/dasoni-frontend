import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import letterbtn from "../assets/letter-btn.svg";
import linksharebtn from "../assets/linkshare-btn.png";
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
        onClick={handleLetterClick} // ✅ 클릭 시 이동
      />
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
  width: 4.25rem;
  height: 3.75rem;
  padding-right: 0.82rem;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02) translateY(-3px);
  }
`;

const Letter = styled.img`
  width: 8.125rem;
  height: 9.25rem;
  filter: drop-shadow(1.5px 3px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.02);
  }
`;
