import React, { useState } from "react";
import styled from "styled-components";
import { CardList } from "../features/Home/components/CardList";
import { SearchTab } from "../features/EnterMemorialHome/components/SearchTab";
import { EnterModal } from "../features/EnterMemorialHome/components/EnterModal";
import { color, typo } from "../styles/tokens";

export const EnterMemorialHomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Wrapper>
      <Text>추모관 입장하기</Text>
      <SearchTab />
      <Content>
        <CardList onOpenModal={handleOpenModal} />
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
