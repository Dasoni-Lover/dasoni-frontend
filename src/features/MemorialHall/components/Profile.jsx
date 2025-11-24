import React from "react";
import styled from "styled-components";
import DefaultProfile from "./DefaultProfile";
import InfoList from "./InfoList";
import { color, typo } from "../../../styles/tokens";
import { formatPhone } from "../../../utils/formatPhone";

const Profile = ({ data }) => {
  if (!data) return null;

  const {
    name,
    profile,
    nature,
    place,
    phone,
    review,
    birthday,
    deadday,
    adminName,
  } = data;

  return (
    <Container>
      <Wrapper>
        <DefaultProfile
          name={name}
          src={profile}
          birthday={birthday}
          deadday={deadday}
          place={place}
          phone={formatPhone(phone)}
          adminName={adminName}
        />
        <Content>{review || "함께있을 때 즐거웠던 사람"}</Content>
      </Wrapper>

      {/* ✅ InfoList에 하이픈 포함된 전화번호 전달 */}
      <InfoList nature={nature} place={place} phone={formatPhone(phone)} />
    </Container>
  );
};

export default Profile;

/* 🎨 스타일 */
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
