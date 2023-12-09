import React from "react";
import { Outlet } from "react-router-dom";
import CMSNavbar from "../Components/CMSNavbar";

function CMSHomePage() {
    return (
        <>
            <CMSNavbar />
            <Outlet />
        </>
    );
}

export default CMSHomePage;
