import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";
import  MemorialMyHomePage from "./features/MemorialHome/pages/MemorialMyHomePage";
import { MemorialManagerHomePage } from "./features/MemorialHome/pages/MemorialManagerHomePage";
import { ProfileEditPage } from "./features/MemorialHome/pages/ProfileEditPage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {index:true,element:<HomePage/>},
            {path:"/memorial",element:<MemorialHomePage/>},
            {path:"/memorial-my",element:<MemorialMyHomePage/>},
            {path:"/memorial-manager",element:<MemorialManagerHomePage/>},
            {path:"/memorial-manager/edit-profile",element:<ProfileEditPage/>}
        ]
    }
])

export default router;