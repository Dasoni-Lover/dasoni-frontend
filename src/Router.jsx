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
import { LoginPage } from "./features/Login/pages/LoginPage";
import { RegisterPage } from "./features/Login/pages/RegisterPage";
import OpenMemorialHomePage from "./pages/OpenMemorialHomePage";
import RequestEntryPage from "./pages/RequestEntryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <FirstPage /> },
      { path: "/memorial", element: <MemorialHomePage /> },
      { path: "/memorial-my", element: <MemorialMyHomePage /> },
      { path: "/memorial-manager", element: <MemorialManagerHomePage /> },
      { path: "/memorial-manager/edit-profile", element: <ProfileEditPage /> },
      { path: "/write", element: <WritePostPage /> },
      { path: "/generate", element: <AIGeneratePage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/loginpage", element: <LoginPage /> },
      { path: "/registerpage", element: <RegisterPage /> },
      { path: "/open", element: <OpenMemorialHomePage /> },
      { path: "/request-entry", element: <RequestEntryPage /> },
    ],
  },
]);

export default router;
