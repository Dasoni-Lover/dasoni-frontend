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

// ✅ 본인 추모관 프로필 수정
// profile: S3에 업로드된 이미지 URL (fileUrl)
export const updateMyHallProfile = async (profile) => {
  const res = await client.patch("/api/halls/me/profile", { profile });
  return res.data; // 서버 응답 형식에 맞게 필요시 수정
};
