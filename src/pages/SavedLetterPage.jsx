import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import { sendLetter, sendMyLetter, deleteTempLetter } from "../api/letters";
import { getHallInfo } from "../api/memorial";

import bgicon from "../features/Letters/assets/bg-icon.svg";

export const SavedLetterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hallId = location.state?.hallId;
  const letterId = location.state?.letterId;
  const page = location.state?.page;
  const isWanted = location.state?.isWanted;
  const letterData = location.state?.letterData;

  

  const [letterText, setLetterText] = useState("");
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [hallName, setHallName] = useState("");

  useEffect(() => {
    if (letterData) {
      setToName(letterData.toName || "");
      setFromName(letterData.fromName || "");
      setLetterText(letterData.content || "");
    }
  }, [letterData]);

  const isActive =
    letterText.trim().length > 0 &&
    toName.trim().length > 0 &&
    fromName.trim().length > 0;



const handleSendLetter = async () => {
  if (!isActive) return alert("편지를 올바르게 작성해 주세요.");

  try {
    // ✅ page === "me" → 전용 API
    if (page === "me") {
      await sendMyLetter({
        toName,
        fromName,
        content: letterText,
      });

      // ✅ 임시저장 편지였다면 삭제 (유지)
      if (letterId) {
        await deleteTempLetter(hallId, letterId);
      }

      setModalType("submit");
      setIsModalOpen(true);
      return;
    }

    // ✅ 그 외 (admin / follower)
    await sendLetter(hallId, {
      letterId: null,
      toName,
      fromName,
      content: letterText,
      isCompleted: true,
      isWanted: isWanted,
    });

    if (letterId) {
      await deleteTempLetter(hallId, letterId);
    }

    setModalType("submit");
    setIsModalOpen(true);
  } catch {
    alert("편지 보내기 실패");
  }
};


  const handleSaveLetter = async () => {
    try {
      await sendLetter(hallId, {
        letterId:letterId,
        toName,
        fromName,
        content: letterText,
        isCompleted: false,
        isWanted :isWanted,
      });

      setModalType("save");
      setIsModalOpen(true);
    } catch {
      alert("편지 보내기 실패");
    }
  };



  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/leave-letterbox", { state: { hallId,page } });
  };

  // 📌 추모관 정보
  useEffect(() => {
    if (page !== "me" && hallId) loadHallInfo();
  }, [hallId, page]);

  const loadHallInfo = async () => {
    try {
      const res = await getHallInfo(hallId);
      setHallName(res?.data?.name || "추모관");
    } catch {
      setHallName("추모관");
    }
  };

  const paths =
    page === "me"
      ? ["나의 추모관", "편지쓰기"]
      : ["홈", `故 ${hallName}의 추모관`, "편지쓰기"];

  return (
    <Background>
      <BGIcon src={bgicon} alt="" />

      <Wrapper>
        <NavWrapper>
          <BarNavigate
            paths={paths}
            onPathClick={(path) => {
              if (path === "나의 추모관")
                navigate("/memorial", { state: { hallId } });
              if (path === "임시보관함")
                navigate("/saved-letterbox", { state: { hallId, page } });
              if (path === "홈")
                navigate("/home", { state: { hallId } });
              if (path === `故 ${hallName}의 추모관`)
                navigate("/memorial", { state: { hallId } });
            }}
          />
        </NavWrapper>

        <TextWrapper>
          <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
          <Content>
            이 편지는 당신이 세상을 떠난 후, 사랑하는 이들에게 전해져요
            <br /> 말로 다 하지 못한 마음을, 글로 남겨보세요
          </Content>
        </TextWrapper>

        <HoverBox>
          <DescriptionHover>
            <HoverToolTip>
              <UnorderedList>
                <li>소중한 마음을 편지에 담아보세요</li>
                <li>전하고 싶은 근황이나 기억들을 적어보세요</li>
              </UnorderedList>
            </HoverToolTip>
            <DescriptionText>무슨 내용을 적어야 할지 고민되시나요?</DescriptionText>
          </DescriptionHover>

          <SavedButton
            onClick={() =>
              navigate("/saved-letterbox", { state: { hallId, page } })
            }
          >
            임시보관함
          </SavedButton>
        </HoverBox>

        <SentLetter
          to={toName}
          from={fromName}
          value={letterText}
          onToChange={setToName}
          onFromChange={setFromName}
          onValueChange={setLetterText}
        />

        <ButtonWrapper>
          <Button
            text="취소"
            size="M"
            width="13.75rem"
            color="white"
            onClick={() => {
              setModalType("cancel");
              setIsModalOpen(true);
            }}
          />
          <Button
            text="임시 보관하기"
            size="M"
            width="13.75rem"
            color="white"
            onClick={handleSaveLetter}
          />
          <Button 
            text="전달하기" 
            size="M"
            width="13.75rem"
            active={isActive} 
            onClick={handleSendLetter} />
        </ButtonWrapper>

        <ConfirmModal
          isOpen={isModalOpen}
          title={
            modalType === "cancel"
              ? "작성을 그만둘까요?"
              : modalType === "save"
              ? "편지를 임시 보관했어요"
              : "편지를 전달했어요"
          }
          description={
            modalType === "cancel"
              ? "작성한 내용은 저장되지 않고 사라져요"
              : modalType === "save"
              ? "임시 보관함에서 확인할 수 있어요"
              : "조금만 기다리면 답장이 올 거예요"
          }
          confirmText={
            modalType === "cancel"
              ? "그만 두기"
              : "확인"
          }
          cancelText={modalType === "cancel" ? "취소" : null}
          onConfirm={handleModalConfirm}
          onCancel={() => setIsModalOpen(false)}
        />

      </Wrapper>
      
      <SideCategoryBox hallId={hallId} page={page} />
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
  align-items: center;
  width: 68.5rem;
  margin-top: 1.81rem;
  position: relative;
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const TextWrapper = styled.div`
  width: 100%;
  margin-top: 4.5rem;
`;

const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;

const ButtonWrapper = styled.div`
  margin-top: 4.62rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const HoverBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 56.25rem;
  gap: 0.62rem;
  margin-bottom: 1rem;
`;

const DescriptionHover = styled.div`
  display: flex;
  position: relative;
  width: 17.5rem;
  height: 2.5rem;
  padding: 0 0.5625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid #f8e4ca;
  background: linear-gradient(90deg, #fff1f2 9%, #fff6eb 76%, #ffefe5 100%);
  cursor: default;

  &:hover > div:first-child {
    opacity: 1;
    visibility: visible;
  }
`;

const DescriptionText = styled.div`
  ${typo("body")};
  color: ${color("black.70")};
`;

const HoverToolTip = styled.div`
  position: absolute;
  bottom: calc(100% + 0.62rem);
  left: 0;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  pointer-events: none;
  width: 25.125rem;
  height: 5rem;

  display: inline-flex;
  padding: 0.5rem 0.5625rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0.25rem;
  border: 1px solid #f8e4ca;
  background: linear-gradient(90deg, #fff1f2 9%, #fff6eb 76%, #ffefe5 100%);
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;

  & li {
    ${typo("bodym")};
    color: ${color("black.70")};
    white-space: nowrap;
    margin-bottom: 0.62rem;
  }

  & li:last-child {
    margin-bottom: 0;
  }
`;

const SavedButton = styled.div`
  display: flex;
  width: 7.5rem;
  height: 2.5rem;
  padding: 0.4375rem 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  background: #fff;
  ${typo("body")};
  color: ${color("black.70")};
  box-sizing: border-box;
  cursor: pointer;
`;
