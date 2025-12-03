// src/features/MemorialHall/components/VisitorListItem.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";
import ConfirmModal from "../../../components/ConfirmModal";
import VisitorListItemContent from "./VisitorListItemContent";
import { respondRequest, kickVisitor } from "../../../api/visitor";

import downicon from "../assets/dropdown-icon.png";
import righticon from "../assets/open-icon.svg";

export default function VisitorListItem({
  openAll,
  type,
  item,
  index,
  hallId,
  onActionComplete,
  onKickComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState("auto");
  const idWrapperRef = useRef(null);

  useEffect(() => {
    if (idWrapperRef.current) {
      setContentWidth(`${idWrapperRef.current.offsetWidth}px`);
    }
  }, []);

  useEffect(() => setIsOpen(openAll), [openAll]);

  const handleRequest = async (isAccept) => {
    try {
      console.log("=== handleRequest 호출 ===");
      console.log("요청 대상 item:", item);
      console.log("수락 여부 isAccept:", isAccept);

      const res = await respondRequest(hallId, item.requestId, isAccept);
      console.log("응답 결과:", res);

      alert(
        isAccept ? "입장 요청이 수락되었습니다." : "입장 요청이 거절되었습니다."
      );

      if (onActionComplete) onActionComplete(item, isAccept);
    } catch (err) {
      console.error("요청 처리 실패:", err);
      alert("요청 처리에 실패했습니다.");
    }
  };

  const handleKick = async () => {
    try {
      await kickVisitor(hallId, item.visitorId);
      alert("추모객을 내보냈어요.");

      if (onKickComplete) onKickComplete(item);

      setIsModalOpen(false);
    } catch (err) {
      console.error("추모객 내보내기 실패:", err);
      alert("추모객 내보내기에 실패했습니다.");
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <TopRow>
        <Wrapper onClick={toggleOpen}>
          <Open src={righticon} $isOpen={isOpen} />

          <IdWrapper ref={idWrapperRef}>
            <Id>{index}</Id>
            <Name>{item.name}</Name>
          </IdWrapper>
        </Wrapper>

        <ButtonWrapper>
          {type === "request" ? (
            <>
              <Button
                text="수락"
                size="S"
                width="6.25rem"
                onClick={() => handleRequest(true)}
              />
              <Button
                text="거절"
                size="S"
                width="6.25rem"
                color="white"
                onClick={() => handleRequest(false)}
              />
            </>
          ) : (
            <Button
              text="내보내기"
              size="S"
              width="6.25rem"
              color="white"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </ButtonWrapper>
      </TopRow>

      {/* ⭐ 항상 렌더해두고 max-height / opacity / transform으로 애니메이션 */}
      <ContentWrapper $isOpen={isOpen} style={{ width: contentWidth }}>
        <VisitorListItemContent item={item} />
      </ContentWrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        title="해당 추모객을 내보낼까요?"
        description="추모객은 다시 요청을 보낼 수 있어요"
        confirmText="내보내기"
        cancelText="취소"
        onConfirm={handleKick}
        onCancel={() => setIsModalOpen(false)}
        subImage={downicon}
        subText={item.name}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 50.5rem;
  padding: 0.5rem 0.625rem;
  align-items: center;
  gap: 1.875rem;
  cursor: pointer;
`;

const Open = styled.img`
  padding: 0.375rem;
  height: 1.5rem;

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.25s ease;
`;

const IdWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1rem;
  gap: 1rem;
  flex: 1 0 0;
`;

const Id = styled.div`
  ${typo("bodyb")};
  color: ${color("black.70")};
`;

const Name = styled.div`
  color: var(--70, #313131);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 130%;
  flex: 1 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.25rem;
`;

// 슬라이드 애니메이션 들어가는 부분
const ContentWrapper = styled.div`
  margin-left: 4.76rem;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1.88rem" : "0")};
  overflow: hidden;

  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-4px)"};

  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease,
    margin-top 0.3s ease;
`;
