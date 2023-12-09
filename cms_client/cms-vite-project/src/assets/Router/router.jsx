import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../Views/LoginPage";
import CMSHomePage from "../Views/CMSHomePage";
import AddUserForm from "../Views/AddUserForm";
import LodgeListPage from "../Views/LodgeListPage";
import TypeListPage from "../Views/TypeListPage";
import AddLodgePage from "../Views/AddLodgePage";
import AddTypePage from "../Views/AddTypePage";
import UpdateLodgePage from "../Views/UpdateLodgePage";
import UploadImagePage from "../Views/UploadImagePage";
import Swal from "sweetalert2";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                Swal.fire({
                    title: "You already logged-in",
                    text: `Cannot access login page`,
                    icon: "warning",
                    confirmButtonText: "Cool",
                });
                return redirect("/cms");
            }
            return null;
        },
    },
    {
        path: "/cms",
        element: <CMSHomePage />,
        loader: () => {
            if (!localStorage.getItem("access_token")) {
                return redirect("/login");
            }
            return null;
        },
        children: [
            {
                path: "addUser",
                element: <AddUserForm />,
            },
            {
                path: "lodgelist",
                element: <LodgeListPage />,
            },
            {
                path: "typelist",
                element: <TypeListPage />,
            },
            {
                path: "lodgelist/addLodge",
                element: <AddLodgePage />,
            },
            {
                path: "typelist/addType",
                element: <AddTypePage />,
            },
            {
                path: "updatelodge/:id",
                element: <UpdateLodgePage />,
            },
            {
                path: "uploadimage/:id",
                element: <UploadImagePage />,
            },
        ],
    },
]);

export default router;
