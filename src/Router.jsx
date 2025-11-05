import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";
import WritePostPage from "./pages/WritePostPage";
import AIGeneratePage from "./pages/AIGeneratePage";
import MemorialMyHomePage from "./features/MemorialHome/pages/MemorialMyHomePage";
import { MemorialManagerHomePage } from "./features/MemorialHome/pages/MemorialManagerHomePage";
import { ProfileEditPage } from "./features/MemorialHome/pages/ProfileEditPage";
import { FirstPage } from "./pages/FirstPage";
import OpenMemorialHomePage from "./pages/OpenMemorialHomePage";
import RequestEntryPage from "./pages/RequestEntryPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* 온보딩 관련 */
      { index: true, element: <FirstPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },

      /* 홈 관련 */
      { path: "/homepage", element: <HomePage /> },

      /* 추모관 관련 */
      { path: "/memorial", element: <MemorialHomePage /> },
      { path: "/memorial-my", element: <MemorialMyHomePage /> },
      { path: "/memorial-manager", element: <MemorialManagerHomePage /> },
      { path: "/memorial-manager/edit-profile", element: <ProfileEditPage /> },
      { path: "/open", element: <OpenMemorialHomePage /> },
      { path: "/request-entry", element: <RequestEntryPage /> },

      /* 글 작성 */
      { path: "/write", element: <WritePostPage /> },

      /* AI 이미지 생성 */
      { path: "/generate", element: <AIGeneratePage /> },
    ],
  },
]);

export default router;
