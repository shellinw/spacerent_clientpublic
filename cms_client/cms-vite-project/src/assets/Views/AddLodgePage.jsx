import React from "react";
import AddLodgeForm from "../Components/AddLodgeForm";
import { Outlet } from "react-router-dom";
function AddLodgePage() {
    return (
        <>
            <AddLodgeForm />
            <Outlet />
        </>
    );
}

export default AddLodgePage;
