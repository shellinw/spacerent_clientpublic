import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormLodge({ lodge, fetchLodgeById }) {
    const {
        id,
        name,
        facility,
        price,
        location,
        roomCapacity,
        typeId,
        imgUrl,
    } = lodge;

    const url = "https://server.shellinwinata.tech/";
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const format = {
        name: name,
        facility: facility,
        price: price,
        location: location,
        roomCapacity: roomCapacity,
        typeId: typeId,
        imgUrl: imgUrl,
    };
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);
    const [update, setUpdate] = useState(format);
    const handleEditLodge = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(
                `${url}lodges/${id}`,
                update,
                config
            );
            navigate("/cms/lodgelist");
            setUpdate("");
            Swal.fire({
                title: "Success!",
                text: `Updated Lodge ID ${id}`,
                icon: "success",
                confirmButtonText: "Cool",
            });
        } catch (error) {
            console.log(error.response.data);
            Swal.fire({
                title: "Error!",
                text: `${error.response.data.message}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    useEffect(() => {}, []);
    const fetchTypes = async () => {
        try {
            const { data } = await axios.get(`${url}types`, config);
            setTypes(data.data);

            console.log(data.data, `THIS IS TYE`, id);
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
            <div className="pt-10">
                <form className="max-w-md mx-auto" onSubmit={handleEditLodge}>
                    <h1 className="pb-5 text-md text-gray-700">
                        Edit Lodge ID {id}
                    </h1>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={(e) => {
                                setUpdate({
                                    ...update,
                                    name: e.target.value,
                                });
                            }}
                            defaultValue={name}
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            for="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={(e) => {
                                setUpdate({
                                    ...update,
                                    facility: e.target.value,
                                });
                            }}
                            defaultValue={facility}
                            type="text"
                            name="Facility"
                            id="Facility"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="Facility"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Facility
                        </label>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onChange={(e) => {
                                    setUpdate({
                                        ...update,
                                        location: e.target.value,
                                    });
                                }}
                                defaultValue={location}
                                type="text"
                                name="Location"
                                id="Location"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="Location"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Location
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onChange={(e) => {
                                    setUpdate({
                                        ...update,
                                        price: e.target.value,
                                    });
                                }}
                                defaultValue={price}
                                type="number"
                                name="price"
                                id="price"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="price"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Price
                            </label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onChange={(e) => {
                                    setUpdate({
                                        ...update,
                                        roomCapacity: e.target.value,
                                    });
                                }}
                                defaultValue={roomCapacity}
                                type="number"
                                pattern=""
                                name="roomCapacity"
                                id="roomCapacity"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="roomCapacity"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Room Capacity
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                onChange={(e) => {
                                    setUpdate({
                                        ...update,
                                        imgUrl: e.target.value,
                                    });
                                }}
                                defaultValue={imgUrl}
                                type="url"
                                name="type"
                                id="type"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="type"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Image Url
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            {/* <input
                                onChange={(e) => {
                                    setUpdate({
                                        ...update,
                                        typeId: e.target.value,
                                    });
                                }}
                                defaultValue={typeId}
                                type="text"
                                name="type"
                                id="type"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                for="type"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Type/Category
                            </label> */}

                            <div className="relative z-0 w-full mb-5 group">
                                <label
                                    for="underline_select"
                                    className="sr-only"
                                >
                                    Underline select
                                </label>
                                <select
                                    onChange={(e) => {
                                        setUpdate({
                                            ...update,
                                            typeId: e.target.value,
                                        });
                                    }}
                                    id="underline_select"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                >
                                    <label defaultValue={el.id} selected>
                                        Type
                                    </label>
                                    {types.map((el) => {
                                        return (
                                            <option
                                                key={el.id}
                                                value={el.id}
                                            ></option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default FormLodge;
