import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { color, typo } from "../../../styles/tokens";
import deleteicon from "../../../assets/delete-icon.svg";

import SideCategoryBox from "../components/SideCategoryBox";
import BarNavigate from '../../../components/BarNavigate';
import Button from "../../../components/Button";

import { getHallInfo } from "../../../api/memorial";

export default function EditHallInfoPage() {
  const location = useLocation();
  const hallId = location.state?.hallId; 
  const page = location.state?.page;

  const [hallName, setHallName] = useState("");

  useEffect(() => {
    const fetchHallName = async () => {
      if (!hallId) return;
      try {
        const info = await getHallInfo(hallId);
        const name = info?.data?.name || info?.name || "";
        setHallName(name);
      } catch (err) {
        console.error("추모관 이름 불러오기 실패:", err);
      }
    };
    fetchHallName();
  }, [hallId]);

  const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

  return (
    <Container>
      <NavWrapper>
        <BarNavigate
          paths={["홈", hallTitle, "고인 정보 설정"]}
        />
        <Wrapper>
          <Title>고인 정보 설정</Title>
          <StopButton>
            <IconBox>
              <Icon src={deleteicon}/>
            </IconBox>
            <Text>작성 그만두기</Text>
          </StopButton>
        </Wrapper>
      </NavWrapper>
      <Content>
        <Form>form</Form>
        <Button text="다음" size="M" width="13.75rem"/>
      </Content>
      <SideCategoryBox hallId={hallId} page={page} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.81rem;
  width: 73.625rem;
`;

const NavWrapper = styled.div`
  width: 100%;
  margin-bottom: 4.69rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4.5rem;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3.2525rem; /* 고정 높이 */
  box-sizing: border-box;
`;

// 왼쪽 상단에 Title
const Title = styled.div`
  ${typo("h3")};
  color: ${color("black.100")};
  position: absolute;
  top: 0;
  left: 0;
`;

// 오른쪽 하단에 StopButton
const StopButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-flex;
  padding: 0.5rem 1.25rem 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
`;

const IconBox=styled.div`
  display: flex;
  padding: 0.375rem;
  align-items: center;
  gap: 0.625rem;
`

const Icon=styled.img`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
`

const Text=styled.div`
    ${typo("h4")};
  color: ${color("black.30")};
`


const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Form=styled.div`
  width: 53.9375rem;
`