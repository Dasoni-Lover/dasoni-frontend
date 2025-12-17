// src/pages/ShareLinkEntryPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { typo, color } from "../styles/tokens";

import { getShareLinkInfo, getMyHallRelation } from "../api/share-link";

export default function ShareLinkEntryPage() {
  const nav = useNavigate();
  const { code } = useParams();

  const [status, setStatus] = useState("loading"); // loading | expired | invalid | error
  const [message, setMessage] = useState("공유 링크를 확인하고 있어요...");

  useEffect(() => {
    const run = async () => {
      if (!code) {
        setStatus("invalid");
        setMessage("잘못된 공유 링크입니다.");
        return;
      }

      // 1) 공유링크 검증 → hallId 얻기
      let hallId = null;
      try {
        const res = await getShareLinkInfo(code);
        hallId = res?.hallId;

        if (!hallId) {
          setStatus("invalid");
          setMessage("잘못된 공유 링크입니다.");
          return;
        }
      } catch (err) {
        const httpStatus = err?.response?.status;

        if (httpStatus === 410) {
          setStatus("expired");
          setMessage("공유 링크가 만료되었어요. (3일이 지나면 만료돼요)");
          return;
        }
        if (httpStatus === 404) {
          setStatus("invalid");
          setMessage("잘못된 공유 링크입니다.");
          return;
        }

        console.error("[ShareLinkEntryPage] 공유링크 검증 실패:", err);
        setStatus("error");
        setMessage("링크 확인 중 오류가 발생했어요.");
        return;
      }

      // 2) 로그인 여부 확인 (프로젝트 상황에 맞춰 토큰 키만 맞추면 됨)
      // - 너희 프로젝트가 accessToken을 localStorage에 저장하는 방식이면 아래처럼 가능
      const accessToken =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token") ||
        "";

      // 로그인 안되어 있으면 로그인 페이지로 보내고, 성공 후 다시 이 페이지로 복귀
      if (!accessToken) {
        nav(`/login?redirect=/share-links/${code}`, { replace: true });
        return;
      }

      // 3) 로그인 되어 있으면: 입장(관계) 등록 여부 체크
      try {
        const relation = await getMyHallRelation(Number(hallId));
        const isRegistered = !!relation?.isRegistered;

        if (isRegistered) {
          // 기존 추모관 진입 흐름으로 (현재 MemorialHallPage가 h 쿼리 지원하니까)
          nav(`/memorial?h=${hallId}`, { replace: true });
        } else {
          // 입장 페이지로 보내서 join 처리(기존 로직 활용)
          nav(`/enter?h=${hallId}`, { replace: true });
          // 만약 enter 페이지가 state로 받는 구조면 아래로 바꿔도 됨:
          // nav("/enter", { state: { hallId }, replace: true });
        }
      } catch (err) {
        console.error("[ShareLinkEntryPage] 관계 확인 실패:", err);
        // 토큰이 만료되어 401이 뜨는 경우가 흔해서, 이때도 로그인으로 보내는 게 안전함
        const httpStatus = err?.response?.status;
        if (httpStatus === 401) {
          nav(`/login?redirect=/share-links/${code}`, { replace: true });
          return;
        }

        setStatus("error");
        setMessage("입장 상태 확인 중 오류가 발생했어요.");
      }
    };

    run();
  }, [code, nav]);

  // 로딩/오류 화면(간단 뼈대)
  if (status === "loading") {
    return (
      <Wrapper>
        <Card>
          <Title>잠시만요</Title>
          <Desc>{message}</Desc>
        </Card>
      </Wrapper>
    );
  }

  if (status === "expired" || status === "invalid" || status === "error") {
    return (
      <Wrapper>
        <Card>
          <Title>
            {status === "expired"
              ? "링크 만료"
              : status === "invalid"
              ? "잘못된 링크"
              : "오류"}
          </Title>
          <Desc>{message}</Desc>
          <Button
            onClick={() => {
              nav("/", { replace: true });
            }}
          >
            홈으로 이동
          </Button>
        </Card>
      </Wrapper>
    );
  }

  return null;
}

/* ================= styled ================= */

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 32rem;
  max-width: calc(100% - 2rem);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.21);
  padding: 2rem;
`;

const Title = styled.div`
  ${typo("h2")};
  color: ${color("black.100")};
  margin-bottom: 0.75rem;
`;

const Desc = styled.div`
  ${typo("body1")};
  color: ${color("black.70")};
  margin-bottom: 1.25rem;
  line-height: 1.6;
`;

const Button = styled.button`
  width: 100%;
  height: 3.25rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  ${typo("h4")};
  color: #fff;
  background: ${color("main")};
`;
