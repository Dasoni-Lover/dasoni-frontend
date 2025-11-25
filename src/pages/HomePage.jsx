// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HallTab from "../features/MemorialHall/components/HallTab";
import { CardList } from "../features/Home/components/CardList";
import { MemorialHallCount } from "../features/Home/components/MemorialHallCount";
import { NoneList } from "../features/Home/components/NoneList"
import { color, typo } from "../styles/tokens";
import { fetchMyHalls, fetchManagedHalls } from "../api/user";

export const HomePage = () => {
  const [myHalls, setMyHalls] = useState([]);
  const [managedHalls, setManagedHalls] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

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

        setMyHalls(my?.halls || []);
        setManagedHalls(managed?.halls || []);
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

  const currentHalls = activeTab === 0 ? myHalls : managedHalls;
  const isEmpty = currentHalls.length === 0;

  return (
    <Wrapper>
      <Text>홈</Text>

      <HallTab role="home" activeIndex={activeTab} onTabChange={setActiveTab} />

      {isLoading && <div style={{ marginTop: "2rem" }}>로딩 중...</div>}
      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      <Content>
        {/* 🔹 갯수가 있을 때만 MemorialHallCount 보임 */}
        {!isEmpty && (
          <MemorialHallCount count={currentHalls.length} tab={activeTab} />
        )}

        {/* 🔹 갯수가 0개면 NoneList 표시 */}
        {isEmpty ? (
          <NoneList tab={activeTab} />
        ) : (
          <CardList
            halls={currentHalls}
            type={activeTab === 1 ? "managed" : "my"}
          />
        )}
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
