import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../styles/tokens";
import { AlarmListitem } from "./AlarmListitem";
import { fetchNotifications, closeNotification } from "../../api/notification";

export const AlarmList = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // 알림 불러오기
  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      console.log("🚀 서버에서 받은 알림 데이터:", data);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("알림 불러오기 실패:", err);
    }
  };

  // 삭제 버튼(X) 눌렀을 때
  const handleDelete = async (id) => {
    try {
      await closeNotification(id);
      setNotifications((prev) =>
        prev.filter((item) => item.notificationId !== id)
      );
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  // 알림 항목 클릭했을 때: 이동 + close 처리
  const handleItemClick = async (item) => {
    const id = item.notificationId;
     console.log("📌 알림 클릭됨:", item);
     console.log("📌 hallId:", item.hallId);

    try {
      // 알림 닫기 API 호출
      await closeNotification(id);

      // UI에서 제거
      setNotifications((prev) =>
        prev.filter((noti) => noti.notificationId !== id)
      );
    } catch (err) {
      console.error("알림 닫기 실패:", err);
    }

    // ==== 이동 규칙 ====
    switch (item.kind) {
      case "입장 요청":
        navigate(`/memorial?h=${item.hallId}`);
        break;

      case "입장 승인":
        navigate(`/memorial?h=${item.hallId}`);
        break;

      case "편지 도착":
        //navigate(`/letters/inbox`); // 임시 설정
        break;

      case "생일 알림":
      case "기일 알림":
      case "설날 알림":
      case "추석 알림":
        //navigate(`/letters/send`); // 일단 편지쓰기 화면으로
        break;

      default:
        console.warn("알 수 없는 알림 종류:", item.kind);
        break;
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container>
      {notifications.length === 0 && <Empty>새로운 알림이 없어요.</Empty>}

      {notifications.map((item) => (
        <AlarmListitem
          key={item.notificationId}
          tagText={item.kind}
          title={item.title}
          content={item.body}
          hallId={item.hallId} 
          onDelete={() => handleDelete(item.notificationId)}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Empty = styled.div`
  display: flex;
  height: 7.75rem;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.1875rem;
  border-radius: 1.25rem;
  border: 1px solid #e9e9e9;
  background: #fff4e6;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.02);
  ${typo("h4")}
  color: ${color("black.50")};
`;
