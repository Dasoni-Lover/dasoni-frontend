import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AlarmListitem } from "./AlarmListitem";
import { fetchNotifications } from "../../api/notification";

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

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container>
      {notifications.length === 0 && (
        <Empty>알림이 없습니다.</Empty>
      )}

      {notifications.map((item) => (
        <AlarmListitem
          key={item.notificationId}
          tagText={item.kind}
          title={item.title}
          content={item.body}
          tagOn={true}
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
  padding: 2rem;
  text-align: center;
  color: #999;
`;
