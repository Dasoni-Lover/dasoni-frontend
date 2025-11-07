// src/api/memorial-album.js
import client from "./client";

const DEFAULT_HALL_ID = 1; // TODO: 나중에 실제 hallId 연동 예정

/**
 * 1) 추모 앨범 게시글 업로드
 * PATCH /api/halls/{hall_id}/photos/upload
 */
export const uploadPhotoPost = async ({
  url,
  content,
  occurredAt,
  isPrivate,
  isAI,
  hallId = DEFAULT_HALL_ID,
}) => {
  const body = {
    url,
    content,
    occurredAt,
    isPrivate,
    isAI,
  };

  console.log("📤 uploadPhotoPost payload:", body, "hallId:", hallId);

  // ✅ hallId를 path param으로
  const res = await client.patch(`/api/halls/${hallId}/photos/upload`, body);

  return res.data; // { photoId: number }
};

/**
 * 2) 추모 앨범 게시글 AI 사진 생성
 * POST /api/halls/{hall_id}/photos/ai
 */
export const generateAIImage = async ({
  images,
  prompt,
  hallId = DEFAULT_HALL_ID,
}) => {
  const body = {
    images,
    prompt,
  };

  console.log("📤 generateAIImage payload:", body, "hallId:", hallId);

  // ✅ hallId를 path param으로
  const res = await client.post(`/api/halls/${hallId}/photos/ai`, body);

  // 응답: { generatedImage: "base64..." }
  return res.data;
};
