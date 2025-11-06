// src/api/auth.js
import client from "./client";

export const setAuthTokens = (data) => {
  const access = data.access_token || data.accessToken;
  const refresh = data.refresh_token || data.refreshToken;

  if (access) {
    localStorage.setItem("access_token", access);
  }
  if (refresh) {
    localStorage.setItem("refresh_token", refresh);
  }
};

export const clearAuthTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

// 로그인
export const loginUser = async (body) => {
  const res = await client.post("/api/users/login", body);
  return res.data;
};

// 로그아웃
export const logoutUser = async () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const body = refreshToken ? { refreshToken } : {};

  const res = await client.post("/api/users/logout", body, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  return res.data;
};

// 토큰 갱신
export const refreshToken = async () => {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  const res = await client.get("/api/users/refresh", {
    params: { refreshToken: refreshTokenValue },
  });

  const data = res.data || {};
  setAuthTokens(data);
  return data;
};
