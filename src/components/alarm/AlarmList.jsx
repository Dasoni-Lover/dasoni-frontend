// AlarmList.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../styles/tokens";
import { AlarmListitem } from "./AlarmListitem";
import { fetchNotifications, closeNotification } from "../../api/notification";

export const AlarmList = () => {
  const [notifications, setNotifications] = useState([]);
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);
  const navigate = useNavigate();

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("알림 불러오기 실패:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await closeNotification(id);
      setNotifications((prev) =>
        prev.filter((item) => item.notificationId !== id)
      );
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  const handleItemClick = async (item) => {
    const id = item.notificationId;

    try {
      await closeNotification(id);
      setNotifications((prev) =>
        prev.filter((noti) => noti.notificationId !== id)
      );
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

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const firstItem = firstItemRef.current;
    if (!firstItem) return;

    const itemHeight = firstItem.offsetHeight;
    const maxVisibleCount = 6;

    containerRef.current.style.maxHeight = `${
      itemHeight * maxVisibleCount
    }px`;
  }, [notifications]);

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
