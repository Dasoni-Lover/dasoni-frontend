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

// 프로필 정보 조회(사이드바 -> 헤더로 이동)
export const getProfileInfo = async () => {
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

// 내 프로필 이미지 변경
export const updateMyProfileImage = async (profileUrl) => {
  const res = await client.patch("/api/users/profile", {
    profile: profileUrl,
  });
  return res.data;
};
