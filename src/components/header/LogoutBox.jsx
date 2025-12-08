// src/components/header/LogoutBox.jsx
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../styles/tokens";
import logout from "../../assets/icon-logout.svg";
import edit from "../../assets/edit-btn.svg";
import profiledefaultimg from "../../assets/icon-profile-default.svg";
import { getPresignedUrlForImage, uploadFileToS3 } from "../../api/files";
import { updateMyProfileImage } from "../../api/user";

export default function LogoutBox({ onLogout, onClose, profileImg, name }) {
  const fileInputRef = useRef(null);
  const boxRef = useRef(null); // ⭐ 바깥 클릭 감지 영역

  const imgSrc = profileImg || profiledefaultimg;

  // ⭐ 바깥 클릭 시 닫기 기능
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target &&
        e.target.closest &&
        e.target.closest("[data-ignore-close]")
      ) {
        return;
      }

      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleEditClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1) presigned URL 발급
      const { uploadUrl, fileUrl, contentType } = await getPresignedUrlForImage(
        file
      );

      // 2) S3에 실제 업로드
      await uploadFileToS3(uploadUrl, file, contentType);

      // 3)  유저 프로필 이미지로 반영 (새 API)
      await updateMyProfileImage(fileUrl);

      // 4)  Header MiniProfile 갱신용 이벤트 발행
      window.dispatchEvent(
        new CustomEvent("myProfileUpdated", {
          detail: { profileUrl: fileUrl },
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
    <Container ref={boxRef}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Text>계정</Text>

      <Box onClick={handleEditClick}>
        <PhotoBox>
          <Photo src={imgSrc} />
          <Name>{name}</Name>
        </PhotoBox>

        <Editcontainer>
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
  position: fixed;
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
  z-index: 30000;
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
  position: relative; /* Editcontainer 기준점 */
  width: 100%;
  box-sizing: border-box;
  height: 8.4375rem;
  padding: 1.25rem 2.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.11);
  cursor: pointer;
`;

const Editcontainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 7.53rem;

  display: flex;
  padding: 0.375rem;
  align-items: center;
  gap: 0.625rem;
`;

const PhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Photo = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.1875rem;
  border: 1px solid var(--5, #e9e9e9);
  object-fit: cover;
`;
const Name = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
`;

const Edit = styled.img`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 2.125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
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
