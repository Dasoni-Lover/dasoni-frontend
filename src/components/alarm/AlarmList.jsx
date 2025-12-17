// AlarmList.jsx

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../styles/tokens";
import { AlarmListitem } from "./AlarmListitem";
import { closeNotification } from "../../api/notification";

export const AlarmList = ({ notifications, onUpdateNotifications }) => {
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);
  const scrollbarRef = useRef(null);

  const [scrollbarHeight] = useState(10.4375 * 16); // rem → px
  const [isScrollable, setIsScrollable] = useState(false);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const scrollStartTop = useRef(0);

  const navigate = useNavigate();

  /* 스크롤바 이동가능 영역 margin */
  const topMargin = 16;
  const bottomMargin = -20;

  /* 알림 삭제 */
  const handleDelete = async (id) => {
    try {
      await closeNotification(id);
      onUpdateNotifications();
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  /* 알림 클릭 */
  const handleItemClick = async (item) => {
    const id = item.notificationId;

    try {
      await closeNotification(id);
      onUpdateNotifications();
    } catch (err) {
      console.error("알림 닫기 실패:", err);
    }

    let path = "/";
    let state = {};

    switch (item.kind) {
      case "입장 요청":
      case "입장 승인":
        path = "/memorial";
        state = { hallId: item.hallId };
        break;

      case "편지 도착":
        path = "/received-letterbox";
        state = { hallId: item.hallId };
        break;

      case "생일 알림":
      case "기일 알림":
      case "설날 알림":
      case "추석 알림":
        path = "/sent-letterbox";
        state = { hallId: item.hallId };
        break;

      default:
        break;
    }

    navigate(path, { state });
  };

  /* 리스트 스크롤 → 스크롤바 위치 sync */
  useEffect(() => {
    const container = containerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!container || !scrollbar) return;

    const syncScroll = () => {
      if (!isScrollable) return;

      const maxTop =
        container.clientHeight - scrollbarHeight - topMargin - bottomMargin;

      const ratio =
        container.scrollTop /
        (container.scrollHeight - container.clientHeight);

      const newTop = topMargin + ratio * maxTop;
      scrollbar.style.top = `${newTop}px`;
    };

    container.addEventListener("scroll", syncScroll);
    return () => container.removeEventListener("scroll", syncScroll);
  }, [scrollbarHeight, isScrollable]);

  /* custom scrollbar drag */
  const startDrag = (e) => {
    if (!isScrollable) return;

    isDragging.current = true;
    dragStartY.current = e.clientY;

    const currentTop = parseFloat(scrollbarRef.current.style.top || topMargin);
    scrollStartTop.current = currentTop;

    e.preventDefault();
  };

  const onDrag = (e) => {
    if (!isDragging.current || !isScrollable) return;

    const container = containerRef.current;
    const scrollbar = scrollbarRef.current;

    const delta = e.clientY - dragStartY.current;

    const maxTop =
      container.clientHeight - scrollbarHeight - topMargin - bottomMargin;

    let newTop = scrollStartTop.current + delta;

    newTop = Math.max(topMargin, Math.min(newTop, maxTop + topMargin));
    scrollbar.style.top = `${newTop}px`;

    const ratio = (newTop - topMargin) / maxTop;
    container.scrollTop =
      ratio * (container.scrollHeight - container.clientHeight);
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", endDrag);

    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", endDrag);
    };
  }, []);

  /* 자동 높이 계산 + 스크롤 필요 여부 판단 */
  useEffect(() => {
    if (!containerRef.current || notifications.length === 0) {
      setIsScrollable(false);
      return;
    }

    const firstItem = firstItemRef.current;
    if (!firstItem) return;

    const itemHeight = firstItem.offsetHeight;
    const maxVisibleCount = 6;
    const maxHeight = itemHeight * maxVisibleCount;

    const container = containerRef.current;
    container.style.maxHeight = `${maxHeight}px`;

    setIsScrollable(container.scrollHeight > container.clientHeight);
  }, [notifications]);

  return (
    <Wrapper>
      <Container ref={containerRef}>
        {notifications.length === 0 && <Empty>새로운 알림이 없어요.</Empty>}

        {notifications.map((item, idx) => (
          <div key={item.notificationId} ref={idx === 0 ? firstItemRef : null}>
            <AlarmListitem
              tagText={item.kind}
              title={item.title}
              content={item.body}
              date={item.date}
              hallId={item.hallId}
              onDelete={() => handleDelete(item.notificationId)}
              onClick={() => handleItemClick(item)}
            />
          </div>
        ))}
      </Container>

      {/* custom scrollbar: 스크롤 가능할 때만 보임 */}
      <Scrollbar
        ref={scrollbarRef}
        onMouseDown={startDrag}
        style={{
          top: `${topMargin}px`,
          display: isScrollable ? "block" : "none",
        }}
      />
    </Wrapper>
  );
};

/* ========== styles ========== */

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background: #fff4e6;
  border-radius: 0 0 1.875rem 1.875rem;
`;

const Container = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Scrollbar = styled.div`
  position: absolute;
  right: 0.31rem;
  width: 0.375rem;
  height: 10.4375rem;
  background: #7a7a7a;
  border-radius: 1.25rem;
  cursor: pointer;
  z-index: 10;
`;

const Empty = styled.div`
  display: flex;
  height: 7.75rem;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.1875rem;
  ${typo("h4")}
  color: ${color("black.50")};
  background: #fff4e6;
  border: 1px solid #e9e9e9;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
`;
