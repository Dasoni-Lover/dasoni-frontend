// src/components/header/LogoutBox.jsx
import React, { useRef } from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import logout from "../../assets/icon-logout.svg";
import edit from "../../assets/edit-btn.svg";
import { getPresignedUrlForImage, uploadFileToS3 } from "../../api/files";
import { updateMyHallProfile } from "../../api/my-hall";   // ⭐ 추가할 API 경로로 수정해줘!

export default function LogoutBox({ onLogout, onClose, profileImg }) {
  const fileInputRef = useRef(null);

  // Edit 버튼 클릭 (파일 선택창 열기)
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 실제 파일 선택 후 처리: S3 업로드 → 내 추모관 프로필 API 호출
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. presigned-url발급
      const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(file);

      // 2. S3 업로드
      await uploadFileToS3(uploadUrl, file, contentType);

      // 3. 내 추모관 프로필 수정 PATCH 호출
      await updateMyHallProfile(fileUrl);

      // 4. 헤더의 프로필 이미지 업데이트
      window.dispatchEvent(
        new CustomEvent("myProfileUpdated", {
          detail: { profileUrl: fileUrl }
        })
      );

      alert("프로필 이미지가 변경되었습니다.");

    } catch (error) {
      console.error("프로필 이미지 변경 실패:", error);
      alert("이미지 변경 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Container>
      {/* 숨겨진 파일 인풋 */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Text>계정</Text>

      <Box>
        <PhotoBox>
          <Photo src={profileImg} />
          <Name>박영진</Name>
        </PhotoBox>

        <Editcontainer onClick={handleEditClick}>
          <Edit src={edit} />
        </Editcontainer>
      </Box>

      <Wrapper onClick={handleLogout}>
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
    object-fit: cover; 
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
  cursor: pointer;
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
