import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import FormLodge from "../Components/FormLodge";
function UpdateLodgePage() {
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const [lodge, setLodge] = useState({});
    const [lodgeId, setLodgeId] = useState(useParams().id);

    const fetchLodgeById = async () => {
        try {
            const { data } = await axios.get(`${url}lodges/${lodgeId}`, config);
            console.log(data.lodge);
            setLodge(data.lodge);
        } catch (error) {
            console.log(error.response);
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    useEffect(() => {
        fetchLodgeById();
    }, []);

    useEffect(() => {
        if (lodgeId) fetchLodgeById();
    }, [lodgeId]);

    return (
        <>
            <FormLodge lodge={lodge} fetchLodgeById={fetchLodgeById} />
        </>
    );
}

export default UpdateLodgePage;
