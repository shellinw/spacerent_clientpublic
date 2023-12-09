import React, { useEffect, useState } from "react";
import PublicNavbar from "../Components/PublicNavbar";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

function PublicDetailedLodgePage() {
    const lodgingId = useParams().id;
    const [error, seterror] = useState();
    const [lodging, setlodging] = useState({
        id: null,
        name: "",
        facility: "",
        roomCapacity: null,
        imgUrl: "",
        location: "",
        price: null,
        typeId: null,
        authorId: null,
    });

    //useeffect, fetch berdasarkan useparam.id
    useEffect(() => {
        const fetchLodging = async () => {
            try {
                const response = await axios.get(
                    `https://server.shellinwinata.tech/public-lodges/${lodgingId}`
                );
                setlodging(response.data.lodge);
                console.log(response.data.lodge);
            } catch (error) {
                seterror(error.message);
            }
        };
        fetchLodging();
    }, [lodgingId]);

    if (error) return <h1>{error}</h1>;

    return (
        <>
            <PublicNavbar />
            <div className="flex justify-center">
                <div className="p-8 content-center">
                    <div>
                        <img
                            className="rounded-[2rem]"
                            src={lodging.imgUrl}
                            alt="imagehere"
                        />
                    </div>
                    <div className="flex flex-cols px-8 py-6">
                        <div className="w-3/4 space-y-5">
                            <h1 className="text-5xl">{lodging.name}</h1>
                            <p className="text-2xl">{lodging.location}</p>
                            <p>
                                Jean Hosted by Jean We are a fashion house
                                offering our stunning event space & photo studio
                                in the Seaport District of New York.
                            </p>
                            <p>{lodging.facility}</p>
                            <h2 className="text-2xl">
                                {lodging.roomCapacity}guests max
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default PublicDetailedLodgePage;
