// src/features/MemorialHall/components/MyRecord.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UnderlineButton } from "./UnderlineButtton";
import FoldableButton from "./FoldableButton";
import VisitorList from "./VisitorList";
import { getRequestList, getVisitorList } from "../../../api/visitor";

import upicon from "../assets/up-icon.svg";
import downicon from "../assets/dropdown-icon.png";

export default function MyRecord({ hallId }) {
  const [openAll, setOpenAll] = useState(false);
  const [activeTab, setActiveTab] = useState("request");

  const [requestList, setRequestList] = useState([]);
  const [visitorList, setVisitorList] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [data, setData] = useState([]);

  // 🔄 초기 데이터 불러오기
  const fetchData = async () => {
    try {
      const [requestRes, visitorRes] = await Promise.all([
        getRequestList(hallId),
        getVisitorList(hallId),
      ]);

      const requestList = (requestRes.requestList ?? [])
        .map((r) => ({
          requestId: r.requestId,
          name: r.name,
          relation: r.relation,
          natures: r.natures?.slice(0, 3) ?? [],
          review: r.review,
          detail: r.detail,
        }))
        .sort((a, b) => b.requestId - a.requestId);

      const visitorList = (visitorRes.visitors ?? [])
        .map((v) => ({
          visitorId: v.userId,
          name: v.name,
          relation: v.relation,
          natures: v.natures?.slice(0, 3) ?? [],
          review: v.review,
          detail: v.detail,
        }))
        .sort((a, b) => b.visitorId - a.visitorId);

      setRequestList(requestList);
      setVisitorList(visitorList);
      setRequestCount(requestRes.requestCount ?? requestList.length);
      setVisitorCount(visitorRes.visitorCount ?? visitorList.length);

      setData(activeTab === "request" ? requestList : visitorList);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
      setRequestList([]);
      setVisitorList([]);
      setRequestCount(0);
      setVisitorCount(0);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, hallId]);

  // 🔥 요청 수락/거절 후 실시간 반영
  const handleActionComplete = (item, isAccept) => {
    if (!item) return;

    if (isAccept) {
      setRequestList((prev) =>
        prev.filter((r) => r.requestId !== item.requestId)
      );
      setVisitorList((prev) => [item, ...prev]);
      setVisitorCount((prev) => prev + 1);
    } else {
      setRequestList((prev) =>
        prev.filter((r) => r.requestId !== item.requestId)
      );
    }

    setRequestCount((prev) => prev - 1);

    setData(
      activeTab === "request"
        ? requestList.filter((r) => r.requestId !== item.requestId)
        : isAccept
        ? [item, ...visitorList]
        : visitorList
    );
  };
  // 🔥 방문자 내보내기 후 실시간 반영
  const handleKickComplete = (item) => {
    if (!item) return;

    setVisitorList((prev) =>
      prev.filter((v) => v.visitorId !== item.visitorId)
    );
    setVisitorCount((prev) => Math.max(0, prev - 1));

    // 현재 탭이 "추모객 명단"일 때 화면에서 바로 제거
    if (activeTab === "visitor") {
      setData((prev) => prev.filter((v) => v.visitorId !== item.visitorId));
    }
  };

  return (
    <Wrapper>
      <Container>
        <ButtonWrapper>
          <UnderlineButton
            text="입장 요청"
            count={requestCount}
            type={activeTab === "request" ? "click" : "false"}
            onClick={() => setActiveTab("request")}
          />
          <UnderlineButton
            text="추모객 명단"
            count={visitorCount}
            type={activeTab === "visitor" ? "click" : "false"}
            onClick={() => setActiveTab("visitor")}
          />
        </ButtonWrapper>

        <DropDownWrapper>
          <FoldableButton
            text="모두 접기"
            src={upicon}
            onClick={() => setOpenAll(false)}
          />
          <FoldableButton
            text="모두 펼치기"
            src={downicon}
            onClick={() => setOpenAll(true)}
          />
        </DropDownWrapper>
      </Container>

      <VisitorList
        data={data}
        openAll={openAll}
        type={activeTab}
        hallId={hallId}
        onActionComplete={handleActionComplete} // 요청 수락/거절
        onKickComplete={handleKickComplete} //  내보내기
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 36.8rem;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 2rem;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 0.75rem;
`;
