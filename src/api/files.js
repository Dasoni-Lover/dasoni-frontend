// src/api/files.js
import client from "./client";

/**
 * 파일 확장자 기준으로 안전한 Content-Type 정규화
 */
export const getFileContentType = (file) => {
  if (!file) return "application/octet-stream";

  if (file.type) {
    return file.type; // 브라우저가 알고 있으면 그걸 우선 사용
  }

  const ext = file.name.split(".").pop().toLowerCase();

  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "svg":
      return "image/svg+xml";
    case "pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
};

/**
 * 이미지/파일 presigned-url 요청
 *  - file: File 객체
 * 반환: { uploadUrl, fileUrl, s3Key, expirationMinutes, contentType }
 */
export const getPresignedUrlForImage = async (file) => {
  if (!file) throw new Error("파일이 없습니다.");

  const contentType = getFileContentType(file);

  const res = await client.post("/api/files/images/presigned-url", {
    filename: file.name,
    contentType,
    fileSize: file.size,
  });

  return {
    ...res.data, // uploadUrl, fileUrl, s3Key, expirationMinutes
    contentType,
  };
};

// 오디오전용
export const getPresignedUrlForAudio = async (file) => {
  if (!file) throw new Error("파일이 없습니다.");

  const contentType = getFileContentType(file);

  const res = await client.post("/api/files/audios/presigned-url", {
    filename: file.name,
    contentType,
    fileSize: file.size,
  });

  return {
    ...res.data, // uploadUrl, fileUrl, s3Key, expirationMinutes
    contentType,
  };
};

/**
 * presigned-url로 S3에 실제 업로드
 */
export const uploadFileToS3 = async (uploadUrl, file, contentType) => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType || "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`S3 업로드 실패 (status=${res.status})`);
  }
};
