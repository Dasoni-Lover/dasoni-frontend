import client from "./client";

// 추모관 사진(게시글사진들) 불러오기 API
export const getPhotos = async (hallId, body) => {
  const res = await client.post(`/api/halls/${hallId}/photos`, body);
  return res.data.photos;
};

// 추모관 정보(방문시) 불러오기 API
export const getHallInfo = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}`);
  return res.data;
};
