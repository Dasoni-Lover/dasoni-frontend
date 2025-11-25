// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HallTab from "../features/MemorialHall/components/HallTab";
import { CardList } from "../features/Home/components/CardList";
import { MemorialHallCount } from "../features/Home/components/MemorialHallCount";
import { color, typo } from "../styles/tokens";
import { fetchMyHalls, fetchManagedHalls } from "../api/user";

export const HomePage = () => {
  const [myHalls, setMyHalls] = useState([]); // 내가 입장한 추모관
  const [managedHalls, setManagedHalls] = useState([]); // 내가 관리하는 추모관
  const [activeTab, setActiveTab] = useState(0); // 0: 입장, 1: 관리

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHalls = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [my, managed] = await Promise.all([
          fetchMyHalls(),
          fetchManagedHalls(),
        ]);

        const myList = my?.halls || [];
        const managedList = managed?.halls || [];

        setMyHalls(myList);
        setManagedHalls(managedList);
      } catch (e) {
        console.error("추모관 목록 불러오기 실패:", e);
        setError(e);
        setMyHalls([]);
        setManagedHalls([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHalls();
  }, []);

  // 현재 선택된 탭에 따라 보여줄 리스트
  const currentHalls = activeTab === 0 ? myHalls : managedHalls;

  return (
    <Wrapper>
      <Text>홈</Text>
      {/* 탭 상태를 HomePage에서 제어 */}
      <HallTab role="home" activeIndex={activeTab} onTabChange={setActiveTab} />
      {isLoading && <div style={{ marginTop: "2rem" }}>로딩 중...</div>}
      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      )}
      <Content>
        {/* 현재 선택된 탭의 추모관 개수 */}
        <MemorialHallCount count={currentHalls.length} tab={activeTab} />

        {currentHalls.length === 0 && activeTab === 0 ? (
          <NoneText>입장한 추모관이 없어요</NoneText>
        ) : null}
        {currentHalls.length === 0 && activeTab === 1 ? (
          <NoneText>개설한 추모관이 없어요</NoneText>
        ) : null}
        {/* 현재 선택된 탭의 추모관 목록 */}
        <CardList
          halls={currentHalls}
          type={activeTab === 1 ? "managed" : "my"} // ✅ 관리 탭이면 managed
        />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 82.5rem;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin-bottom: 6rem;
  margin-top: 4.37rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  align-self: stretch;
  margin-top: 2.5rem;
`;

const NoneText = styled.div`
  ${typo("h4")};
  color: ${color("black.30")};
  margin-top: 9rem;
`;
