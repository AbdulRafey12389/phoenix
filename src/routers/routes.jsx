// NODE MODULES...
import { createBrowserRouter } from "react-router-dom";


// COMPONENTS...
import App from "../App";
import Register from "../pages/Register";


// ROUTER...
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/register",
        element: <Register />
    }
])


export default router;