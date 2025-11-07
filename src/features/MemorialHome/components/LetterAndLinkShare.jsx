import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { color, typo } from '../../../styles/tokens';
import letterbtn from "../assets/letter-btn.svg";
import linksharebtn from "../assets/linkshare-btn.svg";
import letterhover from "../assets/letter-hover.svg";
import linksharehover from "../assets/linkshare-hover.svg";

/**
 * ✉️ LetterAndLinkShare
 * @param {Function} onLinkShareClick - 링크 공유 버튼 클릭 시 실행할 함수
 * @param {"default" | "my" | "manager"} page - 네비게이션 동작을 결정하는 모드
 */
const LetterAndLinkShare = ({ onLinkShareClick, page }) => {
  const [isLetterHover, setIsLetterHover] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const navigate = useNavigate();

  // Letter 클릭 시 페이지에 따라 네비게이트
  const handleLetterClick = () => {
    if (page === "default") {
      navigate("/sent-letter");
    } else {
      console.log(`⚠️ ${page} 모드에서는 이동하지 않습니다.`);
    }
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

// ======================= styled =======================
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

const Text = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
  margin-top: 1.13rem;
`;

// ### ✅ 상위 컴포넌트 사용 예시
// ```jsx
// <LetterAndLinkShare 
//   onLinkShareClick={() => setIsLinkShareModalOpen(true)} 
//   page="default" // "my" 또는 "manager"일 땐 이동 안 함
// />
