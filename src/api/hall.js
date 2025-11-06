// src/api/hall.js
import client from "./client";

// 사이드바 정보 조회
// GET /api/halls/sidebar
export const getSidebarInfo = async () => {
  const res = await client.get("/api/halls/sidebar");
  return res.data; // { name, myProfile, notiCount }
};
