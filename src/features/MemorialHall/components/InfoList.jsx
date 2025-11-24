import React from "react";
import styled from "styled-components";
import InfoListItem from "./InfoListItem";

const InfoList = ({ nature, place, phone }) => {
  // nature가 null이면 빈 배열로 처리
  const natureList = Array.isArray(nature) ? nature : [];

  return (
    <Wrapper>
      <InfoListItem
        type="우리가 기억하는 당신은"
        content={natureList.length > 0 ? natureList.join(" · ") : "-"}
      />
      <InfoListItem type="모신 곳" content={place || "-"} />
      <InfoListItem type="관련 연락처" content={phone || "-"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 0.75rem 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export default InfoList;
