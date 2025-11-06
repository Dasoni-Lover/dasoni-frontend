import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'  
import { SmallPhotoBox } from "../../../components/photobox/SmallPhotoBox"
import { color, typo } from '../../../styles/tokens'
import profileimg from "../../../assets/profile-img.png"

export const CardListItem = ({ status = "입장완료", onOpenModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "입장완료") {
      navigate('/memorial');
    } else if (status === "요청중" ) {
      return;
    } else if (status === "거절" || status === "요청안함"){
      onOpenModal();
    }

  };

  return (
    <Wrapper onClick={handleClick}> 
      <SmallPhotoBox
        src={profileimg}
        tagText={status === "요청중" ? "요청중" : ""}
        showTag={status === "요청중"}
      />
      <Box>
        <Name>故 박영수</Name>
        <TextWrapper>
          <ContentWrapper>
            <Type1>생일</Type1>
            <Text>1993. 2. 11.</Text>
          </ContentWrapper>
          <ContentWrapper>
            <Type1>기일</Type1>
            <Text>2021. 4. 24.</Text>
          </ContentWrapper>
          <ContentWrapper>
            <Type2>관리자</Type2>
            <Text>박영진</Text>
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
  border: 2px solid #F2E8DF;
  background: var(--Background, #FFFDFB);
  cursor: pointer; 
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
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
