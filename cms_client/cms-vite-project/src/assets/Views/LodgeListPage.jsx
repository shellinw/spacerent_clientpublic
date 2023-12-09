import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";

function LodgeListPage() {
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const [lodges, setLodges] = useState([]);
    const [error, setError] = useState(false);

    const fetchLodges = async () => {
        try {
            const { data } = await axios.get(`${url}lodges`, config);
            setLodges(data.lodges);
            console.log(lodges);
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
            const response = await axios.delete(`${url}lodges/${+id}`, config);
            console.log(response);
            setTimeout(() => {
                fetchLodges();
            }, 1000);
            Swal.fire({
                title: "Success!",
                text: `Deleted Lodge ID ${id}`,
                icon: "success",
                confirmButtonText: "Cool",
            });
        } catch (error) {
            console.log(error);
            setError(error);
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    useEffect(() => {
        fetchLodges();
    }, []);
    return (
        <>
            <div className=" pt-[2rem] relative overflow-x-auto shadow-md sm:rounded-lg pl-10 pr-10 pt-10 pb-10">
                <div className="">
                    <div className="py-3">
                        <Link to={"addLodge"}>
                            <button className="bg-gray-500 text-white rounded-[2rem] w-[8rem] h-[3rem] transistion duration-300 hover:bg-gray-300 hover:text-black">
                                Add Lodge
                            </button>
                        </Link>
                    </div>
                    <table className="border-collapse">
                        <thead className="bg-gray-300  w-full text-center">
                            <tr className="">
                                <th className="px-5 py-3 text-left">ID</th>
                                <th className="px-5 py-3 text-left">Name</th>
                                <th className="px-5 py-3 text-left">
                                    Facility
                                </th>
                                <th className="px-5 py-3 text-left">
                                    Location
                                </th>
                                <th className="px-5 py-3 text-left">Price</th>
                                <th className="px-5 py-3 text-left">
                                    Image Url
                                </th>
                                <th className="px-5 py-3 text-left">
                                    AuthorId
                                </th>
                                <th className="px-5 py-3 text-left">Type</th>
                                <th className="px-5 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {lodges.map((el) => {
                                return (
                                    <tr key={el.id}>
                                        <td className="px-5 py-3">{el.id}</td>
                                        <td className="px-5 py-3">{el.name}</td>
                                        <td className="px-5 py-3 text-xs">
                                            {el.facility}
                                        </td>
                                        <td className="px-5 py-3">
                                            {el.location}
                                        </td>
                                        <td className="px-5 py-3">
                                            {el.price}
                                        </td>
                                        <td className="px-5 py-3">
                                            {el.imgUrl}
                                        </td>
                                        <td className="px-5 py-3">
                                            {el.authorId}
                                        </td>
                                        <td className="px-5 py-3">
                                            {el.typeId}
                                        </td>

                                        <td className="flex flex-cols flex items-center pt-8  flex space-x-3">
                                            <Link
                                                to={`/cms/updatelodge/${el.id}`}
                                            >
                                                <button className="bg-gray-200 rounded-[2rem] w-[8rem] h-[3rem] hover:text-blue-500 hover:underline">
                                                    Edit
                                                </button>
                                            </Link>
                                            <Link
                                                to={`/cms/uploadimage/${el.id}`}
                                            >
                                                <button className="bg-gray-200 rounded-[2rem] w-[8rem] h-[3rem] hover:text-blue-500 hover:underline">
                                                    Upload Image
                                                </button>
                                            </Link>
                                            <Link
                                                onClick={(e) => {
                                                    handleDelete(el.id);
                                                }}
                                            >
                                                <button className="bg-gray-200 rounded-[2rem] w-[8rem] h-[3rem] hover:text-red-500 hover:underline">
                                                    Delete
                                                </button>
                                            </Link>
                                        </td>
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

export default LodgeListPage;
