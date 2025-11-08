import React from "react";
import styled from "styled-components";
import DefaultProfile from "./DefaultProfile";
import InfoList from "./InfoList";
import { color, typo } from "../../../styles/tokens";

const Profile = ({ data }) => {
  // data가 없을 경우를 대비해 구조분해
  if (!data) return null;

  const { name, profile, nature, place, phone, review, date } = data;

  return (
    <Container>
      <Wrapper>
        <DefaultProfile name={name} src={profile} date={date} />
        <Content>{review || "함께있을 때 즐거웠던 사람"}</Content>
      </Wrapper>
      <InfoList nature={nature} place={place} phone={phone} />
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
  margin-bottom: 3.25rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const Content = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
