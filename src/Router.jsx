import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
/* 온보딩 관련 */
import { FirstPage } from "./pages/FirstPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
/* 홈 관련 */
import { HomePage } from "./pages/HomePage";
/* 추모관 관련 */
import MemorialHomePage from "./pages/MemorialHomePage";
import MemorialMyHomePage from "./features/MemorialHome/pages/MemorialMyHomePage";
import { MemorialManagerHomePage } from "./features/MemorialHome/pages/MemorialManagerHomePage";
import { ProfileEditPage } from "./features/MemorialHome/pages/ProfileEditPage";
import OpenMemorialHomePage from "./pages/OpenMemorialHomePage";
import { EnterMemorialHomePage } from "./pages/EnterMemorialHomePage";
import RequestEntryPage from "./pages/RequestEntryPage";
/* 글 작성 */
import WritePostPage from "./pages/WritePostPage";
/* AI 이미지 생성 */
import AIGeneratePage from "./pages/AIGeneratePage";
/* 편지함 */
import { SentLetterPage } from "./pages/SentLetterPage";
import { SentLetterBoxPage } from "./pages/SentLetterBoxPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* 온보딩 관련 */
      { index: true, element: <FirstPage /> },
      { path: "/login", element: <LogInPage /> },
      { path: "/register", element: <RegisterPage /> },

      /* 홈 관련 */
      { path: "/home", element: <HomePage /> },

      /* 추모관 관련 */
      { path: "/memorial", element: <MemorialHomePage /> },
      { path: "/memorial-my", element: <MemorialMyHomePage /> },
      { path: "/memorial-manager", element: <MemorialManagerHomePage /> },
      { path: "/memorial-manager/edit-profile", element: <ProfileEditPage /> },
      { path: "/open", element: <OpenMemorialHomePage /> },
      { path: "/enter", element: <EnterMemorialHomePage /> },
      { path: "/request-entry", element: <RequestEntryPage /> },

      /* 글 작성 */
      { path: "/write", element: <WritePostPage /> },

      /* AI 이미지 생성 */
      { path: "/generate", element: <AIGeneratePage /> },

      /* 편지함 */
      { path: "/sent-letter", element: <SentLetterPage /> },
      { path: "/sent-letterbox", element: <SentLetterBoxPage /> },
    ],
  },
]);

export default router;
