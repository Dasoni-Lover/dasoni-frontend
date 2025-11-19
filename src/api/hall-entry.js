// src/api/hall-entry.js
import client from "./client";

// 추모관 입장 요청
export const joinHall = async (hallId, body) => {
  const res = await client.post(`/api/halls/${hallId}/join`, body);
  return res.data;
};
