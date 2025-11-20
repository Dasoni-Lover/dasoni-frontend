// src/api/memorial-album.js
import client from "./client";

//추모 앨범 게시글 업로드
export const uploadPhotoPost = async ({
  url,
  content,
  occurredAt,
  isPrivate,
  isAI,
  hallId,
}) => {
  const body = {
    url,
    content,
    occurredAt,
    isPrivate,
    isAI,
  };

  console.log("📤 uploadPhotoPost payload:", body, "hallId:", hallId);

  // hallId를 path param으로 사용
  const res = await client.patch(`/api/halls/${hallId}/photos/upload`, body);

  return res.data; // { photoId: number }
};

// 2) 추모 앨범 게시글 AI 사진 생성

export const generateAIImage = async ({ images, prompt, hallId }) => {
  const body = {
    images,
    prompt,
  };

  console.log("📤 generateAIImage payload:", JSON.stringify(body, null, 2));
  console.log("📌 hallId:", hallId);

  const res = await client.post(`/api/halls/${hallId}/photos/ai`, body);
  return res.data; // { generatedImage: "base64..." }
};
