import client from "./client";

/**
 * 고인 정보로 추모관 검색
 * @param {Object} body { name, birthday, deadDay }
 * @returns {Promise<Array>} halls
 */
export const searchHalls = async (body) => {
  const res = await client.post("/api/halls/search", body);
  return res.data.halls || [];
};
