import React from "react";
import styled from "styled-components";
import { MediumPhotoBox } from "../../../components/photobox/MediumPhotoBox";
import postimg from "../assets/post-img.png";

const BoxPostList = ({ onPostClick }) => {
  // 일단 목데이터로 구성
  const posts = [
    {
      id: 1,
      image: postimg,
      title: "2001년 3월 5일",
      content:
        "오래된 앨범에서 영수 어린 시절 사진을 꺼내보았다.\n" +
        "솜사탕 하나를 사주니 세상을 다 가진 듯 웃던 네 얼굴.\n" +
        "그 작은 손으로 솜사탕을 쥐고 아빠를 보며 웃던 모습이 눈에 선하구나.\n" +
        "그때 너의 웃음소리가 오늘따라 유난히 그립다. 하늘에서도 그렇게 환하게 웃고 있길.\n\n" +
        "보고 싶은 내 아들 영수야.",
      writtenDate: "2022년 2월 25일 작성함",
      authorName: "박영진",
    },

    {
      id: 2,
      image: postimg,
      title: "다른 추억",
      content: "또 다른 내용...",
      writtenDate: "",
    },
    {
      id: 3,
      image: postimg,
      title: "소중한 하루",
      content: "내용...",
      writtenDate: "",
    },
    {
      id: 4,
      image: postimg,
      title: "기억",
      content: "내용...",
      writtenDate: "",
    },
    {
      id: 5,
      image: postimg,
      title: "행복했던 날",
      content: "내용...",
      writtenDate: "",
    },
  ];

  return (
    <Wrapper>
      {posts.map((post) => (
        <MediumPhotoBox
          key={post.id}
          src={post.image}
          onClick={() => onPostClick && onPostClick(post)}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 18.3125rem;
`;

export default BoxPostList;
