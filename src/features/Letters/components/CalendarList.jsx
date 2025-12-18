import React, { useMemo } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { LetterListItem } from "./LetterListItem";

export default function CalendarList({ letters, onSelect }) {
  const normalizeDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.replace(/\./g, "/").replace(/-/g, "/");
  };

  const groupedByDate = useMemo(() => {
    return letters.reduce((acc, letter) => {
      const date = normalizeDate(letter.completedAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(letter);
      return acc;
    }, {});
  }, [letters]);

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <Wrapper>
      <ScrollArea>
        {sortedDates.map((date) => {
          const dateLetters = groupedByDate[date];

          return (
            <Section key={date}>
              {/* ✅ sticky header */}
              <Header>
                <Title>
                  {date} &nbsp;·&nbsp; 총 {dateLetters.length}개의 보낸 편지가 있어요
                </Title>
              </Header>

              {/* ✅ 헤더 아래에서만 스크롤 */}
              <List>
                {dateLetters.map((letter) => (
                  <LetterListItem
                    key={letter.letterId}
                    letter={letter}
                    onClick={() => onSelect(letter.letterId)}
                    showDelete={false}
                    isNarrow={false}
                  />
                ))}
              </List>
            </Section>
          );
        })}
      </ScrollArea>
    </Wrapper>
  );
}

/* ================= styled-components ================= */

const HEADER_HEIGHT = "3.3125rem";

const Wrapper = styled.div`
  width: 73.5rem;
  height: 29.8125rem;
  border-radius: 1.25rem;
  background: linear-gradient(
    90deg,
    #fff1f2 9%,
    #fff6eb 76%,
    #ffefe5 100%
  );
  overflow: hidden; /* ✅ 헤더 영역 침범 차단 */
`;

const ScrollArea = styled.div`
  height: 100%;
  box-sizing: border-box;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Section = styled.div`
  position: relative;
`;

const Header = styled.div`
  position: sticky;
  top: 0;

  padding: 2.5rem 2.5rem 1rem 2.5rem;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  background: linear-gradient(
    100deg,
    #fff1f2 9%,
    #fff6eb 76%,
    #ffefe5 100%
  );

  z-index: 10;
`;


const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.70")};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0 2.5rem 2.5rem 2.5rem;
`;
