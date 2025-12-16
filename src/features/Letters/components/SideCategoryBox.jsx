// src/components/SideCategoryBox.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";
import SideCategoryBoxItem from "./SideCategoryBoxItem";
import { CheckReturnModal } from "./CheckReturnModal";
import ConfirmModal from "../../../components/ConfirmModal";
import { getLetterStatus } from "../../../api/letters";
import letterbox from "../assets/letter-box-icon.svg";

export default function SideCategoryBox({ hallId, page }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu || "sent"
  );

  const [showModal, setShowModal] = useState(false);
  const [showEditBlockedModal, setShowEditBlockedModal] = useState(false); // 고인 정보 수정 불가 모달 상태
  const closeModal = () => setShowModal(false);
  const closeEditBlockedModal = () => setShowEditBlockedModal(false); // 고인 정보 수정 불가 모달 닫기

  // ==========================
  // 편지 쓰기 클릭 (경로 수정)
  // ==========================
  const handleClickWriteLetter = () => {
    setActiveMenu("write");

    // ✔ page가 "me"일 경우 → 모달 없이 즉시 이동
    if (page === "me") {
      // ⭐ 수정: me 페이지일 때 leave-letter로 이동
      navigate("/leave-letter", {
        state: { hallId, page, activeMenu: "write" },
      });
      return;
    }

    // ✔ admin / follower → 기존 모달 열림
    setShowModal(true);
  };

  // ==========================
  // 모달 내 확인 처리
  // ==========================
  const handleModalConfirm = async (selectedOption) => {
    setShowModal(false);

    // CASE 1: "아니오" → 무조건 sent-letter 이동
    if (selectedOption === "no") {
      navigate("/sent-letter", {
        state: { hallId, page, activeMenu: "write", selectedOption },
      });
      return;
    }

    // CASE 2: "예" → API 조회
    try {
      const { isOpen, isSet } = await getLetterStatus(hallId);

      if (isOpen === true && isSet === true) {
        navigate("/sent-letter", {
          state: { hallId, page, activeMenu: "write", selectedOption },
        });
      } else if (isOpen === true && isSet === false) {
        if (page === "follower") {
          navigate("/set-the-dead", {
            state: { hallId, page, activeMenu: "edit", selectedOption },
          });
        } else {
          navigate("/sent-letter", {
            state: { hallId, page, activeMenu: "write", selectedOption },
          });
        }
      } else if (isOpen === false) {
        if (page === "admin") {
          navigate("/set-the-dead", {
            state: { hallId, page, activeMenu: "edit", selectedOption },
          });
        } else {
          navigate("/set-the-dead", {
            state: { hallId, page, activeMenu: "write", selectedOption },
          });
        }
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
        // follower이면서 isOpen이 false일 때, 모달 띄우고 페이지 이동 막음
        setShowEditBlockedModal(true);
        return;
      }

      // 나머지 경우는 페이지 이동
      navigate("/set-the-dead", {
        state: { hallId, page, activeMenu: "edit" },
      });
    } catch (error) {
      console.error("고인 정보 수정 가능 여부 조회 실패:", error);
      // 에러 발생 시에도 일단 페이지 이동을 시킬지, 에러 메시지를 띄울지 결정 필요
      alert("정보 조회 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Container>
        {/* 맨 위로 분리된 고인 정보 수정 버튼 + 편지함 아이콘 */}
        {(page === "admin" || page === "follower") && (
          <Box>
            <WhiteButton
              onClick={handleClickEditHallInfo}
              $bgcolor={activeMenu === "edit" ? "#FFF4E6" : undefined}
              $border={activeMenu === "edit" ? "1px solid #FFBC67" : undefined}
            >
              고인 정보 설정
            </WhiteButton>
            <LetterBox src={letterbox} />
          </Box>
        )}
        {page === "me" && (
          <Box>
            <br />
            <LetterBox src={letterbox} />
          </Box>
        )}

        {/* 보낸 편지함 */}
        <SideCategoryBoxItem
          text="보낸 편지함"
          bgcolor={activeMenu === "sent" ? "#FFF4E6" : undefined}
          border={activeMenu === "sent" ? "1px solid #FFBC67" : undefined}
          onClick={() => {
            setActiveMenu("sent");
            const targetPath =
              page === "me" ? "/leave-letterbox" : "/sent-letterbox";

            navigate(targetPath, {
              state: { hallId, page, activeMenu: "sent" },
            });
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

        {/* ✅ 임시보관함 (모든 page에 노출) */}
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

        {/* 편지 쓰기 */}
        <SideCategoryBoxItem
          text="편지 쓰기"
          bgcolor={activeMenu === "write" ? "#FFF4E6" : undefined}
          border={activeMenu === "write" ? "1px solid #FFBC67" : undefined}
          onClick={handleClickWriteLetter}
        />
      </Container>

      {showModal && (
        <CheckReturnModal onClose={closeModal} onConfirm={handleModalConfirm} />
      )}

      {/* 고인 정보 수정 불가 모달 */}
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
    </>
  );
}

// ==================
// 스타일
// ==================

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
  flex-direction: row;
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
  padding: 0.4375rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  margin-bottom: 0.37rem;

  background: ${({ $bgcolor }) => $bgcolor ?? "#fff"};
  border: ${({ $border }) => $border ?? "1px solid var(--10, #ddd)"};

  border-radius: 6.25rem;

  ${typo("bodyb")};
  color: #${color("black.50")};

  &:hover {
    background: #fafafa;
  }
`;
