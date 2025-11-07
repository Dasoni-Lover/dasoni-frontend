import client from "./client";

// 편지 보내기
export const sendLetter = async (hallId, body) => {
  try {
    console.log("📨 sendLetter 요청:", { hallId, body });
    const res = await client.post(`/api/halls/${hallId}/letters/send`, body);
    console.log("📨 sendLetter 응답:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ sendLetter 에러:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err; // <- 원본 에러 그대로 던지기
  }
};

// 편지 작성 가능 여부 체크
export const getLetterStatus = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}/letters`);
  const data = res.data; // { open: true/false, set: true/false }

  return {
    isOpen: data.open,
    isSet: data.set,
  };
};

// 편지 리스트 조회
export const fetchLettersList = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}/letters/list`);
  const lettersData = res.data?.letters || [];
  return lettersData
    .map((l) => ({ ...l, completedAt: l.date })) // date → completedAt
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
};

// 편지 상세 조회
export const fetchLetterDetail = async (hallId, letterId) => {
  const res = await client.get(`/api/halls/${hallId}/letters/${letterId}`);
  return res.data; // { toName, fromName, content, completedAt }
};
