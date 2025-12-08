// src/features/Home/components/CardListItem.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";
import profileimg from "../../../assets/icon-profile-default.svg";
import {MediumPhotoBox} from "../../../components/photobox/MediumPhotoBox"
import Button from "../../../components/Button";

export const CardListItem = ({ hall, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "managed") {
      // 내가 관리하는 추모관 → 관리자 페이지
      navigate("/memorial", {
        state: { hallId: hall?.hallId },
      });
    } else {
      // 내가 입장한 추모관 → 일반 추모관 페이지
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
    <Wrapper >
      <MediumPhotoBox src={profile} />
      <Box>
        <Name>故 {name}</Name>
        <TextWrapper>
          <TextBox>
            <Text>{birthday}</Text>
            <Text>&nbsp;~&nbsp;</Text>
            <Text>{deadday}</Text>
          </TextBox>

          <ContentWrapper>
            <Type>관리자</Type>
            <Text2>{adminName}</Text2>
          </ContentWrapper>
          <ButtonWrapper>
            <Button
              text="입장하기"
              onClick={handleClick}
            />
          </ButtonWrapper>
        </TextWrapper>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 25.625rem;
  height: 37.875rem;
  padding: 1.8125rem 1.6875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.15rem;
  box-sizing: border-box;
  margin: 0;
  border-radius: 1.25rem;
  border: 1px solid #e9e9e9;
  background: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
`;

const Name = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const TextWrapper = styled.div`
  display: flex;
  width: 22.25rem;
  flex-direction: column;
  align-items: flex-start;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;


const ContentWrapper = styled.div`
  display: flex;
  padding: 0 0.25rem;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
`;

const Type = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
  margin-right: 1rem;
`;

const Text2 = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
`;


const Text = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.25rem;
`;
