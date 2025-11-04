import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import IconChevron from "../../../assets/icon-chevron.svg";

/**
 * 포스트 상세보기 모달
 *
 * 사용 예시:
 * <PostDetailModal
 *   isOpen={!!selectedPost}
 *   post={selectedPost}
 *   onClose={() => setSelectedPost(null)}
 * />
 */
export default function PostDetailModal({
  isOpen,
  post,
  onClose,
  onPrev,
  onNext,
}) {
  if (!isOpen || !post) return null;

  const { image, title, content, writtenDate, authorName = "작성자" } = post;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 🔹 좌우 화살표 클릭 시 이벤트 연결 */}
        <SideArrowLeft src={IconChevron} onClick={onPrev} />
        <SideArrowRight src={IconChevron} onClick={onNext} />

        <ModalInner>
          <HeaderRow>
            <AuthorInfo>
              <Avatar />
              <AuthorName>{authorName}</AuthorName>
            </AuthorInfo>

            <HeaderActions>
              <SmallButton>삭제</SmallButton>
              <SmallButton>수정</SmallButton>
            </HeaderActions>
          </HeaderRow>

          <ContentRow>
            <ImageWrapper>
              <PostImage src={image} alt="게시글 이미지" />
            </ImageWrapper>

            <TextWrapper>
              <PostTitle>{title}</PostTitle>
              <PostContent>{content}</PostContent>
            </TextWrapper>
          </ContentRow>

          <FooterRow>
            <WrittenDateText>
              {writtenDate || "2022년 2월 25일 작성함"}
            </WrittenDateText>
          </FooterRow>
        </ModalInner>
      </ModalContainer>
    </Overlay>
  );
}

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
  cursor: pointer; /* 아직 기능 없음 */
`;

const SideArrowLeft = styled(SideArrowBase)`
  left: -80px;
`;

const SideArrowRight = styled(SideArrowBase)`
  right: -80px;
  transform: translateY(-50%) rotate(180deg);
`;
