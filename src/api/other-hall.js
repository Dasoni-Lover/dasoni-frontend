// src/api/other-hall.js
import client from "./client";

// 타인 추모관 개설
export const createOtherHall = async (body) => {
  const res = await client.post("/api/halls/other/create", body);
  return res.data; // { hallId: 4 }
};
