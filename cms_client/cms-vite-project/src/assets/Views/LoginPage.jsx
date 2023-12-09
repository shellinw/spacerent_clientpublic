import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const url = "https://server.shellinwinata.tech/";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            console.log(email);
            console.log(password);

            const response = await axios.post(`${url}login`, {
                email,
                password,
            });

            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("loggedUser", `${email}`);

            navigate("/cms");
            Swal.fire({
                title: "Success",
                text: `Let's Go`,
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

    return (
        <>
            {/* <div className="pt-10">
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <h1 className="pb-5 text-gray-700">Login</h1>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            name="email"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            name="password"
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>
            </div> */}

            <div>
                <div className="h-screen bg-white flex flex-col space-y-10 justify-center items-center">
                    <h1 className="text-[2rem] font-medium">
                        Space Rent CMS Page
                    </h1>
                    <div className="bg-white w-96 shadow-xl rounded p-5">
                        <h1 className="text-3xl font-medium">Welcome</h1>
                        <p className="text-sm">Login to CMS page</p>

                        <form className="space-y-5 mt-5" onSubmit={handleLogin}>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="text"
                                className="w-full h-12 border border-gray-800 rounded px-3"
                                placeholder="Email"
                            />
                            <div className="w-full flex items-center border border-gray-800 rounded px-3">
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password"
                                    className="w-4/5 h-12"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="">
                                <a
                                    href="#!"
                                    className="font-medium text-blue-900 hover:bg-blue-300 rounded-md p-2"
                                >
                                    Forgot Password ?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="text-center w-full bg-blue-900 rounded-md text-white py-3 font-medium"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div></div>
            <Outlet />
        </>
    );
}

export default LoginPage;
