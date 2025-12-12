// AlarmList.jsx
import React, { useEffect, useRef } from "react"; // ⚠️ useState, loadNotifications, 마운트 useEffect 제거
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../styles/tokens";
import { AlarmListitem } from "./AlarmListitem";
import { closeNotification } from "../../api/notification";

// Props로 notifications와 onUpdateNotifications를 받습니다.
export const AlarmList = ({ notifications, onUpdateNotifications }) => {
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);
  const navigate = useNavigate();

  // ⚠️ 자체 loadNotifications 함수는 더 이상 사용하지 않습니다.

  // 알림 삭제 함수
  const handleDelete = async (id) => {
    try {
      await closeNotification(id);
      // 알림 삭제 API 성공 후, Header의 상태를 갱신하도록 요청
      onUpdateNotifications();
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  // 아이템 클릭 함수
  const handleItemClick = async (item) => {
    const id = item.notificationId;

    try {
      await closeNotification(id);
      // 알림 닫기 API 성공 후, Header의 상태를 갱신하도록 요청
      onUpdateNotifications();
    } catch (err) {
      console.error("알림 닫기 실패:", err);
    }

    let path = "/";
    let state = {};

    switch (item.kind) {
      case "입장 요청":
      case "입장 승인":
        path = "/memorial";
        state = { hallId: item.hallId };
        break;

      case "편지 도착":
        path = "/received-letterbox";
        state = { hallId: item.hallId };
        break;

      case "생일 알림":
      case "기일 알림":
      case "설날 알림":
      case "추석 알림":
        path = "/sent-letterbox";
        state = { hallId: item.hallId };
        break;

      default:
        path = "/";
        state = {};
        break;
    }

    navigate(path, { state });
  };

  // ⚠️ 마운트 시 알림을 로드하던 useEffect는 제거되었습니다.

  // 알림 목록 높이 제어 로직
  useEffect(() => {
    if (!containerRef.current || notifications.length === 0) return;

    const firstItem = firstItemRef.current;
    if (!firstItem) return;

    // 첫 번째 아이템의 높이를 기준으로 최대 높이를 계산
    const itemHeight = firstItem.offsetHeight;
    const maxVisibleCount = 6;

    containerRef.current.style.maxHeight = `${
      itemHeight * maxVisibleCount
    }px`;
  }, [notifications]); // ✅ Props로 받은 notifications를 의존성 배열로 사용

  return (
    <Container ref={containerRef}>
      {notifications.length === 0 && <Empty>새로운 알림이 없어요.</Empty>}

      {notifications.map((item, idx) => (
        <div key={item.notificationId} ref={idx === 0 ? firstItemRef : null}>
          <AlarmListitem
            tagText={item.kind}
            title={item.title}
            content={item.body}
            hallId={item.hallId}
            onDelete={() => handleDelete(item.notificationId)}
            onClick={() => handleItemClick(item)}
          />
        </div>
      ))}
    </Container>
  );
};

/* ========== styles ========== */

const Container = styled.div`
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.375rem;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1.25rem;
    background: var(--50, #7a7a7a);
  }

  border-radius: 0 0 1.875rem 1.875rem;
`;

const Empty = styled.div`
  display: flex;
  height: 7.75rem;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.1875rem;
  border-radius: 0 0 1.875rem 1.875rem;
  border: 1px solid #e9e9e9;
  background: #fff4e6;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.02);
  ${typo("h4")}
  color: ${color("black.50")};
  box-sizing: border-box;
`;