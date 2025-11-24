import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";
import Button from "../../../components/Button";
import DatePicker from "../../../components/DatePicker";
import { searchHalls } from "../../../api/search-hall";

export const SearchTab = ({ onSearchResult }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState(null);
  const [deaddate, setDeadDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // 한 자리 수 → 2자리 문자열로 변환
  const padZero = (num) => String(num).padStart(2, "0");

  // Date 객체 → "YYYY.MM.DD" 문자열 변환
  const formatDate = (date) => {
    if (!date) return null;
    const y = date.getFullYear();
    const m = padZero(date.getMonth() + 1);
    const d = padZero(date.getDate());
    return `${y}.${m}.${d}`;
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const body = {
        name: name || null,
        birthday: formatDate(birthdate),
        deadDay: formatDate(deaddate),
      };

      const halls = await searchHalls(body);
      onSearchResult(halls);
    } catch (err) {
      console.error("검색 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Box>
        <Type>고인의 성함</Type>
        <InputField
          width="100%"
          placeholder="고인 성함"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box>
        <Type>고인의 생일</Type>
        <DatePicker
          selected={birthdate}
          onChange={setBirthDate}
          placeholder="1993/02/11"
          width="100%"
          height="2.65rem"
        />
      </Box>
      <Box>
        <Type>고인의 기일</Type>
        <DatePicker
          selected={deaddate}
          onChange={setDeadDate}
          placeholder="2021/04/24"
          width="100%"
          height="2.65rem"
        />
      </Box>
      <ButtonBox>
        <Button
          text={loading ? "검색중..." : "검색하기"}
          size="M"
          icon="search"
          style={{ padding: "0.46rem" }}
          onClick={handleSearch}
          disabled={loading}
        />
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.25rem;
  align-self: stretch;
  border-radius: 0.75rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4375rem;
  width: 15rem;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 15rem;
`;

const Type = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;
