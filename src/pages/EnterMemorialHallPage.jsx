import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardListEnter } from "../features/EnterMemorialHall/components/CardListEnter";
import { SearchTab } from "../features/EnterMemorialHall/components/SearchTab";
import { EnterModal } from "../features/EnterMemorialHall/components/EnterModal";
import { color, typo } from "../styles/tokens";
import { searchHalls } from "../api/search-hall";
import { NoneList } from "../features/Home/components/NoneList";

export const EnterMemorialHallPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const handleOpenModal = (hall) => {
    setSelectedHall(hall);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setSelectedHall(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchAllHalls = async () => {
      try {
        const halls = await searchHalls({
          name: null,
          birthday: null,
          deadDay: null,
        });
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
      <Text>추모관 검색</Text>
      <SearchTab onSearchResult={setSearchResults} />
      <Content>
        {loadingInitial ? (
          <LoadingText>로딩중...</LoadingText>
        ) : searchResults.length === 0 ? (
          <NoneList
            tab={1}
            bgColor="#fff"
            borderColor="#e9e9e9"
            buttonColor="white"
            openTexts={[
              "입력하신 정보와 일치하는 추모관이 없어요.",
              "성함 혹은 생일, 기일을 확인하거나, 직접 추모관을 개설해보시는 건 어떨까요?",
            ]}
          />
        ) : (
          <CardListEnter halls={searchResults} onOpenModal={handleOpenModal} />
        )}
      </Content>

      {modalVisible && (
        <EnterModal hall={selectedHall} onClose={handleCloseModal} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 82.5rem;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const Text = styled.div`
  ${typo("h1")};
  color: ${color("black.100")};
  margin: 2.5rem 0;
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
