import React, { useState } from "react";

const PlayerProfile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        console.log("Logged out");
        // Add logout logic here
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
                <h1 className="text-xl font-semibold text-gray-800 flex items-center">
                    <div className="flex items-center">
                        <img
                            src="/LogoB.png"
                            alt="eChess Logo"
                            className="h-10 mr-4"
                        />
                    </div>
                </h1>
                <div className="relative">
                    <div
                        className="mt-4 sm:mt-0 flex items-center cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                        }}
                    >
                        <img
                            src="/User.png"
                            alt="User Icon"
                            className="h-10 mr-4"
                        />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <ul className="py-1">
                                <li>
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            {/* Profile Section */}
            <div className="flex justify-center items-center">
                <div className="max-w-4xl w-full p-4">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
                            <img
                                src="/Arrow 1.png"
                                alt="Back"
                                className="w-4 h-4"
                            />
                            <span className="text-sm">Back</span>
                        </button>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex">
                        {/* Profile Picture */}
                        <div>
                            <img
                                src="/playerpic.PNG"
                                alt="Profile"
                                className="w-[450px] h-[450px] rounded-lg object-cover"
                            />
                        </div>

                        {/* Player Details and Ratings */}
                        <div className="flex-1 ml-6">
                            {/* Player Details */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Surname, Name
                                </h2>
                                <button className="text-gray-600 hover:text-gray-900">
                                    <img
                                        src="/edit icon.png"
                                        alt="Edit"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-600 mt-4">
                                <p className="font-medium">FIDE Title:</p>
                                <p>Grandmaster</p>
                                <p className="font-medium">FIDE ID:</p>
                                <p>9958932</p>
                                <p className="font-medium">B-Year:</p>
                                <p>2001</p>
                                <p className="font-medium">Sex:</p>
                                <p>Male</p>
                                <p className="font-medium">Federation:</p>
                                <p>Sri Lanka</p>
                            </div>


                            {/* Ratings */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-100 rounded-md p-4 text-center">
                                        <p className="text-gray-600 text-sm">Standard</p>
                                        <p className="text-xl font-semibold text-gray-800">
                                            2802
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-md p-4 text-center">
                                        <p className="text-gray-600 text-sm">Rapid</p>
                                        <p className="text-xl font-semibold text-gray-800">
                                            2780
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-md p-4 text-center">
                                        <p className="text-gray-600 text-sm">Blitz</p>
                                        <p className="text-xl font-semibold text-gray-800">
                                            2830
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
