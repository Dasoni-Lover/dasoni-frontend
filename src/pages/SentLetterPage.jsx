// src/pages/SentLetterPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters"; // ← getLetterStatus 제거됨
import { getHallInfo } from "../api/memorial";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

export const SentLetterPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;
  const page = location.state?.page;
  const navigate = useNavigate();

  const [letterText, setLetterText] = useState("");
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "cancel" | "submit"

  // 🟢 작성 가능 여부 관련 state 삭제됨
  // const [canWrite, setCanWrite] = useState({ isOpen: false, isSet: true });

  const [hallName, setHallName] = useState("");

  useEffect(() => {
    console.log("SentLetterPage hallId:", hallId);

    if (!hallId) {
      alert("유효하지 않은 추모관입니다.");
      navigate(-1);
      return;
    }

    // 🟢 작성 가능 여부 요청 삭제
    // fetchStatus() 제거

    // 🟢 추모관 이름만 조회
    const fetchHallName = async () => {
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 조회 실패:", err);
      }
    };

    fetchHallName();
  }, [hallId, navigate]);

  const isActive =
    letterText.trim().length >= 50 &&
    toName.trim().length > 0 &&
    fromName.trim().length > 0;

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSendLetter = async () => {
    if (!hallId) {
      alert("유효하지 않은 추모관입니다.");
      return;
    }

    if (!isActive) {
      alert("편지를 올바르게 작성해 주세요.");
      return;
    }

    try {
      await sendLetter(hallId, {
        toName,
        fromName,
        content: letterText,
        isCompleted: true,
      });
      handleOpenModal("submit");
    } catch (err) {
      console.error("편지 보내기 실패:", err.response?.data || err);
      alert(err.response?.data?.message || "편지 보내기 실패");
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);

    navigate("/sent-letterbox", {
      state: { hallId, page },
    });
  };

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate paths={["홈", hallTitle, "편지쓰기"]} />
      </NavWrapper>

      <TextWrapper>
        <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
        <Content>
          고인께 전하고 싶은 말과 함께 편지에 마음을 담으면, 다소니가 전달해
          드릴게요 <br />
          생일, 기일, 명절 등 기념일에 편지에 대한 답장이 올 거예요.
        </Content>
      </TextWrapper>

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
          color="white"
          onClick={() => handleOpenModal("cancel")}
        />
        <Button
          text="전달하기"
          size="M"
          active={isActive}
          onClick={handleSendLetter}
        />
      </ButtonWrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        title={modalType === "cancel" ? "작성을 그만둘까요?" : "편지를 전달했어요"}
        description={
          modalType === "cancel"
            ? "작성한 내용은 저장되지 않고 사라져요"
            : "조금만 기다리면 답장이 올 거예요"
        }
        confirmText={modalType === "cancel" ? "그만 두기" : "확인"}
        cancelText={modalType === "cancel" ? "취소" : null}
        onConfirm={handleModalConfirm}
        onCancel={handleCloseModal}
      />

      <SideCategoryBox hallId={hallId} page={page} />
    </Wrapper>
  );
};

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
  margin-bottom: 4.12rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.62rem;
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
