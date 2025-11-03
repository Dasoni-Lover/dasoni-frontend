import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";
import WritePostPage from "./pages/WritePostPage";
import AIGeneratePage from "./pages/AIGeneratePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/memorial", element: <MemorialHomePage /> },
      { path: "/write", element: <WritePostPage /> },
      { path: "/generate", element: <AIGeneratePage /> },
    ],
  },
]);

export default router;
