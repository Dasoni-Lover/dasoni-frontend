// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HallTab from "../features/MemorialHall/components/HallTab";
import { CardList } from "../features/Home/components/CardList";
import { MemorialHallCount } from "../features/Home/components/MemorialHallCount";
import { NoneList } from "../features/Home/components/NoneList";
import { color, typo } from "../styles/tokens";
import { fetchMyHalls, fetchManagedHalls } from "../api/user";

export const HomePage = () => {
  const [myHalls, setMyHalls] = useState([]);
  const [managedHalls, setManagedHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 fetch
  useEffect(() => {
    const loadHalls = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [my, managed] = await Promise.all([
          fetchMyHalls(),
          fetchManagedHalls(),
        ]);

        setMyHalls(my?.halls || []);
        setManagedHalls(managed?.halls || []);
      } catch (e) {
        console.error("추모관 목록 불러오기 실패:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadHalls();
  }, []);

  // 🔹 현재 탭 데이터
  const originalHalls = activeTab === 0 ? myHalls : managedHalls;
  const hallsToShow = filteredHalls ?? originalHalls;

  const isOriginalEmpty = originalHalls.length === 0;
  const isSearchEmpty = filteredHalls !== null && filteredHalls.length === 0;

  // 🔹 탭 바뀌면 검색 초기화
  useEffect(() => {
    setFilteredHalls(null);
  }, [activeTab]);

  // 🔹 검색 처리
  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredHalls(null);
      return;
    }

    const filtered = originalHalls.filter((hall) =>
      hall.name.includes(keyword)
    );

    setFilteredHalls(filtered);
  };

  return (
    <Wrapper>
      <Text>홈</Text>

      <HallTab role="home" activeIndex={activeTab} onTabChange={setActiveTab} />

      <Content>
        {!isOriginalEmpty && (
          <MemorialHallCount
            count={originalHalls.length}
            tab={activeTab}
            onSearch={handleSearch}
          />
        )}

        {/* 🔹 원본이 완전히 없을 때만 NoneList 표시 */}
        {isOriginalEmpty ? (
          <NoneList tab={activeTab} />
        ) : (
          <CardList
            halls={hallsToShow} // 검색 결과 0개면 [] 전달됨
            type={activeTab === 1 ? "managed" : "my"}
          />
        )}

        {/* 🔹 검색결과 0개면 아래처럼 아무 카드도 없지만 NoneList는 안 뜸 */}
        {isSearchEmpty && (
          <div style={{ marginTop: "1rem", color: color("black.20") }}>
    
          </div>
        )}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 82.5rem;
  flex-direction: column;
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
  margin-top: 2.5rem;
`;
