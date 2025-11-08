import client from "./client";

// 본인 추모관 개설
export const createMyHall = async () => {
  const res = await client.post("/api/halls/me/create");
  return res.data; // { hallId: number }
};

// 본인 추모관 조회
export const getMyHall = async () => {
  const res = await client.get("/api/halls/mine");
  return res.data; // { myHallExists: boolean, hallId: number | null }
};
