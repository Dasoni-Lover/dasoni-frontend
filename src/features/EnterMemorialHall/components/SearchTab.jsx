// src/features/EnterMemorialHall/components/SearchTab.jsx
import React, { useState, useEffect } from "react";
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

  // ✅ 이름이 비어있는지 체크
  const isNameEmpty = !name.trim();

  // 한 자리 수 → 2자리 문자열
  const padZero = (num) => String(num).padStart(2, "0");

  // Date → "YYYY.MM.DD"
  const formatDate = (date) => {
    if (!date) return null;
    const y = date.getFullYear();
    const m = padZero(date.getMonth() + 1);
    const d = padZero(date.getDate());
    return `${y}.${m}.${d}`;
  };

  // 생일 > 기일 방지
  useEffect(() => {
    if (birthdate && deaddate && deaddate < birthdate) {
      setDeadDate(null);
    }
  }, [birthdate, deaddate]);

  const handleSearch = async () => {
    // ✅ 안전 장치 (혹시 강제로 호출될 경우 대비)
    if (isNameEmpty || loading) return;

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
        <Box1>
          <Type>고인의 성함</Type>
          <InputField
            width="54.9375rem"
            placeholder="고인의 성함을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            borderColor="#FFBC67"
            bgColor="#fff"
          />
        </Box1>

        <ButtonBox>
          <Button
            text={loading ? "검색중..." : "검색하기"}
            size="M"
            icon="search"
            style={{ padding: "0.46rem" }}
            onClick={handleSearch}
            // ✅ 이름이 없거나 로딩 중이면 비활성화
            disabled={loading || isNameEmpty}
          />
        </ButtonBox>
      </Box>

      <Container>
        <Box2>
          <Type>고인의 생일</Type>
          <DatePicker
            selected={birthdate}
            onChange={setBirthDate}
            placeholder="YYYY/MM/DD"
            width="15.625rem"
            height="3.25rem"
            showClear={true}
            calendarIcon="yellow"
            maxDate={new Date()}
          />
        </Box2>

        <Box2>
          <Type>고인의 기일</Type>
          <DatePicker
            selected={deaddate}
            onChange={setDeadDate}
            placeholder="YYYY/MM/DD"
            width="15.625rem"
            height="3.25rem"
            showClear={true}
            calendarIcon="yellow"
            maxDate={new Date()}
            minDate={birthdate || undefined}
          />
        </Box2>
      </Container>
    </Wrapper>
  );
};

// styled-components는 그대로 유지
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.875rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
  align-self: stretch;
  border-radius: 1.25rem;
  background: #fff4e6;
`;

const Box = styled.div`
  display: flex;
  padding-right: 1.25rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.62rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3.25rem;
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.62rem;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 13.75rem;
  height: 2.75rem;
`;

const Type = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;
