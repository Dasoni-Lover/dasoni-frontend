import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";
import  MemorialMyHomePage from "./features/MemorialHome/pages/MemorialMyHomePage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {index:true,element:<HomePage/>},
            {path:"/memorial",element:<MemorialHomePage/>},
            {path:"/memorial-my",element:<MemorialMyHomePage/>}
        ]
    }
])

export default router;