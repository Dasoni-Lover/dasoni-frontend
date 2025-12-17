// src/pages/SentLetterBoxPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { LetterList } from "../features/Letters/components/LetterList";
import LetterModal from "../features/Letters/components/LetterModal";
import { fetchLettersList, fetchLetterDetail } from "../api/letters";
import { getHallInfo } from "../api/memorial";
import Calendar from "../components/Calendar";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import NoneLetter from "../features/Letters/components/NoneLetter";

import calendaricon from "../assets/calendar-icon.svg";
import clickcalendaricon from "../assets/click-calendar-icon.svg";
import bgicon from "../features/Letters/assets/bg-icon.svg";

import { useWriteLetterFlow } from "../hooks/useWriteLetterFlow";
import { CheckReturnModal } from '../features/Letters/components/CheckReturnModal';
import ConfirmModal from '../components/ConfirmModal';


export const SentLetterBoxPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const page = location.state?.page;

  const [letters, setLetters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [hallName, setHallName] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [letterDates, setLetterDates] = useState([]);

  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId) return;
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  // 편지 목록
  const fetchLetters = async () => {
    if (!hallId) return;
    try {
      const list = await fetchLettersList(hallId);
      setLetters(list);

      const dates = list.map((l) => new Date(l.completedAt).getDate());
      setLetterDates(dates);
    } catch (err) {
      console.error("편지 목록 실패:", err);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, [hallId]);

  const handleItemClick = async (letterId) => {
    if (!hallId) return;
    try {
      const detail = await fetchLetterDetail(hallId, letterId);
      setSelectedLetter(detail);
      setModalOpen(true);
    } catch (err) {
      console.error("편지 상세 실패:", err);
    }
  };


const {
  handleClickWriteLetter,
  handleModalConfirm,
  showModal,
  showAlreadySentModal,
  closeModal,
  closeAlreadySentModal,
} = useWriteLetterFlow({ hallId, page });


  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";


  return (
    <Background>
      <BGIcon src={bgicon} alt="" />
    <Wrapper>
      <NavWrapper>
        <BarNavigate
          paths={["홈", hallTitle, "보낸 편지함"]}
          
          onPathClick={(path) => {
            if (path === "홈") {
              // hallId 유지하면서 홈으로 이동
              navigate("/home", { state: { hallId } });
            }else if (path === hallTitle){
              navigate("/memorial", { state: { hallId } });
            }
          }}
        />
      </NavWrapper>

      <TitleAndCalendar>
        <Title>총 {letters.length}개의 보낸 편지가 있어요</Title>
{letters.length === 0 ? (
          <></>
        ) : (
        <Box>
          <CalendarWrapper onClick={() => setCalendarOpen(!calendarOpen)}>
            <CalendarBorder active={calendarOpen}>
              <CalendarIcon
                src={calendarOpen ? clickcalendaricon : calendaricon}
              />
            </CalendarBorder>
          </CalendarWrapper>
        </Box>)}
      </TitleAndCalendar>

      <ContentWrapper>
        {letters.length === 0 ? (
          <NoneLetter
            text={"현재 보낸 편지가 없어요\n소중한 마음을 담아 편지를 써 보세요"}
            showButton
            onWriteLetter={handleClickWriteLetter}
          />
        ) : (
          <>
            <LetterArea calendarOpen={calendarOpen}>
              <LetterList
                letters={letters}
                onItemClick={handleItemClick}
                isNarrow={calendarOpen}
              />
            </LetterArea>

            {calendarOpen && (
              <>
                <Divider />
                <CalendarArea>
                  <Calendar hallId={hallId} letterDates={letterDates} />
                </CalendarArea>
              </>
            )}
          </>
        )}
      </ContentWrapper>


      <LetterModal
        isOpen={modalOpen}
        data={selectedLetter}
        onCancel={() => setModalOpen(false)}
      />

      <SideCategoryBox hallId={hallId} page={page} />
      {showModal && (
                <CheckReturnModal
                  onClose={closeModal}
                  onConfirm={handleModalConfirm}
                />
              )}
              {showAlreadySentModal && (
                <ConfirmModal
                  isOpen
                  title="오늘은 이미 편지를 보냈어요"
                  description={
                    <>
                      하루에 한 번만 편지를 작성할 수 있어요.
                      <br />
                      내일 다시 편지를 남겨주세요.
                    </>
                  }
                  confirmText="확인"
                  onConfirm={closeAlreadySentModal}
                />
              )}
    </Wrapper>
  
    </Background>
  );
};
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
  display: flex;
  flex-direction: column;
  width: 68.5rem;
  align-items: center;
  margin-top: 1.81rem;
  position: relative;
  
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.5rem;
`;

const TitleAndCalendar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Box=styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 0.62rem;
`

const SavedButton=styled.div`
  display: flex;
  width: 7.5rem;
  height: 2.5rem;
  padding: 0.4375rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid var(--10, #DDD);
  background: #FFF;
  ${typo("body")};
  color: ${color("black.70")};
  box-sizing: border-box;
  cursor: pointer;
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0rem;
  position: relative;
`;

const LetterArea = styled.div`
  width: ${({ calendarOpen }) => (calendarOpen ? "29.125rem" : "68.5rem")};
  transition: width 0.4s ease;
`;

const CalendarArea = styled.div`
  width: 30rem;
  position: relative;
`;

const CalendarIcon = styled.img`
  width: 1.5rem;
  height: 1.66669rem;
`;

const CalendarWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CalendarBorder = styled.div`
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.25rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: ${({ active }) => (active ? "1px solid #FFCC8C" : "1px solid #DDD")};
  background: ${({ active }) => (active ? "#FFF4E6" : "#FFF")};
  box-sizing: border-box;
  aspect-ratio: 1/1;
`;

const Divider = styled.div`
  width: 0.0625rem;
  height: 42.5rem;
  background-color: #ddd;
  margin: 0 0.5rem 0 2rem;
`;
