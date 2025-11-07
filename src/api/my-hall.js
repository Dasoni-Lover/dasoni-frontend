// src/api/my-hall.js
import client from "./client";

// 본인 추모관 개설
export const createMyHall = async () => {
  const res = await client.post("/api/halls/me/create");
  return res.data; // { hallId: number }
};
