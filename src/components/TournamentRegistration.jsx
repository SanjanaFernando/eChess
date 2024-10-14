import React from 'react';

const TournamentRegistration = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">

            {/* Header Section */}
            <header className="bg-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center">
                    <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
                </div>
                <nav className="mt-4 sm:mt-0">
                    <ul className="flex flex-col sm:flex-row  space-y-4 sm:space-y-0 sm:space-x-16">
                        <li><a href="#" className="text-black">Tournaments</a></li>
                        <li><a href="#" className="text-black">Payments</a></li>
                    </ul>
                </nav>
                <div className="mt-4 sm:mt-0 flex items-center">
                    <img src="/User.png" alt="User Icon" className="h-10 mr-4" />
                </div>
            </header>

            {/* Tournament Details */}
            <section className="bg-red-100 p-6 rounded-lg ">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex justify-center items-center text-center">
                    <img src="/trophy.png" alt="Trophy" className="h-10 mr-3" />
                    2024 Michigan Speed Championship
                </h2>

                <ul className="text-sm sm:text-lg space-y-2">
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Start Date</strong>
                        <span className="w-auto sm:w-3.5">:</span>
                        <span className="w-full sm:w-1/2">2024/08/25</span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Close Date</strong>
                        <span className="w-auto sm:w-3.5">:</span>
                        <span className="w-full sm:w-1/2">2024/08/25</span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Venue</strong>
                        <span className="w-auto sm:w-3.5">:</span>
                        <span className="w-full sm:w-1/2">Hall of Chess, Jawaharlal Nehru Stadium, Periamet, Chennai – 600 003</span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Contact</strong>
                        <span className="w-auto sm:w-3.5">:</span>
                        <span className="w-full sm:w-1/2">9499915932</span>
                    </li>
                </ul>
            </section>

            {/* Registration Form */}
            <section className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-3xl font-bold mb-6">Tournament Registration</h2>
                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input type="text" id="name" placeholder="Name" className="w-full p-3 border border-gray-300 rounded" required />
                        </div>
                        <div>
                            <label htmlFor="fideID" className="block text-gray-700 font-semibold mb-2">FIDE ID</label>
                            <input type="text" id="fideID" placeholder="1234 1234 1234 1234" className="w-full p-3 border border-gray-300 rounded" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        <div>
                            <label htmlFor="birthday" className="block text-gray-700 font-semibold mb-2">Birthday</label>
                            <input type="text" id="birthday" placeholder="DD/MM/YY" className="w-full p-3 border border-gray-300 rounded" required />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">Rating</label>
                            <input type="text" id="rating" placeholder="FIDE Rating" className="w-full p-3 border border-gray-300 rounded" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input type="text" id="address" placeholder="Address" className="w-full p-3 border border-gray-300 rounded" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">Country</label>
                        <input type="text" id="country" placeholder="Sri Lanka" className="w-full p-3 border border-gray-300 rounded" required />
                    </div>

                    <p className="text-sm text-gray-500 mb-6">
                        After successful payment, you will receive a confirmation SMS from "ECHESS" and an email from "payment-report@payu.lk".
                    </p>

                    <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-800">
                        Next
                    </button>
                </form>
            </section>
        </div>
    );
};

export default TournamentRegistration;
