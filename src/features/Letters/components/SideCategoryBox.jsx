// src/components/SideCategoryBox.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SideCategoryBoxItem from "./SideCategoryBoxItem";
import { CheckReturnModal } from "./CheckReturnModal";
import { getLetterStatus } from "../../../api/letters";

export default function SideCategoryBox({ hallId, page }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu || "sent"
  );

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  // ==========================
  // 편지 쓰기 클릭
  // ==========================
  const handleClickWriteLetter = () => {
    setActiveMenu("write");

    // ✔ page가 "me"일 경우 → 모달 없이 즉시 이동
    if (page === "me") {
      navigate("/sent-letter", {
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
        state: { hallId, page, activeMenu: "write" ,selectedOption},
      });
      return;
    }

    // CASE 2: "예" → API 조회
    try {
      const { isOpen, isSet } = await getLetterStatus(hallId);

      if (isOpen === true && isSet === true) {
        navigate("/sent-letter", {
          state: { hallId, page, activeMenu: "write" ,selectedOption},
        });
      } else if (isOpen === true && isSet === false) {
        if (page === "follower") {
          navigate("/edit-hallinfo", {
            state: { hallId, page, activeMenu: "edit" ,selectedOption},
          });
        } else {
          navigate("/sent-letter", {
            state: { hallId, page, activeMenu: "write" ,selectedOption},
          });
        }
      } else if (isOpen === false) {
        if (page === "admin") {
          navigate("/edit-hallinfo", {
            state: { hallId, page, activeMenu: "edit" ,selectedOption},
          });
        } else {
          navigate("/edit-hallinfo", {
            state: { hallId, page, activeMenu: "write" ,selectedOption},
          });
        }
      }
    } catch (error) {
      console.error("편지 작성 가능 여부 조회 실패:", error);
    }
  };

  return (
    <>
      <Container>
        <SideCategoryBoxItem
          text="보낸 편지함"
          bgcolor={activeMenu === "sent" ? "#FFF4E6" : undefined}
          border={activeMenu === "sent" ? "1px solid #FFBC67" : undefined}
          onClick={() => {
            setActiveMenu("sent");
            navigate("/sent-letterbox", {
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

        <SideCategoryBoxItem
          text="편지 쓰기"
          bgcolor={activeMenu === "write" ? "#FFF4E6" : undefined}
          border={activeMenu === "write" ? "1px solid #FFBC67" : undefined}
          onClick={handleClickWriteLetter}
        />

        {(page === "admin" || page === "follower") && (
          <SideCategoryBoxItem
            text="고인 정보 수정"
            bgcolor={activeMenu === "edit" ? "#FFF4E6" : undefined}
            border={activeMenu === "edit" ? "1px solid #FFBC67" : undefined}
            onClick={() => {
              setActiveMenu("edit");
              navigate("/edit-hallinfo", {
                state: { hallId, page, activeMenu: "edit" },
              });
            }}
          />
        )}
      </Container>

      {showModal && (
        <CheckReturnModal
          onClose={closeModal}
          onConfirm={handleModalConfirm}
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
