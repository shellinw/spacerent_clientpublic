import { createBrowserRouter, redirect } from "react-router-dom";
import PublicHomePage from "../Views/PublicHomePage";
import PublicDetailedLodgePage from "../Views/PublicDetailedLodgePage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicHomePage />,
    },
    {
        path: "/lodge/:id",
        element: <PublicDetailedLodgePage />,
    },
]);

export default router;
