import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function CMSNavbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            console.log(localStorage.getItem("loggedUser"));
            localStorage.removeItem("access_token");
            localStorage.removeItem("loggedUser");
            console.log("logout");
            Swal.fire({
                title: "Success",
                text: `You have logged out`,
                icon: "success",
                confirmButtonText: "Cool",
            });
            navigate("/login");
        } catch (error) {
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
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-10">
                    <a
                        href="https://flowbite.com"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="https://pro2-bar-s3-cdn-cf6.myportfolio.com/3a330009-4c91-496b-8a15-11d01a99d01f/0e2d79f2-e6b2-4d25-b2bf-501c8767bef1_rwc_0x0x1000x1000x4096.png?h=52b6bd64bf31341074e77ee9d4e3cac6"
                            className="h-8"
                        />

                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Space Rent Admin Page
                        </span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a
                            href="tel:5541251234"
                            className="text-sm  text-gray-500 dark:text-white hover:underline"
                        >
                            Signed in as{" "}
                            <p className="font-semibold text-gray-900">
                                {localStorage.getItem("loggedUser")}
                            </p>
                        </a>

                        <Link onClick={handleLogout}>
                            <button className="cursor-pointer text-sm  text-blue-500 dark:text-blue-500 hover:underline">
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-300 dark:bg-gray-500">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link
                                    to={"/cms"}
                                    className="text-black dark:text-white hover:underline pl-8"
                                    aria-current="page"
                                >
                                    Home Page
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={"typelist"}
                                    className="text-black dark:text-white hover:underline pl-8"
                                    aria-current="page"
                                >
                                    Types List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"lodgelist"}
                                    className="text-black dark:text-white hover:underline pl-8"
                                    aria-current="page"
                                >
                                    Lodges List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"addUser"}
                                    className="text-black dark:text-white hover:underline pl-8"
                                >
                                    Add User
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default CMSNavbar;
