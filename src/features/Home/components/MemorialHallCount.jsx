// src/features/Home/components/MemorialHallCount.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Icon from "../assets/icon-search2.svg";

export const MemorialHallCount = ({ count = 0, tab = 0, onSearch }) => {
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");

  const text =
    tab === 0
      ? `${count}곳의 추모관에 입장해 있어요`
      : `${count}곳의 추모관을 개설했어요`;

  const buttonText = tab === 0 ? "추모관 입장하기" : "새 추모관 개설하기";
  const buttonRoute = tab === 0 ? "/enter" : "/open";

  const handleClick = () => {
    nav(buttonRoute);
  };

  const handleSearch = () => {
    onSearch(keyword.trim());
  };

  return (
    <Wrapper>
      <Text>{text}</Text>

      <Container>
        <InputWrapper>
          <StyledInput
            placeholder="이름을 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton type="button" onClick={handleSearch}>
            <img src={Icon} alt="search" />
          </SearchButton>
        </InputWrapper>

        <Button
          text={buttonText}
          size="M"
          onClick={handleClick}
          width="13.75rem"
          color="white"
          icon="add"
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
`;

const Text = styled.div`
  ${typo("h4")};
  color: ${color("black.30")};
`;

const InputWrapper = styled.div`
  display: flex;
  width: 17.3125rem;
  height: 3.25rem;
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 0.375rem;
  border: 2px solid var(--5, #E9E9E9);
  background: #fff;
  box-sizing: border-box;
  gap: 0.625rem;
`;

const StyledInput = styled.input`
  width: 12.4375rem;
  height: 100%;
  border: none;
  background: transparent;
  ${typo("h4")};
  outline: none;

  &::placeholder {
    color: ${color("black.10")};
  }
`;

const SearchButton = styled.button`
  border: none;
  background: transparent;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;
