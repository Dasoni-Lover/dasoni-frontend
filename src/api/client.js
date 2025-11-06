// src/api/client.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// 기본 axios 인스턴스
const client = axios.create({
  baseURL: API_BASE_URL,
});

// ===== 요청 인터셉터: access_token 자동 헤더 첨부 =====
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===== 응답 인터셉터: 401 나오면 /api/users/refresh로 토큰 갱신 =====
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 이고, 아직 재시도 안 했을 때
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      // 이미 다른 요청이 리프레시 중이면 큐에 넣고 기다리기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(client(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 상대 경로 사용 → localhost:5173 기준 /api/users/refresh 로 나감
        const res = await client.get("/api/users/refresh", {
          params: { refreshToken },
        });

        const { access_token, refresh_token } = res.data || {};

        if (access_token) {
          localStorage.setItem("access_token", access_token);
        }
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        isRefreshing = false;
        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
