// src/api/ai.js

import client from "./client";

/**
 * 🧠 AI 이미지 생성 API
 * - POST /api/halls/{hall_id}/photos/ai
 */
export const generateAIImage = async (hallId, body) => {
  try {
    const res = await client.post(`/api/halls/${hallId}/photos/ai`, body);
    return res.data.generatedImage; // base64 이미지 문자열
  } catch (error) {
    console.error("❌ AI 이미지 생성 실패:", error);
    throw error;
  }
};
