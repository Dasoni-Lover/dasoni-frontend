// src/api/notification.js
import client from "./client";

// 알림 전체 조회
export const fetchNotifications = async () => {
  const res = await client.get("/api/notifications/list");
  return res.data;
};
