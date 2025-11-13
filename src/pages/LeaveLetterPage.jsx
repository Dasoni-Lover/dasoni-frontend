import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters";

export const LeaveLetterPage = () => {
  const location = useLocation();
  const hallId = location.state?.hallId; 
  const navigate = useNavigate();

  const [letterText, setLetterText] = useState("");
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
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
    navigate("/leave-letterbox", { state: { hallId } });
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
          <br/>말로 다 하지 못한 마음을, 글로 남겨보세요
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
        title={
          modalType === "cancel" ? "작성을 그만둘까요?" : "편지를 전달했어요"
        }
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

      {/* 서랍 디자인 전 */}
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

const Notice = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
  margin-top: 5rem;
  text-align: center;
`;
