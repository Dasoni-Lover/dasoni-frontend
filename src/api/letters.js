//letters.js

import client from "./client";

// 편지 보내기/임시저장하기
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
  const data = res.data || {}; // { open: true/false, set: true/false }

  return {
    isOpen: data.open ?? false,
    isSet: data.set ?? false,
  };
};

// 오늘 편지 보냈는지 여부 체크
export const checkLetterSentToday = async (hallId) => {
  try {
    const res = await client.get(`/api/halls/${hallId}/letters/check`);

    const data = res.data || {};

    return {
      isSendToday: data.sendToday ?? false,
    };
  } catch (err) {
    console.error("❌ 오늘 편지 전송 여부 체크 실패:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err;
  }
};

// 보낸 편지 리스트 조회
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

// 편지 달력 조회
export const fetchLettersCalendar = async (hallId, year, month) => {
  const res = await client.get(
    `/api/halls/${hallId}/letters/calendar?year=${year}&month=${month}`
  );
  return res.data?.days || []; // [{ date, letterId }]
};

// 보낸 편지 삭제
export const deleteLetter = async (hallId, letterId) => {
  return client.post(`/api/halls/${hallId}/letters/${letterId}/delete`);
};

// 받은 편지함 전체 조회
export const fetchReceivedReplies = async (hallId) => {
  try {
    const res = await client.get(`/api/halls/${hallId}/letters/reply/list`);
    const { totalCount, unreadCount, readCount, replies } = res.data || {};

    return {
      totalCount: totalCount ?? 0,
      unreadCount: unreadCount ?? 0,
      readCount: readCount ?? 0,
      replies:
        replies?.map((r) => ({
          replyId: r.replyId,
          createdAt: r.createdAt,
          isChecked: r.isChecked,
        })) || [],
    };
  } catch (err) {
    console.error("❌ 받은 편지함 조회 실패:", err.response?.data || err);
    throw err;
  }
};

// 받은 편지 상세 조회
export const fetchReceivedReplyDetail = async (hallId, replyId) => {
  try {
    const res = await client.get(
      `/api/halls/${hallId}/letters/reply/${replyId}`
    );
    return {
      toName: res.data?.toName || "",
      fromName: res.data?.fromName || "",
      content: res.data?.content || "",
      audioUrl: res.data?.audioUrl || null,
      createdAt: res.data?.date || "",
    };
  } catch (err) {
    console.error("❌ 받은 편지 상세 조회 실패:", err.response?.data || err);
    throw err;
  }
};

//임시보관함

export const fetchTempLettersList = async (hallId) => {
  try {
    const res = await client.get(`/api/halls/${hallId}/letters/temp/list`);

    console.log("📌 임시보관함 응답:", res.data);

    const letters = res.data?.letters || [];

    return letters.map((l) => {
      console.log("🔍 each letter:", l);
      return {
        ...l,
        letterId: l.letterId,
        createdAt: l.date,
        excerpt: l.content?.slice(0, 20) || "", // 리스트 미리보기용(선택)
        isWanted: l.isWanted,
      };
    });
  } catch (err) {
    console.error("❌ 임시보관함 목록 조회 실패:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err;
  }
};

// 임시보관함 편지 상세 조회
export const fetchTempLetterDetail = async (hallId, letterId) => {
  try {
    const res = await client.get(
      `/api/halls/${hallId}/letters/temp/${letterId}`
    );
    return res.data; // { toName, fromName, content }
  } catch (err) {
    console.error("❌ 임시보관함 편지 상세 조회 실패:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err;
  }
};

// 임시보관함 편지 삭제
export const deleteTempLetter = async (hallId, letterId) => {
  try {
    const res = await client.delete(
      `/api/halls/${hallId}/letters/temp/${letterId}/delete`
    );

    console.log("🗑️ 임시보관함 편지 삭제 완료:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 임시보관함 편지 삭제 실패:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err;
  }
};

// 나(me)에게 편지 남기기
export const sendMyLetter = async (body) => {
  try {
    console.log("📨 sendMyLetter 요청:", body);

    const res = await client.post("/api/halls/me/letters/send", body);

    console.log("📨 sendMyLetter 응답:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ sendMyLetter 에러:", {
      status: err.response?.status,
      data: err.response?.data,
    });
    throw err;
  }
};

// 초기 고인 정보 설정 생성
export const createLetterSettings = async (hallId, payload) => {
  const res = await client.post(
    `/api/halls/${hallId}/letters/settings/create`,
    payload
  );
  return res.data;
};

//고인 정보 설정 조회
export const getLetterSettings = async (hallId) => {
  try {
    const res = await client.get(`/api/halls/${hallId}/letters/settings`);
    return res.data; // 설정 있으면 위 명세 예시 형태
  } catch (e) {
    // 설정이 아예 없는 경우 404로 내려올 수 있으니 안전하게 null 반환
    if (e.response && e.response.status === 404) {
      return null;
    }
    throw e;
  }
};

// 고인 정보 수정
export const updateLetterSettings = (hallId, body) =>
  client.post(`/api/halls/${hallId}/letters/settings/update`, body);
