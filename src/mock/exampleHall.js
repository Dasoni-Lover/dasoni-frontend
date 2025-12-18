// src/mock/exampleHall.js

import { formatRelativeWithOptions } from "date-fns/fp";
import Profile from "../assets/mock/profile.jpeg";
import Photo001 from "../assets/mock/photo-001.jpeg";
import Photo002 from "../assets/mock/photo-002.jpeg";
import Photo003 from "../assets/mock/photo-003.jpeg";
import Photo004 from "../assets/mock/photo-004.jpeg";
import Photo005 from "../assets/mock/photo-005.jpeg";
import Photo006 from "../assets/mock/photo-006.jpeg";
import Photo007 from "../assets/mock/photo-007.jpeg";
import Photo008 from "../assets/mock/photo-008.jpeg";
import Photo009 from "../assets/mock/photo-009.jpeg";
import Photo010 from "../assets/mock/photo-010.jpeg";
import Photo011 from "../assets/mock/photo-011.jpeg";
import Photo012 from "../assets/mock/photo-012.jpeg";

export const exampleHallInfo = {
  name: "이하은",
  birthday: "2004.11.11",
  deadday: "2024.06.05",
  place: "국립기억의 숲 B 31-3",
  phone: "010-1423-5324",
  adminName: "김옥선",
  // 이미지는 아무 URL이나 OK (샘플)
  profile: Profile,
  review: "늘 환하게 웃어주던 우리 딸",
  nature: ["밝은", "지혜로운", "생각이 깊은", "너그러운"],
};

export const examplePhotos = [
  {
    id: 1,
    url: Photo001,
    thumbnail: Photo001,
    isAI: formatRelativeWithOptions,
    ts: Date.now() - 1000 * 60 * 60 * 1, // 1시간 전
  },
  {
    id: 2,
    url: Photo002,
    thumbnail: Photo002,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: 3,
    url: Photo003,
    thumbnail: Photo003,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: 4,
    url: Photo004,
    thumbnail: Photo004,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 5,
    url: Photo005,
    thumbnail: Photo005,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 36,
  },
  {
    id: 6,
    url: Photo006,
    thumbnail: Photo006,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 72,
  },
  {
    id: 7,
    url: Photo007,
    thumbnail: Photo007,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 120,
  },
  {
    id: 8,
    url: Photo008,
    thumbnail: Photo008,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 168,
  },
  {
    id: 9,
    url: Photo009,
    thumbnail: Photo009,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 168,
  },
  {
    id: 10,
    url: Photo010,
    thumbnail: Photo010,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 168,
  },
  {
    id: 11,
    url: Photo011,
    thumbnail: Photo011,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 168,
  },
  {
    id: 12,
    url: Photo012,
    thumbnail: Photo012,
    isAI: false,
    ts: Date.now() - 1000 * 60 * 60 * 168,
  },
];

/* ===================== 게시글 상세 (PostDetailModal) ===================== */

export const examplePhotoDetailsById = {
  1: {
    url: Photo001,
    occurredAt: "2017.12.07",
    content:
      "드라이브 들어갔다가 발견한 사진.우리 진짜 애기였네 너는 계속 21살인데 나만 늙는구나 나중에 만나면 나만 할머니인 거 아냐?!",
    uploadedAt: "2025.12.01",
    name: "김진호",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  2: {
    url: Photo002,
    occurredAt: "2014.03.10",
    content: "기억나? 지금도 너랑 이런 사진 찍고 싶다",
    uploadedAt: "2025.12.01",
    name: "김진호",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  3: {
    url: Photo003,
    occurredAt: "2006.01.15",
    content: "해맑게 웃던 우리 공주님. 아빠가 많이보고 싶다",
    uploadedAt: "2025.12.02",
    name: "이현수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  4: {
    url: Photo004,
    occurredAt: "2018.06.20",
    content:
      "이 사진을 찍던 날, 우리가 무슨 얘기를 했는지는 기억나지 않아. 그래도 웃고 있었던 건 분명해.",
    uploadedAt: "2025.12.02",
    name: "김진아",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  5: {
    url: Photo005,
    occurredAt: "2019.07.01",
    content: "이 필터 너가 참 좋아했는데. 참 잘 어울렸던 것 같아",
    name: "김민지",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  6: {
    url: Photo006,
    occurredAt: "2020.11.15",
    content:
      "하은아 나 지수야 ! 우리 고등학생 때 되게 친했었는데, 사진이 별로 없네. 매일 매점에 서 빵 사먹고 회전초밥 했었는데 ㅎㅎ 유독 그 때가 그립네",
    uploadedAt: "2025.12.03",
    name: "임지수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  7: {
    url: Photo007,
    occurredAt: "2007.11.03",
    content:
      "우리 공주의 3번째 생일 사진 찍고 나중에 울고 불고 난리도 아니었는데, 왜 울었는지 기억이 안나네 ~~ 울 공 주거기선 안 울겠지. 보고싶네.",
    uploadedAt: "2025.12.04",
    name: "이현수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  8: {
    url: Photo008,
    occurredAt: "2012.09.01",
    content: "체육대회에서 신나게 놀던 너. 보고싶다.",
    uploadedAt: "2025.12.05",
    name: "이현수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  9: {
    url: Photo009,
    occurredAt: "2019.10.24",
    content:
      "수학여행으로 전주 한옥마을 갔던 날 ! 2시간밖에 시간 없어서 완전 급하게 옷 빌리고 사진 찍었었는데 ㅋㅋㅋ 진짜 추억이다. 나 이제 전주만 가면 너 생각 나",
    uploadedAt: "2025.12.05",
    name: "이민영",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  10: {
    url: Photo010,
    occurredAt: "2018.12.02",
    content:
      "하은아 옛날 폰에서 유물 발굴했다 ㅋㅋ 중학생 때 학원도 매일 같이 가고, 진짜 많 이 놀았었는데. 전생같네 보고싶다",
    uploadedAt: "2025.12.05",
    name: "임현영",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  11: {
    url: Photo011,
    occurredAt: "2010.10.6",
    content:
      "하은이가 참 좋아했던 초록색 가디건. 작아서 못 입을 때까지 입고 다녔었지",
    uploadedAt: "2025.12.05",
    name: "이현수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
  12: {
    url: Photo012,
    occurredAt: "2008.06.18",
    content:
      "우리 하은이랑 처음 워터파크 가본 날. 혼자서도 씩씩하게 미끄럼들 타던. 우리 공주.",
    uploadedAt: "2025.12.05",
    name: "이현수",
    myProfile: null,
    isMine: false,
    isAdmin: false,
  },
};
