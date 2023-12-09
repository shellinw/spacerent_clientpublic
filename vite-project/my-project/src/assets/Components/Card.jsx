import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import React from "react";

function Card({ lodge }) {
    const {
        name,
        roomCapacity,
        facility,
        location,
        price,
        typeId,
        id,
        imgUrl,
    } = lodge;

    return (
        <>
            <div className="py-8 w-[25rem]">
                <img
                    src={imgUrl}
                    alt="ImageofLodges"
                    className="rounded-xl rounded-b-none w-[40rem] h-[18rem]"
                />
                <div className="p-4 bg-gray-200 space-y-1 rounded-b-xl h-[17rem]">
                    <h2 className="font-semibold py-1">{name}</h2>
                    <p className="text-sm">Capacity {roomCapacity}</p>
                    <p className="text-xs">{facility}</p>
                    <p className="text-sm font-semibold">{location}</p>
                    <p className="text-sm">Rp {price}</p>
                    <div className="flex flex-cols justify-between">
                        <div className="py-3">
                            <Link to={`/lodge/${id}`}>
                                <button className="bg-white text-black px-3 py-2 rounded-[10rem] text-sm ">
                                    <p>Show Details </p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    );
}

export default Card;
