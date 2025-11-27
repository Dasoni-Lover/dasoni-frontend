import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color,typo } from "../../styles/tokens";
import { AlarmListitem } from "./AlarmListitem";
import { fetchNotifications, deleteNotification } from "../../api/notification";

export const AlarmList = () => {
  const [notifications, setNotifications] = useState([]);

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
      await deleteNotification(id);

      // 삭제된 알림만 제외
      setNotifications((prev) =>
        prev.filter((item) => item.notificationId !== id)
      );
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container>
      {notifications.length === 0 && <Empty>새로운 알림이 없어요.</Empty>}

      {notifications.map((item) => (
        <AlarmListitem
          key={item.notificationId}
          tagText={item.kind}
          title={item.title}
          content={item.body}
          onDelete={() => handleDelete(item.notificationId)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Empty = styled.div`
  display: flex;
  height: 7.75rem;
  box-sizing: border-box;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.1875rem;
  flex: 0 0 auto;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 1px solid var(--5, #E9E9E9);
  background: #FFF4E6;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.02);
  ${typo("h4")};
  color: ${color("black.50")};
`;
