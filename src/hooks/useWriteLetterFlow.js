import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLetterSentToday, getLetterStatus } from "../api/letters";

export function useWriteLetterFlow({ hallId, page, initialActiveMenu }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(initialActiveMenu || "sent");
  const [showModal, setShowModal] = useState(false);
  const [showAlreadySentModal, setShowAlreadySentModal] = useState(false);
  const [showEditBlockedModal, setShowEditBlockedModal] = useState(false);

  // ==========================
  // 편지 쓰기 클릭 (공통)
  // ==========================
  const handleClickWriteLetter = async () => {
    setActiveMenu("write");

    // ✅ 나(me)는 제한 없이 바로 이동
    if (page === "me") {
      navigate("/leave-letter", {
        state: { hallId, page, activeMenu: "write" },
      });
      return;
    }

    try {
      const { isSendToday } = await checkLetterSentToday(hallId);

      if (isSendToday) {
        setShowAlreadySentModal(true);
        return;
      }

      setShowModal(true); // YES / NO 모달
    } catch (e) {
      console.error("오늘 편지 전송 여부 조회 실패:", e);
      alert("편지 작성 가능 여부를 확인하는 중 오류가 발생했어요.");
    }
  };

  // ==========================
  // YES / NO 모달 확인
  // ==========================
  const handleModalConfirm = async (selectedOption) => {
    setShowModal(false);
    const isWanted = selectedOption === "yes";

    // NO → 바로 작성
    if (selectedOption === "no") {
      navigate("/sent-letter", {
        state: { hallId, page, activeMenu: "write", isWanted },
      });
      return;
    }

    try {
      const { isOpen, isSet } = await getLetterStatus(hallId);

      if (isOpen && isSet) {
        navigate("/sent-letter", {
          state: { hallId, page, activeMenu: "write", isWanted },
        });
      } else if (isOpen && !isSet) {
        if (page === "follower") {
          navigate("/set-the-dead", {
            state: { hallId, page, activeMenu: "edit", isWanted },
          });
        } else {
          navigate("/sent-letter", {
            state: { hallId, page, activeMenu: "write", isWanted },
          });
        }
      } else {
        navigate("/set-the-dead", {
          state: { hallId, page, activeMenu: "edit", isWanted },
        });
      }
    } catch (e) {
      console.error("편지 상태 조회 실패:", e);
    }
  };

  return {
    // 상태
    activeMenu,
    showModal,
    showAlreadySentModal,
    showEditBlockedModal,

    // 액션
    handleClickWriteLetter,
    handleModalConfirm,

    // 닫기
    closeModal: () => setShowModal(false),
    closeAlreadySentModal: () => setShowAlreadySentModal(false),
    closeEditBlockedModal: () => setShowEditBlockedModal(false),

    // 메뉴 제어
    setActiveMenu,
  };
}
