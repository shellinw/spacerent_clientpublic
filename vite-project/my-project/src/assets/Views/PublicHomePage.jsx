import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../Components/PublicNavbar";
import Card from "../Components/Card";
import Swal from "sweetalert2";
import axios from "axios";

function PublicHomePage() {
    const [dataCount, setDataCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
    }

    const [error, seterror] = useState();
    const [search, setSearch] = useState("");
    const [lodges, setLodges] = useState([
        {
            id: 1,
            name: "Olive Instance Inc",
            facility:
                "Coworking spaces / One Of The Tallest Buildings In Jakarta - Five-Minute Walk To The Trans Jakarta Busway And The Upcoming MRT - On-Site Parking Available",
            roomCapacity: 26,
            imgUrl: "https://images.squarespace-cdn.com/content/v1/5cbf44b101232c7b9bfb3a32/1560357296444-7ZG2UFGRAGGOGKREJHA4/OV+5.jpg?format=1500w",
            location: "Jalan Jendral Sudirman, Jakarta, 10220",
            price: 2500000,
            typeId: 1,
            authorId: 1,
        },
        {
            id: 2,
            name: "Green Inc",
            facility:
                "Shared Office Space, Private Workspace, Services included,Flexible term,Fixed cost,Coworking spaces / Warm, relaxed ambience - 180° Unblocked City View - High Speed Internet ",
            roomCapacity: 53,
            imgUrl: "https://www.wework.com/vanilla-assets/images/office_space.1626878991452b25c2667aacc832d5f3.jpg",
            location: "Daerah Khusus Ibukota, Jakarta, 12980",
            price: 1500000,
            typeId: 2,
            authorId: 1,
        },
        {
            id: 3,
            name: "Atlanta Corporate Office",
            facility:
                "Coworking spaces / Virtual-Serviced Office And Hot Desk Space - Premium Location - Central To Malls-Restaurants-Apartments And Fitness Facilities",
            roomCapacity: 75,
            imgUrl: "https://blog.go-work.com/wp-content/uploads/2019/07/Rent-an-Office-Space.jpg",
            location: "Jalan Hr Rasuna Said, Jakarta, 12920",
            price: 46805955,
            typeId: 3,
            authorId: 1,
        },
    ]);
    const [sort, setSort] = useState("");

    //search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        console.log(search);
        setSearch(newSearch);
    }

    //sorting based on attributes
    const fetchAllLodges = async () => {
        try {
            const { data } = await axios.get(
                `https://server.shellinwinata.tech/public-lodges?page=${currentPage}&size=8&sort=${sort}&search=${search}`
            );

            setLodges(data.lodges.rows);
            setDataCount(data.lodges.count);
            setTotalPages(Math.ceil(data.lodges.count / 10));
        } catch (error) {
            seterror(error);
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    const prevHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextHandler = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const clickedPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchAllLodges();
    }, [sort, search, currentPage]);

    if (error) return <h1>{error}</h1>;

    return (
        <>
            <PublicNavbar />
            <div className="px-10 pt-10">
                <div className="text-[2rem] text-center">
                    Find the perfect space for any occasion. <br />
                </div>
            </div>
            <div className="px-5 py-8">
                <div className="w-full">
                    <div className="w-[80%] mx-auto text-black">
                        <div className="w-full">
                            <div className="flex justify-center items-center">
                                <input
                                    type="text"
                                    placeholder="Search spaces here"
                                    className="w-full text-md font-semibold px-4 py-3 text-black my-4 rounded-xl border-gray-700 bg-gray-100 shadow-lg outline-none"
                                    onChange={searchOnChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSort("name");
                            }}
                            className="m-1 bg-gray-200 w-[10rem] rounded-xl h-9 transistion duration-300 hover:bg-gray-400 hover:text-white"
                        >
                            sort asc
                        </button>
                        <button
                            onClick={() => {
                                setSort("-name");
                            }}
                            className="m-1 bg-gray-200 w-[10rem] rounded-xl h-9 transistion duration-300 hover:bg-gray-400 hover:text-white"
                        >
                            sort desc
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly flex flex-wrap gap-5 px-3">
                <img
                    className="pt-2 w-full opacity-85 shadow-lg shadow-indigo-800/50 rounded-xl"
                    src="https://cdn.wework.com/locations/image/e28a1578-4702-11ec-a82f-0e6a5dc689cd/Web_150DPI-20210908_30_Stamford_St_03BW101_10.jpg"
                    alt=""
                />

                <>
                    {/* {this is card} */}
                    {lodges.map((lodge, index) => {
                        return <Card lodge={lodge} key={index} />;
                    })}
                </>
            </div>

            {/* {pagination} */}
            <div className="flex justify-center pt-[2rem] pb-[5rem]">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={prevHandler}
                            >
                                Previous
                            </a>
                        </li>
                        {pageArray.map((el) => {
                            return (
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        onClick={() => clickedPage(el)}
                                    >
                                        {el}
                                    </a>
                                </li>
                            );
                        })}

                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={nextHandler}
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* {Footer} */}
            <div className="w-full h-[40rem] bg-gray-800">
                <div className="flex text-md">
                    <div className="w-1/3 text-white text-center pt-12 ">
                        <div className="underline text-[20px] font-bold">
                            Popular Cities
                        </div>
                        <ul className="text-white space-y-3 space-x-2 pt-5">
                            <li>Jakarta</li>
                            <li>Bandung</li>
                            <li>Medan</li>
                            <li>Bogor</li>
                            <li>Tangerang</li>
                            <li>Cirebon</li>
                            <li>Bekasi</li>
                        </ul>
                    </div>

                    <div className="w-1/3 text-white text-center pt-12">
                        <div className="underline text-[20px] font-bold">
                            Spaces Types
                        </div>
                        <ul className="text-white space-y-3 space-x-2 pt-5">
                            <li>Exhibition Hall</li>
                            <li>Coworking Space</li>
                            <li>Personal Office</li>
                            <li>Studio</li>
                            <li>Event Space</li>
                            <li>Ball Room</li>
                            <li>Meeting Room</li>
                        </ul>
                    </div>

                    <div className="w-1/3 text-white text-center  pt-12">
                        <div className=" underline text-[20px] font-bold">
                            Resources
                        </div>
                        <ul className="text-white space-y-3 space-x-2 pt-5">
                            <li>Contact Us</li>
                            <li>FAQs</li>
                            <li>Terms of Use</li>
                            <li>Host Guarantee</li>
                            <li>How to Rent</li>
                            <li>List My Spaces</li>
                        </ul>
                    </div>
                </div>
                <div className="w-[80rem] h-[1px] bg-white m-[5rem]"></div>

                <div className="flex text-md">
                    <div className="w-1/3 text-white text-center ">
                        <div className="text-[20px]">
                            Copyright © 2023 Space Rent Inc.
                        </div>
                    </div>

                    <div className="w-1/3 text-white text-center">
                        <div className="text-[20px]">
                            Call us: 844-478-6948 Mon-Fri 9am-5pm MST
                            <br /> Email us: support@stowit.com
                        </div>
                    </div>

                    <div className="w-1/3">
                        <div className="flex pl-[12rem]">
                            <img
                                src="https://www.stowit.com/resources/new-image/facebook.svg"
                                alt=""
                                className="p-2"
                            />
                            <img
                                src="https://www.stowit.com/resources/new-image/twitter.svg"
                                alt=""
                                className="p-2"
                            />
                            <img
                                src="https://www.stowit.com/resources/new-image/instagram.svg"
                                alt=""
                                className="p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    );
}

export default PublicHomePage;
