// src/features/Home/components/CardListItem.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { color, typo } from "../../../styles/tokens";
import profileimg from "../../../assets/icon-profile-default.svg";

export const CardListItem = ({ hall, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "managed") {
      // ✅ 내가 관리하는 추모관 → 관리자 페이지
      navigate("/memorial-manager", {
        state: { hallId: hall?.hallId },
      });
    } else {
      // ✅ 내가 입장한 추모관 → 일반 추모관 페이지
      navigate("/memorial", {
        state: { hallId: hall?.hallId },
      });
    }
  };

  const profile = hall?.profile || profileimg;
  const name = hall?.name || "이름 미상";
  const birthday = hall?.birthday || "-";
  const deadday = hall?.deadday || "-";
  const adminName = hall?.adminName || "-";

  return (
    <Wrapper onClick={handleClick}>
      <SmallPhotoBox src={profile} />
      <Box>
        <Name>故 {name}</Name>
        <TextWrapper>
          <ContentWrapper>
            <Type1>생일</Type1>
            <Text>{birthday}</Text>
          </ContentWrapper>
          <ContentWrapper>
            <Type1>기일</Type1>
            <Text>{deadday}</Text>
          </ContentWrapper>
          <ContentWrapper>
            <Type2>관리자</Type2>
            <Text>{adminName}</Text>
          </ContentWrapper>
        </TextWrapper>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 32.5rem;
  height: 14.375rem;
  padding: 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  box-sizing: border-box;
  margin: 0;
  border-radius: 0.75rem;
  border: 2px solid #f2e8df;
  background: var(--Background, #fffdfb);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.25rem;
  flex: 1 0 0;
`;

const Name = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const TextWrapper = styled.div`
  display: flex;
  width: 11.0625rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 0 0.33781rem;
  align-items: center;
  gap: 0.375rem;
  align-self: stretch;
`;

const Type1 = styled.div`
  margin-right: 2rem;
  ${typo("h4")};
  color: ${color("black.30")};
`;

const Type2 = styled.div`
  ${typo("h4")};
  color: ${color("black.30")};
  margin-right: 1rem;
`;

const Text = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
`;
