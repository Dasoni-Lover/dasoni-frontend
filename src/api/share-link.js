// src/api/share-link.js
import client from "./client";

/**
 * 공유링크 발급 (만료 3일, 매번 새 링크)
 * POST /api/halls/{hallId}/share-links
 * res: { shareUrl: "https://dasoni-frontend.vercel.app/share-links/{code}" }
 */
export const createShareLink = async (hallId) => {
  if (!hallId) throw new Error("hallId가 없습니다.");

  const res = await client.post(`/api/halls/${hallId}/share-links`);
  return res.data; // { shareUrl }
};

/**
 * 공유링크 검증/해석
 * GET /api/share-links/{code}
 * res: { hallId: 123 }
 * - 410: 만료
 * - 404: 잘못된 링크
 */
export const getShareLinkInfo = async (code) => {
  if (!code) throw new Error("code가 없습니다.");

  const res = await client.get(`/api/share-links/${code}`);
  return res.data; // { hallId }
};

/**
 * 내 입장(관계) 등록 여부 확인
 * GET /api/halls/{hallId}/relations/me
 * res: { isRegistered: true/false }
 */
export const getMyHallRelation = async (hallId) => {
  if (!hallId) throw new Error("hallId가 없습니다.");

  const res = await client.get(`/api/halls/${hallId}/relations/me`);
  return res.data; // { isRegistered }
};
