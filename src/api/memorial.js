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

// 게시글 상세 조회 API
export const getPhotoDetail = async (hallId, photoId) => {
  const res = await client.get(`/api/halls/${hallId}/photos/${photoId}`);
  return res.data; // { url, name, myProfile, content, isAI, uploadedAt, occurredAt, isMine, isAdmin }
};

// ✅ 게시글 수정
export const updatePhoto = async (hallId, photoId, body) => {
  const res = await client.patch(
    `/api/halls/${hallId}/photos/${photoId}/update`,
    body
  );
  return res.data;
};

// ✅ 게시글 삭제
export const deletePhoto = async (hallId, photoId) => {
  const res = await client.delete(
    `/api/halls/${hallId}/photos/${photoId}/delete`
  );
  return res.data;
};
