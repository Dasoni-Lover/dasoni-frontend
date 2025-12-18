import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLetterSentToday, getLetterStatus } from "../api/letters";

export function useWriteLetterFlow({ hallId, page, initialActiveMenu }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(
    initialActiveMenu || "sent"
  );

  const [showModal, setShowModal] = useState(false);
  const [showAlreadySentModal, setShowAlreadySentModal] = useState(false);
  const [showEditBlockedModal, setShowEditBlockedModal] = useState(false);

  const [isSendToday, setIsSendToday] = useState(false);

  // ==========================
  // 편지 쓰기 클릭
  // ==========================
  const handleClickWriteLetter = async () => {
    setActiveMenu("write");

    // ✅ me 페이지는 제한 없음
    if (page === "me") {
      navigate("/leave-letter", {
        state: { hallId, page, activeMenu: "write" },
      });
      return;
    }

    try {
      const { isSendToday } = await checkLetterSentToday(hallId);
      setIsSendToday(isSendToday);
      setShowModal(true); // YES / NO 모달 열기
    } catch (error) {
      console.error("오늘 편지 전송 여부 조회 실패:", error);
      alert("편지 작성 가능 여부를 확인하는 중 오류가 발생했어요.");
    }
  };

  // ==========================
  // YES / NO 모달 확인
  // ==========================
  const handleModalConfirm = async (selectedOption) => {
    setShowModal(false);

    const isWanted = selectedOption === "yes";

    // NO → 바로 편지 작성
    if (selectedOption === "no") {
      navigate("/sent-letter", {
        state: {
          hallId,
          page,
          activeMenu: "write",
          isWanted,
        },
      });
      return;
    }

    try {
      const { isOpen, isSet } = await getLetterStatus(hallId);

      // 열림 + 설정 완료
      if (isOpen && isSet) {
        navigate("/sent-letter", {
          state: {
            hallId,
            page,
            activeMenu: "write",
            isWanted,
          },
        });
        return;
      }

      // 열림 + 설정 미완
      if (isOpen && !isSet) {
        if (page === "follower") {
          navigate("/set-the-dead", {
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
        return;
      }

      // 닫힘
      if (!isOpen) {
        if (page === "admin") {
          navigate("/set-the-dead", {
            state: {
              hallId,
              page,
              activeMenu: "edit",
              isWanted,
            },
          });
        } else {
          setShowEditBlockedModal(true);
        }
      }
    } catch (error) {
      console.error("편지 상태 조회 실패:", error);
    }
  };

  // ==========================
  // 고인 정보 수정 클릭
  // ==========================
  const handleClickEditHallInfo = async () => {
    setActiveMenu("edit");

    try {
      const { isOpen } = await getLetterStatus(hallId);

      if (page === "follower" && !isOpen) {
        setShowEditBlockedModal(true);
        return;
      }

      navigate("/set-the-dead", {
        state: { hallId, page, activeMenu: "edit" },
      });
    } catch (error) {
      console.error("고인 정보 수정 가능 여부 조회 실패:", error);
      alert("정보 조회 중 오류가 발생했습니다.");
    }
  };

  return {
    // 상태
    activeMenu,
    isSendToday,
    showModal,
    showAlreadySentModal,
    showEditBlockedModal,

    // 액션
    handleClickWriteLetter,
    handleModalConfirm,
    handleClickEditHallInfo,

    // 닫기
    closeModal: () => setShowModal(false),
    closeAlreadySentModal: () => setShowAlreadySentModal(false),
    closeEditBlockedModal: () => setShowEditBlockedModal(false),

    // 메뉴 제어
    setActiveMenu,
  };
}
