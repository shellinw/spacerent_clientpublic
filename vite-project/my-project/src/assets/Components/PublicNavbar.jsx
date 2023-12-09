import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function PublicNavbar() {
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const fetchTypes = async () => {
        try {
            const { data } = await axios.get(`${url}types`, config);
            setTypes(data.data);
            // console.log(data.data);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-10">
                    <a
                        href="https://flowbite.com"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="https://pro2-bar-s3-cdn-cf6.myportfolio.com/3a330009-4c91-496b-8a15-11d01a99d01f/0e2d79f2-e6b2-4d25-b2bf-501c8767bef1_rwc_0x0x1000x1000x4096.png?h=52b6bd64bf31341074e77ee9d4e3cac6"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white ">
                            Space Rent
                        </span>
                    </a>
                </div>
            </nav>
            <nav className="bg-gray-800 dark:bg-gray-700 shadow-lg shadow-indigo-800/50">
                <div className="max-w-screen-xl px-4 py-3 mx-auto h-[3.5rem]">
                    <div className="flex flex-center">
                        <ul className="flex flex-cols font-medium mt-0 space-x-8 rtl:space-x-reverse text-[20px]">
                            <li>
                                <Link
                                    to={"/"}
                                    className="text-white dark:text-white hover:underline pl-8 "
                                    aria-current="page"
                                >
                                    Home Page
                                </Link>
                            </li>
                            <li>
                                <select
                                    className="bg-transparent border-gray-200 dark:bg-gray-900 text-white dark:text-white"
                                    id=""
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        console.log(type);
                                    }}
                                >
                                    {types.map((el) => {
                                        return (
                                            <option key={el.id} value={el.id}>
                                                {el.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default PublicNavbar;
