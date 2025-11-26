// src/components/header/LogoutBox.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import logout from "../../assets/icon-logout.svg";
import edit from "../../assets/edit-btn.svg"
import profileimg from "../../assets/edit-btn.svg"

export default function LogoutBox({ onLogout, onClose }) {
  const handleClick = () => {
    onLogout();   // 로그아웃 실행
    onClose();    // 창 닫기
  };

  return (
    <Container>
      <Text>계정</Text>

      <Box>
        <PhotoBox>
            <Photo src={profileimg}/>
            <Name>박영진</Name>
        </PhotoBox>
        <Editcontainer>
          <Edit src={edit}/>
        </Editcontainer>
      </Box>

      <Wrapper onClick={handleClick} style={{ cursor: "pointer" }}>
        <IconContainer>
          <Icon src={logout} />
        </IconContainer>
        <Logout>로그아웃</Logout>
      </Wrapper>
    </Container>
  );
}


const Container = styled.div`
  position: absolute;
  top: 5.38rem;
  right: 7.5rem;

  display: flex;
  width: 20.0625rem;
  padding-top: 1.875rem;
  flex-direction: column;
  align-items: flex-start;

  border-radius: 1.25rem;
  border: 1px solid #f2e8df;
  background: #fff;
  box-shadow: -4px 18px 41.4px rgba(0, 0, 0, 0.11);
  z-index: 20;
`;

const Text = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  ${typo("h3")};
  color: ${color("black.70")};
  box-sizing: border-box;
  padding-bottom: 1rem;
`;
const Box = styled.div`
  position: relative;   /* ⭐ 추가: Editcontainer 기준점 */
  width: 100%;
  box-sizing: border-box;
  height: 8.4375rem;
  padding: 1.25rem 2.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFF;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.11);
`;

const Editcontainer = styled.div`
  position: absolute;
  top: 3rem;          /* ⭐ 수정 */
  right: 7.53rem;     /* ⭐ 수정 */

  display: flex;
  padding: 0.375rem;
  align-items: center;
  gap: 0.625rem;
`;


const PhotoBox=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
`
const Photo=styled.img`
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 0.1875rem;
    border: 1px solid var(--5, #E9E9E9);
`
const Name=styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
`

const Edit=styled.img`
    display: flex;
    width: 1.5rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.07);
`
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 2.125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #FFF;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.11);
  box-sizing: border-box;
  border-radius: 0 0 1.25rem 1.25rem;
`;

const IconContainer = styled.div`
  padding: 0.375rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const Logout = styled.div`
  ${typo("bodyb")};
  color: ${color("black.100")};
`;
