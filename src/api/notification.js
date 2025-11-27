// src/api/notification.js
import client from "./client";

// 알림 전체 조회
export const fetchNotifications = async () => {
  const res = await client.get("/api/notifications/list");
  return res.data;
};

// 알림 닫기
export const closeNotification = async (notificationId) => {
  const res = await client.patch(`/api/notifications/${notificationId}/close`);
  return res.data;
};
