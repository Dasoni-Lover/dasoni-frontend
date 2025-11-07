// src/api/user.js
import client from "./client";

// 아이디 중복확인
export const checkDuplicateId = async (logId) => {
  const res = await client.get(`/api/users/register/check`, {
    params: { logid: logId },
  });
  return res.data; // { isAvailable: true/false }
};

// 회원가입
export const registerUser = async (body) => {
  const res = await client.post(`/api/users/register`, body);
  return res.data;
};

// 사이드바 정보 조회
export const getSidebarInfo = async () => {
  const res = await client.get("/api/halls/sidebar");
  return res.data;
};

// 내가 입장한 추모관 목록 조회
export const fetchMyHalls = async () => {
  const res = await client.get("/api/halls/home");
  return res.data;
};

// 내가 관리하는 추모관 목록
export const fetchManagedHalls = async () => {
  const res = await client.get("/api/halls/home/manage");
  return res.data;
};
