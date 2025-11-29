// src/api/voice.js
import client from "./client";
import { getPresignedUrlForImage, uploadFileToS3 } from "./files";

/**
 * 음성 파일 업로드
 *  1. presigned-url 요청
 *  2. S3 업로드
 *  3. 백엔드에 파일 URL 등록
 */
export const uploadVoiceFile = async (hallId, file) => {
  if (!hallId) throw new Error("추모관 ID가 없습니다.");
  if (!file) throw new Error("파일이 없습니다.");

  // 1️⃣ presigned URL 받기
  const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
    file
  );

  // 2️⃣ S3 업로드
  await uploadFileToS3(uploadUrl, file, contentType);

  // 3️⃣ 백엔드에 URL 등록
  await client.post(`/api/halls/${hallId}/voice/upload`, {
    url: fileUrl,
  });

  return fileUrl;
};

/**
 * 음성 파일 조회
 *  - GET /api/halls/{hall_id}/voice
 *  - 응답: { url: "..." }
 */
export const getVoiceFile = async (hallId) => {
  if (!hallId) throw new Error("추모관 ID가 없습니다.");

  const res = await client.get(`/api/halls/${hallId}/voice`);
  return res.data; // { url: "..." }
};
/**
 * 음성 파일 재업로드(갱신)
 *  - PATCH /api/halls/{hall_id}/voice/update
 *  - body: { url: "..." }
 */
export const updateVoiceFile = async (hallId, file) => {
  if (!hallId) throw new Error("추모관 ID가 없습니다.");
  if (!file) throw new Error("파일이 없습니다.");

  // 1️⃣ presigned URL + fileUrl 받기
  const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
    file
  );

  // 2️⃣ S3 업로드
  await uploadFileToS3(uploadUrl, file, contentType);

  // 3️⃣ 백엔드에 fileUrl 등록 (업로드와 동일한 방식)
  await client.patch(`/api/halls/${hallId}/voice/update`, {
    url: fileUrl,
  });

  return fileUrl;
};

/**
 * 녹음 파일 삭제
 *  - DELETE /api/halls/{hall_id}/letters/voice/delete
 */
export const deleteVoiceFile = async (hallId) => {
  if (!hallId) throw new Error("추모관 ID가 없습니다.");

  const res = await client.delete(`/api/halls/${hallId}/voice/delete`);
  return res.data;
};
