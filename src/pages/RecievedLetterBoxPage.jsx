import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import BarNavigate from '../components/BarNavigate';
import { color, typo } from '../styles/tokens';
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import TapeModal from '../features/Letters/components/TapeModal';
import NoneLetter from '../features/Letters/components/NoneLetter';

import { fetchReceivedReplies, fetchReceivedReplyDetail } from "../api/letters";
import { getHallInfo } from "../api/memorial";

import letterIcon1 from "../features/Letters/assets/read-letter-icon.svg";
import letterIcon2 from "../features/Letters/assets/notread-letter-icon.svg";
import bgicon from "../features/Letters/assets/bg-icon.svg";

import { useWriteLetterFlow } from "../hooks/useWriteLetterFlow";
import { CheckReturnModal } from '../features/Letters/components/CheckReturnModal';
import ConfirmModal from '../components/ConfirmModal';

const RecievedLetterBoxPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [replies, setReplies] = useState([]);
  const [hallName, setHallName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [readCount, setReadCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  // 추모관 정보
  useEffect(() => {
    if (!hallId) return;
    const loadHallInfo = async () => {
      try {
        const data = await getHallInfo(hallId);
        setHallName(data?.data?.name || "");
      } catch (err) {
        console.error("추모관 정보 조회 실패:", err);
      }
    };
    loadHallInfo();
  }, [hallId]);

  // 받은 편지 목록
  useEffect(() => {
    if (!hallId) return;
    const loadReplies = async () => {
      try {
        const data = await fetchReceivedReplies(hallId);
        setReplies(data.replies);
        setUnreadCount(data.unreadCount);
        setReadCount(data.readCount);
      } catch (err) {
        console.error("받은 편지함 조회 실패:", err);
      }
    };
    loadReplies();
  }, [hallId]);

  // 편지 클릭 시 상세 조회 후 모달 열기
const handleIconClick = async (reply) => {
  try {
    const detail = await fetchReceivedReplyDetail(hallId, reply.replyId);

    setSelectedReply(detail);
    setIsModalOpen(true);

    // ✅ 이미 읽은 편지가 아니라면 상태 업데이트
    if (!reply.isChecked) {
      setReplies((prev) =>
        prev.map((item) =>
          item.replyId === reply.replyId
            ? { ...item, isChecked: true }
            : item
        )
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
      setReadCount((prev) => prev + 1);
    }
  } catch (err) {
    console.error("편지 상세 조회 실패:", err);
  }
};


const {
 // 상태
    isSendToday,
    showModal,
    showEditBlockedModal,

    // 액션
    handleClickWriteLetter,
    handleModalConfirm,

    // 닫기
    closeModal,
    closeEditBlockedModal,

    // 메뉴 제어
} = useWriteLetterFlow({ hallId, page });

  return (
    <Background>
      <BGIcon src={bgicon} alt="" />
    <Wrapper>
      <NavWrapper>
        <BarNavigate 
        paths={["홈", `故 ${hallName}의 추모관`, "받은 편지함"]} 
        onPathClick={(path) => {
          if (path === "홈") {
            // hallId 유지하면서 홈으로 이동
            navigate("/home", { state: { hallId } });
          }else if (path === `故 ${hallName}의 추모관`){
            navigate("/memorial", { state: { hallId } });
          }
        }}
      />
      </NavWrapper>

      <TextWrapper>
        <Count>총 {readCount + unreadCount}개의 받은 편지가 있어요</Count>
      </TextWrapper>

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
        {replies.length === 0 ? (
          <NoneLetter
            text={
              "현재 받은 편지가 없어요\n" +
              "편지를 쓰고 조금만 기다리면\n" +
              "고인의 목소리가 담긴 편지가 도착할 거예요"
            }
            showButton
            onWriteLetter={handleClickWriteLetter}
            marginTop="0"
          />
        ) : (
          replies.map((item) => (
            <Box key={item.replyId} onClick={() => handleIconClick(item)}>
              <LetterIcon src={item.isChecked ? letterIcon1 : letterIcon2} />
              <Date>{item.createdAt}</Date>
            </Box>
          ))
        )}

      </ContentWrapper>


      <SideCategoryBox hallId={hallId} page={page} />

        {isModalOpen && selectedReply && (
          <TapeModal 
            onCancel={() => setIsModalOpen(false)}
            data={selectedReply}
          />
        )}
      </Wrapper>
        {showModal && (
                      <CheckReturnModal 
                      onClose={closeModal} 
                      onConfirm={handleModalConfirm} 
                      disableYes={isSendToday}
                      />
                    )}
              
                    {showEditBlockedModal && (
                      <ConfirmModal
                        isOpen={showEditBlockedModal}
                        title="지금은 고인 정보를 설정할 수 없어요"
                        description={
                          <>
                            추모관 관리자가 고인 정보 설정을 완료하면
                            <br />
                            설정할 수 있어요
                          </>
                        }
                        confirmText="확인"
                        onConfirm={closeEditBlockedModal}
                        onCancel={closeEditBlockedModal}
                      />
                    )}


    </Background>
  );
};

export default RecievedLetterBoxPage;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;  /* ⭐ bgicon 기준 */
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    90deg,
    rgba(255, 241, 242, 0.3) 9.13%,
    rgba(255, 246, 235, 0.3) 76.44%,
    rgba(255, 239, 229, 0.3) 100%
  );
`;

const BGIcon = styled.img`
  position: fixed;  
  bottom: 3.5rem;
  right: 2.5rem;
  width: 22.00006rem;
  height: 11.62256rem;
  opacity: 0.7;
  pointer-events: none;
`;


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
