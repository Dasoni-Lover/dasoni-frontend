import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import BarNavigate from '../components/BarNavigate';
import { color, typo } from '../styles/tokens';
import letterIcon from "../features/Letters/assets/receive-letter-icon.svg";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

import { fetchReceivedReplies } from "../api/letters";
import { getHallInfo } from "../api/memorial";

const RecievedLetterBoxPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [replyCount, setReplyCount] = useState(0);
  const [replies, setReplies] = useState([]);
  const [hallName, setHallName] = useState(""); // 🔥 고인 이름

  // 🔥 추모관 정보 불러오기(고인 이름, etc)
  useEffect(() => {
    const loadHallInfo = async () => {
      try {
        const data = await getHallInfo(hallId);
        setHallName(data?.data?.name || "");
      } catch (err) {
        console.error("추모관 정보 조회 실패:", err);
      }
    };

    if (hallId) loadHallInfo();
  }, [hallId]);

  // 🔥 받은 편지 목록 불러오기
  useEffect(() => {
    const loadReplies = async () => {
      try {
        const data = await fetchReceivedReplies(hallId);
        setReplyCount(data.count);
        setReplies(data.replies);
      } catch (err) {
        console.error("받은 편지함 조회 실패:", err);
      }
    };

    if (hallId) loadReplies();
  }, [hallId]);

  // 상세 페이지 이동
  const handleClickReply = (replyId) => {
    navigate(`/letters/reply/${replyId}`, {
      state: { hallId, page, replyId },
    });
  };

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["홈", `故 ${hallName}의 추모관`, "받은 편지함"]}
        />
      </NavWrapper>

      <TextWrapper>
        <Count>총 {replyCount}개의 받은 편지가 있어요</Count>
        <Text>
          잠시 그리움에 머무르되, 이곳에 머물러 있지 말고 고인과 함께했던 기억을 품은 채 오늘의 삶으로 천천히 돌아가 주세요
          <br />사랑은 사라지지 않고 여전히 당신 안에서, 따뜻한 온기로 오래도록 남아있을 거예요
          <br />
          <BoldText>*음성 편지는 생전 고인의 정보를 바탕으로 만든 가상의 AI 창작물이에요</BoldText>
        </Text>
      </TextWrapper>

      <ContentWrapper>
        {replies.map((item) => (
          <Box key={item.replyId} onClick={() => handleClickReply(item.replyId)}>
            {!item.isChecked && <NewBadge>NEW</NewBadge>}

            <LetterIcon src={letterIcon} />
            <Date>{item.createdAt}</Date>
            <Sender>{item.userName}님이 보낸 편지</Sender>
          </Box>
        ))}
      </ContentWrapper>

      <SideCategoryBox hallId={hallId} page={page} />
    </Wrapper>
  );
};

export default RecievedLetterBoxPage;


/* -------------------- 스타일 -------------------- */

const Wrapper = styled.div`
  width: 68.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 1.88rem;
  margin-bottom: 4.5rem;
`;

const TextWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 5rem;
`;

const Count = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Text = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;

const BoldText = styled.span`
  font-weight: 800;
`;

const ContentWrapper = styled.div`
  width: 66.9375rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  justify-items: center;
`;

const Box = styled.div`
  width: 20.625rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const LetterIcon = styled.img`
  width: 20.625rem;
  height: 13.0625rem;
  aspect-ratio: 30 / 19;
`;

const Date = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
  margin-top: 0.25rem;
`;

const Sender = styled.div`
  ${typo("bodys")};
  color: ${color("black.40")};
`;

const NewBadge = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: ${color("primary")};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  ${typo("cap")};
`;
