// src/api/memorial-album.js
import client from "./client";
import { getPresignedUrlForImage, uploadFileToS3 } from "./files";

const DEFAULT_HALL_ID = 1; // TODO: 나중에 실제 hallId 연동 예정

/**
 * 1) 추모 앨범 게시글 업로드
 * PATCH /api/halls/{hall_id}/photos/upload
 */
export const uploadPhotoPost = async (
  file,
  { content, occurredAt, isPrivate, isAI, hallId = DEFAULT_HALL_ID }
) => {
  // 1️⃣ S3에 이미지 업로드
  const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
    file
  );

  await uploadFileToS3(uploadUrl, file, contentType);

  // 2️⃣ 서버에 게시글 정보 + 이미지 URL 전송
  const body = {
    url: fileUrl,
    content,
    occurredAt,
    isPrivate,
    isAI,
  };

  console.log("📤 uploadPhotoPost payload:", body, "hallId:", hallId);

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

  const res = await client.post(`/api/halls/${hallId}/photos/ai`, body);
  return res.data; // { generatedImage: "base64..." }
};
