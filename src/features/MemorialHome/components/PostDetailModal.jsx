// src/features/MemorialHome/components/PostDetailModal.jsx
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { color, typo } from "../../../styles/tokens";
import IconChevron from "../../../assets/icon-chevron.svg";
import ConfirmModal from "../../../components/ConfirmModal";
import { deletePhoto } from "../../../api/memorial"; // ✅ 실제 삭제 API 위치
import { useNavigate } from "react-router-dom";

export default function PostDetailModal({
  isOpen,
  post,
  onClose,
  onPrev,
  onNext,
  hallId, // ✅ 부모에서 넘겨준 hallId
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !post) return null;

  const {
    id, // ✅ photo_id
    image,
    title,
    content,
    writtenDate,
    authorName = "작성자",
    profileImage,
    isMine,
    isAdmin,
  } = post;

  // 날짜 포맷 함수 (이전 그대로)
  const formatKoreanDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return "";
    const parts = dateStr.split(".");
    if (parts.length !== 3) return dateStr;
    const [y, m, d] = parts;
    return `${Number(y)}년 ${Number(m)}월 ${Number(d)}일`;
  };
  const formatWrittenDate = (dateStr) =>
    dateStr ? `${formatKoreanDate(dateStr)} 작성함` : "";

  // ✅ 삭제 클릭 → 확인 모달 열기
  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  // ✅ 실제 삭제 로직
  const handleConfirmDelete = async () => {
    try {
      console.log("삭제 요청:", hallId, id);
      await deletePhoto(hallId, id);
      alert("게시글이 삭제되었습니다.");
      setIsDeleteModalOpen(false);
      onClose(); // 모달 닫기
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCancelDelete = () => setIsDeleteModalOpen(false);

  // ✅ 수정 클릭 → /write 페이지로 이동
  const handleEditClick = () => {
    navigate("/write", {
      state: {
        hallId,
        isEdit: true,
        photoId: id,
        postData: {
          content,
          occurredAt: title, // 날짜 필드 ("YYYY.MM.DD")
          isPrivate: 0, // 필요하면 실제 값으로 교체
          imageUrl: image, // ✨ 수정 페이지에서 사용할 기존 사진 URL
        },
      },
    });
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <SideArrowLeft
          src={IconChevron}
          onClick={(e) => {
            e.stopPropagation();
            onPrev && onPrev();
          }}
        />
        <SideArrowRight
          src={IconChevron}
          onClick={(e) => {
            e.stopPropagation();
            onNext && onNext();
          }}
        />

        <ModalInner>
          <HeaderRow>
            <AuthorInfo>
              <Avatar $src={profileImage} />
              <AuthorName>{authorName}</AuthorName>
            </AuthorInfo>

            <HeaderActions>
              {(isMine || isAdmin) && (
                <SmallButton onClick={handleDeleteClick}>삭제</SmallButton>
              )}
              {isMine && (
                <SmallButton onClick={handleEditClick}>수정</SmallButton>
              )}
            </HeaderActions>
          </HeaderRow>

          <ConfirmModal
            isOpen={isDeleteModalOpen}
            title="해당 게시물을 삭제할까요?"
            description="영구적으로 삭제돼요"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />

          <ContentRow>
            <ImageWrapper>
              <PostImage src={image} alt="게시글 이미지" />
            </ImageWrapper>

            <TextWrapper>
              <PostTitle>{formatKoreanDate(title)}</PostTitle>
              <PostContent>{content}</PostContent>
            </TextWrapper>
          </ContentRow>

          <FooterRow>
            <WrittenDateText>{formatWrittenDate(writtenDate)}</WrittenDateText>
          </FooterRow>
        </ModalInner>
      </ModalContainer>
    </Overlay>
  );
}

/* 🎨 스타일 그대로 */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 960px;
  min-width: 70vw;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 3.25rem 3.25rem 3.25rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const ModalInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const HeaderRow = styled.div`
  display: flex;
  padding: 1.25rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.625rem;
  border-bottom: 2px solid var(--5, #e9e9e9);
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #d9d9d9;
  ${({ $src }) =>
    $src &&
    css`
      background-image: url(${$src});
      background-size: cover;
      background-position: center;
    `}
`;

const AuthorName = styled.div`
  ${typo("h3")};
  color: ${color("black.50")};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  ${typo("h4")};
  color: ${color("black.70")};
  display: flex;
  height: 2.25rem;
  padding: 0 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 2px solid var(--5, #e9e9e9);
  background: var(--0, #fff);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);
`;

const ContentRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PostImage = styled.img`
  width: 32.5rem;
  height: 32.5rem;
  border-radius: 0.4375rem;
  border: 3px solid ${color("black.5")};
  object-fit: cover;
`;

const TextWrapper = styled.div`
  ${typo("bodym")};
  color: #313131;
  white-space: pre-line;
`;

const PostTitle = styled.div`
  ${typo("h3")};
  margin-bottom: 12px;
`;

const PostContent = styled.div`
  ${typo("bodym")};
  line-height: 1.6;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WrittenDateText = styled.div`
  ${typo("bodym")};
  color: #9d9d9d;
`;

const SideArrowBase = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 32px;
  cursor: pointer;
`;

const SideArrowLeft = styled(SideArrowBase)`
  left: -80px;
`;

const SideArrowRight = styled(SideArrowBase)`
  right: -80px;
  transform: translateY(-50%) rotate(180deg);
`;
