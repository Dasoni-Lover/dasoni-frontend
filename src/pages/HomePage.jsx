// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CardList } from "../features/Home/components/CardList";
import { MemorialHallCount } from "../features/Home/components/MemorialHallCount";
import { NoneList } from "../features/Home/components/NoneList";
import { color, typo } from "../styles/tokens";
import { fetchMyHalls, fetchManagedHalls } from "../api/user";

export const HomePage = () => {
  const [myHalls, setMyHalls] = useState([]);
  const [managedHalls, setManagedHalls] = useState([]);

  const [filteredMyHalls, setFilteredMyHalls] = useState(null);
  const [filteredManagedHalls, setFilteredManagedHalls] = useState(null);

  const [openMy, setOpenMy] = useState(true);
  const [openManaged, setOpenManaged] = useState(true);

  // 데이터 불러오기
  useEffect(() => {
    const loadHalls = async () => {
      const [my, managed] = await Promise.all([
        fetchMyHalls(),
        fetchManagedHalls(),
      ]);

      setMyHalls(my?.halls || []);
      setManagedHalls(managed?.halls || []);
    };

    loadHalls();
  }, []);

  // 검색
  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredMyHalls(null);
      setFilteredManagedHalls(null);
      return;
    }

    setFilteredMyHalls(
      myHalls.filter((hall) => hall.name.includes(keyword))
    );
    setFilteredManagedHalls(
      managedHalls.filter((hall) => hall.name.includes(keyword))
    );
  };

  const myList = filteredMyHalls ?? myHalls;
  const managedList = filteredManagedHalls ?? managedHalls;

  return (
    <Wrapper>
      <Title>홈</Title>

      {/* 상단 검색 + 버튼 영역 */}
      <MemorialHallCount
        myCount={myHalls.length}
        managedCount={managedHalls.length}
        onSearch={handleSearch}
      />

      {/* 개설한 추모관 토글 */}
      <ToggleSection>
        <ToggleHeader onClick={() => setOpenManaged((prev) => !prev)}>
          <Text>
          <span>개설한 추모관</span>
          <Count>{managedList.length}</Count>
          </Text>
          <RightBox>
            <Arrow>{openManaged ? "▲" : "▼"}</Arrow>
          </RightBox>
        </ToggleHeader>

        {openManaged && (
          <>
            {managedList.length === 0 ? (
              <NoneList tab={1} />
            ) : (
              <CardList halls={managedList} type="managed" />
            )}
          </>
        )}
      </ToggleSection>

      {/* 입장한 추모관 토글 */}
      <ToggleSection>
        <ToggleHeader onClick={() => setOpenMy((prev) => !prev)}>
          <Text>
          <span>입장한 추모관</span>
          <Count>{myList.length}</Count>
          </Text>
          <RightBox>
            <Arrow>{openMy ? "▲" : "▼"}</Arrow>
          </RightBox>
        </ToggleHeader>

        {openMy && (
          <>
            {myList.length === 0 ? (
              <NoneList tab={0} />
            ) : (
              <CardList halls={myList} type="my" />
            )}
          </>
        )}
      </ToggleSection>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  width: 82.5rem;
  flex-direction: column;
`;

const Title = styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin: 2.5rem 0;
`;

const ToggleSection = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
`;

const Text=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
`

const ToggleHeader = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;
  background: #FFF4E6;
  width: 82.5rem;
  height: 4.6875rem;
  padding: 0 0.75rem;
  box-sizing: border-box;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`;

const Count = styled.div`
  ${typo("bodym2")};
  color: ${color("black.30")};
`;

const Arrow = styled.div`
  font-size: 0.9rem;
`;
