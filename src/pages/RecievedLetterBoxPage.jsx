import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation} from 'react-router-dom';

import BarNavigate from '../components/BarNavigate';
import { color, typo } from '../styles/tokens';

import letterIcon1 from "../features/Letters/assets/read-letter-icon.svg";
import letterIcon2 from "../features/Letters/assets/notread-letter-icon.svg"; 

import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import TapeModal from '../features/Letters/components/TapeModal';

import { fetchReceivedReplies } from "../api/letters";
import { getHallInfo } from "../api/memorial";

const RecievedLetterBoxPage = () => {
  const location = useLocation();

  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [replyCount, setReplyCount] = useState(0);
  const [replies, setReplies] = useState([]);
  const [hallName, setHallName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);


  // 읽은 / 안읽은 편지 개수 상태 추가
  const [readCount, setReadCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  // 추모관 정보 불러오기
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

  // 받은 편지 목록 불러오기
  useEffect(() => {
    const loadReplies = async () => {
      try {
        const data = await fetchReceivedReplies(hallId);

        setReplyCount(data.count);
        setReplies(data.replies);

        // 읽은/안읽은 개수 자동 계산
        const unread = data.replies.filter((r) => !r.isChecked).length;
        const read = data.replies.filter((r) => r.isChecked).length;

        setUnreadCount(unread);
        setReadCount(read);

      } catch (err) {
        console.error("받은 편지함 조회 실패:", err);
      }
    };

    if (hallId) loadReplies();
  }, [hallId]);



const handleIconClick = (item) => {  // item 전달!
  setSelectedReply(item); 
  setIsModalOpen(true);
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

      {/* 읽은/안읽은 편지 수 표시 */}
      <StateBox>
        <StateContainer>
          <StateContent>읽지 않은 편지</StateContent>
          <StateCount>{unreadCount}</StateCount>
        </StateContainer>
        <Line>|</Line>
        <StateContainer>
          <StateContent>읽은 편지</StateContent>
          <StateCount>{readCount}</StateCount>
        </StateContainer>
      </StateBox>

      <ContentWrapper>
        {replies.map((item) => (
          <Box key={item.replyId} onClick={() => handleIconClick(item)}>

            {/* 읽음 여부에 따른 아이콘 변경 */}
            <LetterIcon
              src={item.isChecked ? letterIcon1 : letterIcon2}
            />
            <Date>{item.createdAt}</Date>
          </Box>
        ))}
        {/* <LetterIcon
              src={letterIcon1}
              onClick={handleIconClick}
            /> 테스트용 */}
      </ContentWrapper>

      <SideCategoryBox hallId={hallId} page={page} />
      {isModalOpen && (
        <TapeModal 
          onCancel={() => setIsModalOpen(false)}
          data={selectedReply}
        />
      )}


    </Wrapper>
  );
};

export default RecievedLetterBoxPage;


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
  margin-bottom: 3.25rem;
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

const StateBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 3.25rem;
`;

const StateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StateContent = styled.div`
  ${typo("h3")};
  color: ${color("black.80")};
`;

const StateCount = styled.div`
  ${typo("h3")};
  color: red;
  display: flex;
  padding: 0 0.4375rem;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
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
