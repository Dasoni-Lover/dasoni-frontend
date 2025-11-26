// src/api/visitor.js
import client from "./client";

// 1) 입장 요청 목록 조회
export const getRequestList = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}/requests`);
  return res.data;
};

// 2) 추모객 목록 조회
export const getVisitorList = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}/visitors`);
  return res.data;
};

// 3) 입장 요청 수락 / 거절
// isAccept: true → 수락
// isAccept: false → 거절
export const respondRequest = async (hallId, requestId, isAccept) => {
  const res = await client.post(`/api/halls/${hallId}/request/accept`, {
    requestId,
    isAccept,
  });
  return res.data; // {}
};

// 4) 방문자 내보내기
export const kickVisitor = async (hallId, userId) => {
  const res = await client.patch(`/api/halls/${hallId}/visitor/${userId}/out`);
  return res.data;
};
