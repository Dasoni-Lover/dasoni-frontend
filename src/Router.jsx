import { createBrowserRouter, Router } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import MemorialHomePage from "./pages/MemorialHomePage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {index:true,element:<HomePage/>},
            {path:"/memorial",element:<MemorialHomePage/>}
        ]
    }
])

export default router;