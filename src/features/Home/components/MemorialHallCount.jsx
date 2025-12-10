// src/features/Home/components/MemorialHallCount.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Icon from "../assets/icon-search2.svg";
import deleteicon from "../../../assets/icon-delete.svg";

export const MemorialHallCount = ({onSearch }) => {
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword.trim());
  };

  const hasKeyword = keyword.trim().length > 0;

  return (
    <Wrapper>
      <ButtonRow>
          <Button
            text="추모관 입장하기"
            size="M"
            width="13.75rem"
            color="white"
            icon="add2"
            height="2.75rem"
            onClick={() => nav("/enter")}
          />
          <Button
            text="새 추모관 개설하기"
            size="M"
            width="13.75rem"
            color="white"
            icon="add2"
            height="2.75rem"
            onClick={() => nav("/open")}
          />
        </ButtonRow>
      <Container>
        {/* 검색 영역 */}
        <InputWrapper>
          <StyledInput
            placeholder="이름을 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <ButtonWrapper>
            <ResetButton
              onClick={() => {
                setKeyword("");
                onSearch("");
              }}
              $visible={hasKeyword}
            >
              <Reset src={deleteicon} />
            </ResetButton>

            <SearchButton type="button" onClick={handleSearch}>
              <img src={Icon} alt="search" />
            </SearchButton>
          </ButtonWrapper>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

/* ===== styles ===== */

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.25rem;
`;

const Text = styled.div`
  ${typo("h4")};
  color: ${color("black.30")};
`;

const InputWrapper = styled.div`
  display: flex;
  width: 21.3125rem;
  height: 3.25rem;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.375rem;
  border: 2px solid #e9e9e9;
  background: #fff;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 13.5rem;
  height: 100%;
  border: none;
  background: transparent;
  ${typo("h4")};
  outline: none;

  &::placeholder {
    color: ${color("black.10")};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.62rem;
`;

const SearchButton = styled.button`
  border: none;
  background: transparent;
  padding: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ResetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
`;

const Reset = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;
