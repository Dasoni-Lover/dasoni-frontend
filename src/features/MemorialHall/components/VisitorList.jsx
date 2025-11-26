import React from "react";
import styled from "styled-components";
import VisitorListItem from "./VisitorListItem";

export default function VisitorList({
  data,
  openAll,
  type,
  hallId,
  onActionComplete,
  onKickComplete,
}) {
  return (
    <Box>
      <Container>
        {data?.map((item, index) => (
          <VisitorListItem
            key={type === "request" ? item.requestId : item.visitorId}
            openAll={openAll}
            type={type}
            item={item}
            index={index + 1}
            hallId={hallId}
            onActionComplete={onActionComplete}
            onKickComplete={onKickComplete}
          />
        ))}
      </Container>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  border-radius: 0 0 0.625rem 0.625rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding-right: 1.25rem;
`;
