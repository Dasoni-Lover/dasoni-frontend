// src/pages/LeaveLetterPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";

export const LeaveLetterPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId;
  const page = location.state?.page;

  // ★ 임시저장 → 전달된 데이터
  const letterData = location.state?.letterData || {};

  const navigate = useNavigate();

  const [letterText, setLetterText] = useState(letterData.content || "");
  const [toName, setToName] = useState(letterData.toName || "");
  const [fromName, setFromName] = useState(letterData.fromName || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const isActive =
    letterText.trim().length >= 50 &&
    toName.trim().length > 0 &&
    fromName.trim().length > 0;

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // ===== 전달하기 =====
  const handleSendLetter = async () => {
    if (!hallId) return alert("유효하지 않은 추모관입니다.");

    if (!isActive) return alert("편지를 올바르게 작성해 주세요.");

    try {
      await sendLetter(hallId, {
        toName,
        fromName,
        content: letterText,
        isCompleted: true,
        isWanted: true,
      });

      handleOpenModal("submit");
    } catch (err) {
      alert(err.response?.data?.message || "편지 보내기 실패");
    }
  };

  // ===== 임시보관 =====
  const handleTempSave = async () => {
    if (!hallId) return alert("유효하지 않은 추모관입니다.");

    try {
      await sendLetter(hallId, {
        toName,
        fromName,
        content: letterText,
        isCompleted: false,
        isWanted: true,
      });

      handleOpenModal("temp");
    } catch (err) {
      alert(err.response?.data?.message || "임시 저장 실패");
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);

    if (modalType === "temp") {
      navigate("/saved-letterbox", { state: { hallId, page } });
    } else {
      navigate("/leave-letterbox", { state: { hallId, page } });
    }
  };

  return (
    <Wrapper>
      <NavWrapper>
        <BarNavigate paths={["나의 추모관", "편지쓰기"]} />
      </NavWrapper>

      <TextWrapper>
        <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
        <Content>
          이 편지는 당신이 세상을 떠난 후, 사랑하는 이들에게 전해져요
          <br />
          말로 다 하지 못한 마음을, 글로 남겨보세요
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
        <Button text="임시 보관하기" size="M" color="white" onClick={handleTempSave} />
        <Button text="전달하기" size="M" active={isActive} onClick={handleSendLetter} />
      </ButtonWrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        title={modalType === "temp" ? "편지를 임시 보관했어요" : "편지를 전달했어요"}
        description={
          modalType === "temp"
            ? "임시 보관함에서 확인할 수 있어요"
            : "조금만 기다리면 답장이 올 거예요"
        }
        confirmText={"확인"}
        onConfirm={handleModalConfirm}
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
