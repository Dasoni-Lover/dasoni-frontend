import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";
import WritePostPage from "./pages/WritePostPage";
import AIGeneratePage from "./pages/AIGeneratePage";
import MemorialMyHomePage from "./features/MemorialHome/pages/MemorialMyHomePage";
import { MemorialManagerHomePage } from "./features/MemorialHome/pages/MemorialManagerHomePage";
import { ProfileEditPage } from "./features/MemorialHome/pages/ProfileEditPage";
import { FirstPage } from "./pages/FirstPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/memorial", element: <MemorialHomePage /> },
      { path: "/memorial-my", element: <MemorialMyHomePage /> },
      { path: "/memorial-manager", element: <MemorialManagerHomePage /> },
      { path: "/memorial-manager/edit-profile", element: <ProfileEditPage /> },
      { path: "/write", element: <WritePostPage /> },
      { path: "/generate", element: <AIGeneratePage /> },
      { path: "/homepage", element: <FirstPage /> },
    ],
  },
]);

export default router;
