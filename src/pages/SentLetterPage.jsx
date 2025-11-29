// src/pages/SentLetterPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters";
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
  const [isWanted] = useState(true); // 영상편지 요청

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "temp" | "submit"

  const [hallName, setHallName] = useState("");

  useEffect(() => {
    if (!hallId) {
      alert("유효하지 않은 추모관입니다.");
      navigate(-1);
      return;
    }

    // 추모관 이름 조회
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

  // -------------------------------
  // ⭐ 임시보관하기
  // -------------------------------
  const handleTempSave = async () => {
    try {
      await sendLetter(hallId, {
        toName,
        fromName,
        content: letterText,
        isCompleted: false, // 임시보관
        isWanted: isWanted,
      });

      handleOpenModal("temp");
    } catch (err) {
      console.error("임시보관 실패:", err.response?.data || err);
      alert(err.response?.data?.message || "임시보관 실패");
    }
  };

  // -------------------------------
  // ⭐ 전달하기 (isCompleted: true)
  // -------------------------------
  const handleSendLetter = async () => {
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
        isWanted: isWanted,
      });

      handleOpenModal("submit");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "이미 편지를 보냈어요") {
        alert("오늘 이미 편지를 보냈어요.");
      } else {
        alert(msg || "편지 보내기 실패");
      }
    }
  };

  // -------------------------------
  // ⭐ 모달에서 확인 → 리스트로 이동
  // -------------------------------
  const handleModalConfirm = () => {
    setIsModalOpen(false);

    navigate("/sent-letterbox", {
      state: {
        hallId,
        page,
        activeMenu: "sent", // ⭐ 메뉴 활성화 값 전달
      },
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
          고인께 전하고 싶은 말과 함께 편지에 마음을 담으면, 다소니가 전달해 드릴게요 <br />
          생일, 기일, 명절 등 기념일에 답장이 올 거예요.
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
          text="임시 보관하기"
          size="M"
          color="white"
          onClick={handleTempSave}
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
          modalType === "temp" ? "편지를 임시 보관했어요" : "편지를 전달했어요"
        }
        description={
          modalType === "temp"
            ? "임시보관함에서 확인할 수 있어요"
            : "조금만 기다리면 답장이 올 거예요"
        }
        confirmText="확인"
        onConfirm={handleModalConfirm}
        onCancel={handleCloseModal}
      />

      <SideCategoryBox hallId={hallId} page={page} activeMenu="sent" />
    </Wrapper>
  );
};

// ----------------- styled -----------------

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
