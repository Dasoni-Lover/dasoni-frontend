import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox";
import { color, typo } from "../../../styles/tokens";
import profileimg from "../../../assets/icon-profile-default.svg";
import { fetchManagedHalls } from "../../../api/user"; // ⭐ 추가

const tagTextByStatus = {
  ENTERING: "입장 완료",
  WAITING: "요청 중",
  NONE: null,
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
          navigate("/memorial", { state: { hallId: hall.hallId } });
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
      <SmallPhotoBox
        src={profile}
        showTag={hall.status !== "NONE"}
        tagText={tagTextByStatus[hall.status]}
      />

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
