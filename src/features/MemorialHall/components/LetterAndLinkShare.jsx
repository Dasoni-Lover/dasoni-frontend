import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";

import letterbtn from "../assets/letter-btn.svg";
import linksharebtn from "../assets/linkshare-btn.svg";
import letterhover from "../assets/letter-hover.svg";
import linksharehover from "../assets/linkshare-hover.svg";

/**
 *  LetterAndLinkShare
 * @param {Function} onLinkShareClick - 링크 공유 버튼 클릭 시 실행할 함수
 * @param {"default" | "my" | "manager"} page - 네비게이션 동작을 결정하는 모드
 */
const LetterAndLinkShare = ({ onLinkShareClick, page, hallId }) => {
  const [isLetterHover, setIsLetterHover] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const navigate = useNavigate();

  const handleLetterClick = () => {
    if (page === "default" || page === "manager") {
      navigate("/sent-letter", { state: { hallId } });
    } else if (page === "my") {
      navigate("/leave-letter", { state: { hallId } });
    }
  };

  return (
    <Wrapper>
      {/* 공유하기 카드 */}
      <Card>
        <Text>추모관 공유하기</Text>
        <ShareIcon
          src={isLinkHover ? linksharehover : linksharebtn}
          onMouseEnter={() => setIsLinkHover(true)}
          onMouseLeave={() => setIsLinkHover(false)}
          onClick={onLinkShareClick}
        />
      </Card>

      {/* 간격 */}
      <Spacer />

      {/* 편지쓰기 카드 */}
      <Card>
        <Text>편지 보내기</Text>
        <LetterIcon
          src={isLetterHover ? letterhover : letterbtn}
          onMouseEnter={() => setIsLetterHover(true)}
          onMouseLeave={() => setIsLetterHover(false)}
          onClick={handleLetterClick}
        />
      </Card>
    </Wrapper>
  );
};

export default LetterAndLinkShare;

/* ======================= styled ======================= */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  width: 100%;
  height: 6.8rem; /* 카드 높이 */
  padding: 0 2rem;

  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.21);
`;

const Spacer = styled.div`
  height: 1.06rem; /* 카드 간격 */
`;

const Text = styled.div`
  ${typo("h3")}
  color: ${color("black.70")};
`;

const ShareIcon = styled.img`
  width: 4.44rem; /* 스샷의 새 아이콘 크기 */
  height: 4.44rem;
  cursor: pointer;
`;

const LetterIcon = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  cursor: pointer;
`;
