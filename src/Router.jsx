import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { authGuard } from "./utils/authGuard";

/* 온보딩 관련 */
import FirstPage from "./pages/FirstPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";

/* 홈 관련 */
import { HomePage } from "./pages/HomePage";

/* 추모관 관련 */
import MemorialHallPage from "./pages/MemorialHallPage";
import { ProfileEditPage } from "./features/MemorialHall/pages/ProfileEditPage";
import OpenMemorialHallPage from "./pages/OpenMemorialHallPage";
import { EnterMemorialHallPage } from "./pages/EnterMemorialHallPage";
import RequestEntryPage from "./pages/RequestEntryPage";

/* 글 작성 */
import WritePostPage from "./pages/WritePostPage";

/* AI 이미지 생성 */
import AIGeneratePage from "./pages/AIGeneratePage";

/* 편지함 */
import { SentLetterPage } from "./pages/SentLetterPage";
import { SentLetterBoxPage } from "./pages/SentLetterBoxPage";
import { LeaveLetterPage } from "./pages/LeaveLetterPage";
import { SavedLetterPage } from "./pages/SavedLetterPage";
import { LeaveLetterBoxPage } from "./pages/LeaveLetterBoxPage";
import { SavedLetterBoxPage } from "./pages/SavedLetterBoxPage";
import RecievedLetterBoxPage from "./pages/RecievedLetterBoxPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* 온보딩 관련 (로그인 필요 없음) */
      { index: true, element: <FirstPage /> },
      { path: "/login", element: <LogInPage /> },
      { path: "/register", element: <RegisterPage /> },

      /* 로그인 필요 페이지들 */
      { path: "/home", element: <HomePage />, loader: authGuard },

      /* 추모관 관련 */
      { path: "/memorial", element: <MemorialHallPage />, loader: authGuard },
      {
        path: "/memorial-my",
        element: <MemorialHallPage />,
        loader: authGuard,
      },
      {
        path: "/memorial-manager",
        element: <MemorialHallPage />,
        loader: authGuard,
      },
      {
        path: "/memorial-manager/edit-profile",
        element: <ProfileEditPage />,
        loader: authGuard,
      },
      { path: "/open", element: <OpenMemorialHallPage />, loader: authGuard },
      { path: "/enter", element: <EnterMemorialHallPage />, loader: authGuard },
      {
        path: "/request-entry",
        element: <RequestEntryPage />,
        loader: authGuard,
      },

      /* 글 작성 */
      { path: "/write", element: <WritePostPage />, loader: authGuard },

      /* AI 이미지 생성 */
      { path: "/generate", element: <AIGeneratePage />, loader: authGuard },

      /* 편지함 */
      { path: "/sent-letter", element: <SentLetterPage />, loader: authGuard },
      {
        path: "/sent-letterbox",
        element: <SentLetterBoxPage />,
        loader: authGuard,
      },
      {
        path: "/leave-letter",
        element: <LeaveLetterPage />,
        loader: authGuard,
      },
      {
        path: "/leave-letterbox",
        element: <LeaveLetterBoxPage />,
        loader: authGuard,
      },
      {
        path: "/saved-letter",
        element: <SavedLetterPage />,
        loader: authGuard,
      },
      {
        path: "/saved-letterbox",
        element: <SavedLetterBoxPage />,
        loader: authGuard,
      },
      {
        path: "/received-letterbox",
        element: <RecievedLetterBoxPage />,
        loader: authGuard,
      },
    ],
  },
]);

export default router;
