import React from "react";
import styled from "styled-components";
import DefaultProfile from "./DefaultProfile";
import InfoList from "./InfoList";
import { color, typo } from "../../../styles/tokens";

const Profile = ({ data }) => {
  if (!data) return null;

  const { name, profile, nature, place, phone, review, date } = data;

  // ✅ 전화번호 표시용 포맷 함수
  const formatPhone = (num) => {
    if (!num) return "";
    const digits = num.replace(/[^0-9]/g, ""); // 숫자만 남기기
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    return digits.replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
  };

  const formattedPhone = formatPhone(phone);

  return (
    <Container>
      <Wrapper>
        <DefaultProfile name={name} src={profile} date={date} />
        <Content>{review || "함께있을 때 즐거웠던 사람"}</Content>
      </Wrapper>

      {/* ✅ InfoList에 하이픈 포함된 전화번호 전달 */}
      <InfoList nature={nature} place={place} phone={formattedPhone} />
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
