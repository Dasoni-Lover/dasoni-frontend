import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { color, typo } from "../../../styles/tokens";
import profileimg from "../../../assets/icon-profile-default.svg";
import { fetchManagedHalls } from "../../../api/user"; 
import Button from "../../../components/Button"
import { MediumPhotoBox } from "../../../components/photobox/MediumPhotoBox";

const tagTextByStatus = {
  ENTERING: "입장 완료",
  WAITING: "요청 중",
  NONE: null
};

export const CardListItemEnter = ({ hall, onOpenModal, hoverable = true }) => {
  const navigate = useNavigate();
  const [managedHallIds, setManagedHallIds] = useState([]);

  // ⭐ 내가 관리하는 추모관 목록 가져오기
  useEffect(() => {
    const loadManagedHalls = async () => {
      try {
        const data = await fetchManagedHalls();
        const ids = data.halls.map((h) => h.hallId);
        setManagedHallIds(ids);
      } catch (err) {
        console.error("관리 추모관 목록 로드 실패:", err);
      }
    };
    loadManagedHalls();
  }, []);

  const handleClick = () => {
    if (!hall) return;

    switch (hall.status) {
      case "ENTERING": {
        // ⭐ 관리자인지 체크
        const isManager = managedHallIds.includes(hall.hallId);

        if (isManager) {
          navigate("/memorial-manager", { state: { hallId: hall.hallId } });
        } else {
          navigate("/memorial", { state: { hallId: hall.hallId } });
        }
        break;
      }

      case "WAITING":
        return;

      case "NONE":
        onOpenModal && onOpenModal(hall);
        break;

      default:
        break;
    }
  };

  const profile = hall?.profile || profileimg;
  const name = hall?.name || "이름 미상";
  const birthday = hall?.birthday || "-";
  const deadday = hall?.deadDay || "-";
  const adminName = hall?.adminName || "-";

  return (
    <Wrapper
      onClick={handleClick}
      disabled={hall.status === "WAITING"}
      status={hall.status}
      hoverable={hoverable}
    >
      <MediumPhotoBox
        src={profile}
      />

      <Box>
        <Name>故 {name}</Name>
        <TextWrapper>
          <TextBox>
            <Text>{birthday}</Text>
            <Text>~</Text>
            <Text>{deadday}</Text>
          </TextBox>
          <ContentWrapper>
            <Type>관리자</Type>
            <Text2>{adminName}</Text2>
          </ContentWrapper>
          <ButtonWrapper>
              <Button text="입장하기"/>
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
  border: 1px solid var(--5, #E9E9E9);
  background: #FFF;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  /* WAITING일 때 hover가 아예 없도록 */
  ${({ status }) =>
    status === "WAITING" &&
    css`
      &:hover {
        transform: none;
      }
    `}

  /* 기본 hover (hoverable이 true일 때만 적용) */
  ${({ hoverable }) =>
    hoverable &&
    css`
      &:hover {
        transform: translateY(-8px);
      }
    `}
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

const Text = styled.div`
  ${typo("h2")};
  color: ${color("black.70")};
`;

const TextWrapper = styled.div`
  display: flex;
  width: 22.25rem;
  flex-direction: column;
  align-items: flex-start;
`;

const TextBox=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`

const ContentWrapper = styled.div`
  display: flex;
padding: 0 0.25rem;
align-items: center;
gap: 0.25rem;
width: 100%;
align-self: stretch;
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

const ButtonWrapper=styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.25rem;
`