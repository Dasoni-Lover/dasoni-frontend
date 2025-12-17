import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import { getHallInfo } from "../../../api/memorial";

export default function VisitorListItemContent({ item, hallId }) {
  const [hallName, setHallName] = useState("");

  useEffect(() => {
    if (!hallId) return;

    const fetchHallInfo = async () => {
      try {
        const res = await getHallInfo(hallId);
        // API 명세 기준: res.data.name
        setHallName(res?.data?.name ?? "");
      } catch (error) {
        console.error("❌ 추모관 정보 조회 실패:", error);
      }
    };

    fetchHallInfo();
  }, [hallId]);

  return (
    <Container>
      <Wrapper>
        <Type>이름</Type>
        <Content>{item.name}</Content>
      </Wrapper>

      <Wrapper>
        <Type>관계</Type>
        <Content>{item.relation}</Content>
      </Wrapper>

      <Wrapper>
        <Type>
          {hallName ? `${hallName}님을 표현하는 단어` : "고인을 표현하는 단어"}
        </Type>
        <Content>{item.natures?.join(" · ")}</Content>
      </Wrapper>

      <Wrapper>
        <Type>관계 설명</Type>
        <Content>{item.detail}</Content>
      </Wrapper>

      <Wrapper>
        <Type>한 줄 소개</Type>
        <Content>{item.review}</Content>
      </Wrapper>
    </Container>
  );
}

/* ================== 스타일 ================== */

const Container = styled.div`
  display: flex;
  padding: 0 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  margin-bottom: 1.25rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: 1.5rem;
  align-items: center;
  gap: 0.25rem;
  align-self: stretch;
`;

const Type = styled.div`
  width: 10.75rem;
  ${typo("bodym")};
  color: ${color("black.50")};
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
  flex: 1 0 0;
`;
