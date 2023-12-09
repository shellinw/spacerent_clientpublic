import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function TypeListPage() {
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const fetchTypes = async () => {
        try {
            const { data } = await axios.get(`${url}types`, config);
            setTypes(data.data);
        } catch (error) {
            setError(error);
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}types/${+id}`, config);
            console.log(response);
            setTimeout(() => {
                fetchTypes();
            }, 400);
            Swal.fire({
                title: "Success!",
                text: `Success deleted type id ${id}`,
                icon: "success",
                confirmButtonText: "Cool",
            });
        } catch (error) {
            setError(error);
            Swal.fire({
                title: "Error!",
                text: `${error.response.data.message}`,
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
            <div className=" pt-[2rem] relative overflow-x-auto shadow-md sm:rounded-lg pl-10 pr-10 pt-10 pb-10">
                <div className="w-full">
                    <div className="py-3">
                        <Link to={"addType"}>
                            <button className="bg-gray-500 text-white rounded-[2rem] w-[8rem] h-[3rem] transistion duration-300 hover:bg-gray-300 hover:text-black">
                                Add Type
                            </button>
                        </Link>
                    </div>
                    <table className="">
                        <thead className="bg-gray-300">
                            <tr className="">
                                <th className="px-10 py-3 text-left">ID</th>
                                <th className="px-10 py-3 text-left">Types</th>
                                <th className="px-10 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((el) => {
                                return (
                                    <tr key={el.id}>
                                        <td className="px-10 py-3 text-left">
                                            {el.id}
                                        </td>
                                        <td className="px-10 py-3 text-left">
                                            {el.name}
                                        </td>

                                        <Link
                                            onClick={(e) => {
                                                handleDelete(el.id);
                                            }}
                                        >
                                            <button className="m-1 bg-gray-200 rounded-[2rem] w-[8rem] h-[3rem] hover:text-blue-500 hover:underline">
                                                Delete
                                            </button>
                                        </Link>
                                        {/* 
                                            <td className="px-10 py-3">
                                                <button className="bg-gray-200 rounded-[2rem] w-[8rem] h-[3rem] hover:text-red-500 hover:underline">
                                                    Delete
                                                </button>
                                            </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Outlet />
        </>
    );
}

export default TypeListPage;
