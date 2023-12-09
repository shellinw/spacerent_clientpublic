import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function UploadImagePage() {
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const navigate = useNavigate();
    const [lodgeId, setLodgeId] = useState(useParams().id);
    const [imgData, setImgdata] = useState(0);
    const [clicked, setClicked] = useState(false);

    const form = new FormData();
    form.append("gambar", imgData);

    const uploadImage = async (id) => {
        try {
            await axios.patch(`${url}lodges/${lodgeId}`, form, config);
            navigate("/cms/lodgelist");
            Swal.fire({
                title: "Success!",
                text: `Success Upload Image for ID ${lodgeId}`,
                icon: "success",
                confirmButtonText: "Cool",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `${error.response.data.message}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    useEffect(() => {
        uploadImage();
    }, [imgData && clicked == true]);
    return (
        <>
            <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">
                <form
                    onInput={(e) => {
                        e.preventDefault();
                        setImgdata(e.target.files[0]);
                    }}
                >
                    <h1 className="text-xl text-center m-5">
                        Upload Image for lodge id {lodgeId}
                    </h1>
                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>

                        <span className="mt-2 text-base leading-normal ">
                            {imgData ? <>Selected a file</> : <>Input file</>}
                        </span>
                        <input type="file" className="hidden" />
                    </label>
                    <Link
                        className="m-[5rem] ml-[5rem] bg-gray-500 px-[1rem] py-[5px] rounded-md"
                        onClick={() => {
                            setClicked(true);
                        }}
                    >
                        <button>Upload</button>
                    </Link>
                </form>
            </div>
        </>
    );
}

export default UploadImagePage;
