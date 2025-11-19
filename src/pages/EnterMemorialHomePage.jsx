// src/pages/EnterMemorialHomePage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardList } from "../features/Home/components/CardList";
import { SearchTab } from "../features/EnterMemorialHome/components/SearchTab";
import { EnterModal } from "../features/EnterMemorialHome/components/EnterModal";
import { color, typo } from "../styles/tokens";
import { searchHalls } from "../api/search-hall";

export const EnterMemorialHomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // ===== 페이지 로드 시 전체 추모관 가져오기 =====
  useEffect(() => {
    const fetchAllHalls = async () => {
      try {
        const halls = await searchHalls({ name: null, birthday: null, deadDay: null });
        setSearchResults(halls);
      } catch (err) {
        console.error("전체 추모관 불러오기 실패:", err);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchAllHalls();
  }, []);

  return (
    <Wrapper>
      <Text>추모관 입장하기</Text>
      <SearchTab onSearchResult={setSearchResults} />
      <Content>
        {loadingInitial ? (
          <LoadingText>로딩중...</LoadingText>
        ) : (
          <CardList halls={searchResults} onOpenModal={handleOpenModal} />
        )}
      </Content>

      {modalVisible && <EnterModal onClose={handleCloseModal} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 68.5rem;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const Text = styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin-bottom: 4rem;
  margin-top: 4.37rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin-top: 2.5rem;
`;

const LoadingText = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;
