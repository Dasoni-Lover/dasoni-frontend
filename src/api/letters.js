import client from "./client";

// 편지 쓰기/임시저장
export const sendLetter = async (hallId, body) => {
  try {
    const res = await client.post(`/api/halls/${hallId}/letters/send`, body);
    return res.data; // 정상: 200, 실패: { message: "이미 편지를 보냈어요" }
  } catch (err) {
    throw err.response?.data || err;
  }
};

// 편지 작성 가능 여부 체크 (추모관 열림 + AI 정보 입력)
export const getLetterStatus = async (hallId) => {
  const res = await client.get(`/api/halls/${hallId}/letters`);
  return res.data; // { isOpen: true, isSet: true }
};
