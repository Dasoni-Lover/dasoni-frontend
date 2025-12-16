// src/components/SideCategoryBox.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";
import SideCategoryBoxItem from "./SideCategoryBoxItem";
import { CheckReturnModal } from "./CheckReturnModal";
import ConfirmModal from "../../../components/ConfirmModal";
import { getLetterStatus, checkLetterSentToday } from "../../../api/letters";
import letterbox from "../assets/letter-box-icon.svg";

export default function SideCategoryBox({ hallId, page }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu || "sent"
  );

  const [showModal, setShowModal] = useState(false);
  const [showEditBlockedModal, setShowEditBlockedModal] = useState(false);
  const [showAlreadySentModal, setShowAlreadySentModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const closeEditBlockedModal = () => setShowEditBlockedModal(false);
  const closeAlreadySentModal = () => setShowAlreadySentModal(false);

  // ==========================
  // 편지 쓰기 클릭
  // ==========================
  const handleClickWriteLetter = async () => {
    setActiveMenu("write");

    try {
      const { isSendToday } = await checkLetterSentToday(hallId);

      // 오늘 이미 보낸 경우
      if (isSendToday) {
        setShowAlreadySentModal(true);
        return;
      }

      // ✅ page === "me" → 모달 없이 바로 이동
      if (page === "me") {
        navigate("/leave-letter", {
          state: {
            hallId,
            page,
            activeMenu: "write",
            isWanted: false, // 기본값
          },
        });
        return;
      }

      // 그 외 페이지 → 모달
      setShowModal(true);
    } catch (error) {
      console.error("오늘 편지 전송 여부 조회 실패:", error);
      alert("편지 작성 가능 여부를 확인하는 중 오류가 발생했어요.");
    }
  };

  // ==========================
  // 모달 내 확인 처리
  // ==========================
  const handleModalConfirm = async (selectedOption) => {
    setShowModal(false);

    const isWanted = selectedOption === "yes";

    // NO 선택 → 바로 편지 작성
    if (selectedOption === "no") {
      navigate("/sent-letter", {
        state: {
          hallId,
          page,
          activeMenu: "write",
          isWanted, // false
        },
      });
      return;
    }

    try {
      const { isOpen, isSet } = await getLetterStatus(hallId);

      if (isOpen === true && isSet === true) {
        navigate("/sent-letter", {
          state: {
            hallId,
            page,
            activeMenu: "write",
            isWanted, // true
          },
        });
      } else if (isOpen === true && isSet === false) {
        if (page === "follower") {
          navigate("/edit-hallinfo", {
            state: {
              hallId,
              page,
              activeMenu: "edit",
              isWanted,
            },
          });
        } else {
          navigate("/sent-letter", {
            state: {
              hallId,
              page,
              activeMenu: "write",
              isWanted,
            },
          });
        }
      } else if (isOpen === false) {
        navigate("/edit-hallinfo", {
          state: {
            hallId,
            page,
            activeMenu: "edit",
            isWanted,
          },
        });
      }
    } catch (error) {
      console.error("편지 작성 가능 여부 조회 실패:", error);
    }
  };

  // ==========================
  // 고인 정보 수정 클릭
  // ==========================
  const handleClickEditHallInfo = async () => {
    setActiveMenu("edit");

    try {
      const { isOpen } = await getLetterStatus(hallId);

      if (page === "follower" && isOpen === false) {
        setShowEditBlockedModal(true);
        return;
      }

      navigate("/edit-hallinfo", {
        state: { hallId, page, activeMenu: "edit" },
      });
    } catch (error) {
      console.error("고인 정보 수정 가능 여부 조회 실패:", error);
      alert("정보 조회 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Container>
        <Box>
          {(page === "admin" || page === "follower") ? (
            <WhiteButton onClick={handleClickEditHallInfo}>
              고인 정보 설정
            </WhiteButton>
          ) : (
            <br />
          )}
          <LetterBox src={letterbox} />
        </Box>

        <SideCategoryBoxItem
          text="보낸 편지함"
          bgcolor={activeMenu === "sent" ? "#FFF4E6" : undefined}
          border={activeMenu === "sent" ? "1px solid #FFBC67" : undefined}
          onClick={() => {
            setActiveMenu("sent");
            navigate(
              page === "me" ? "/leave-letterbox" : "/sent-letterbox",
              { state: { hallId, page, activeMenu: "sent" } }
            );
          }}
        />

        {(page === "admin" || page === "follower") && (
          <SideCategoryBoxItem
            text="받은 편지함"
            bgcolor={activeMenu === "received" ? "#FFF4E6" : undefined}
            border={activeMenu === "received" ? "1px solid #FFBC67" : undefined}
            onClick={() => {
              setActiveMenu("received");
              navigate("/received-letterbox", {
                state: { hallId, page, activeMenu: "received" },
              });
            }}
          />
        )}

        <SideCategoryBoxItem
          text="임시보관함"
          bgcolor={activeMenu === "saved" ? "#FFF4E6" : undefined}
          border={activeMenu === "saved" ? "1px solid #FFBC67" : undefined}
          onClick={() => {
            setActiveMenu("saved");
            navigate("/saved-letterbox", {
              state: { hallId, page, activeMenu: "saved" },
            });
          }}
        />

        <SideCategoryBoxItem
          text="편지 쓰기"
          bgcolor={activeMenu === "write" ? "#FFF4E6" : undefined}
          border={activeMenu === "write" ? "1px solid #FFBC67" : undefined}
          onClick={handleClickWriteLetter}
        />
      </Container>

      {showModal && (
        <CheckReturnModal
          onClose={closeModal}
          onConfirm={handleModalConfirm}
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

      {showAlreadySentModal && (
        <ConfirmModal
          isOpen={showAlreadySentModal}
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
          onCancel={closeAlreadySentModal}
        />
      )}
    </>
  );
}


const Container = styled.div`
  position: fixed;
  top: 20.63rem;
  left: 3.75rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Box = styled.div`
  width: 14.8125rem;
  height: 4.5625rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const LetterBox = styled.img`
  height: 100%;
`;

const WhiteButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.37rem;

  border-radius: 6.25rem;
  border: 1px solid #ddd;
  background: #fff;

  ${typo("bodyb")};
  color: ${color("black.50")};

  &:hover {
    background: #FFF4E6;
    border: 1px solid #FFBC67;
    ${typo("bodyb")};
    color: ${color("black.70")};
  }
`;