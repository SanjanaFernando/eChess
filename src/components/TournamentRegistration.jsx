import React from "react";

const TournamentRegistration = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            {/* Header Section */}
            <header className="bg-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center">
                    <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
                </div>
                <nav className="mt-4 sm:mt-0">
                    <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-16">
                        <li>
                            <a href="#" className="text-black hover:underline">
                                Tournaments
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-black hover:underline">
                                Payments
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-4 sm:mt-0 flex items-center">
                    <img src="/User.png" alt="User Icon" className="h-10" />
                </div>
            </header>

            {/* Tournament Details */}
            <section className="bg-red-100 p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex justify-center items-center text-center">
                    <img src="/trophy.png" alt="Trophy" className="h-10 mr-3" />
                    2024 Michigan Speed Championship
                </h2>
                <ul className="text-sm sm:text-lg space-y-2">
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Start Date</strong>
                        <span className="w-auto">:</span>
                        <span className="w-full sm:w-1/2">2024/08/25</span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Close Date</strong>
                        <span className="w-auto">:</span>
                        <span className="w-full sm:w-1/2">2024/08/25</span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Venue</strong>
                        <span className="w-auto">:</span>
                        <span className="w-full sm:w-1/2">
                            Hall of Chess, Jawaharlal Nehru Stadium, Periamet, Chennai – 600
                            003
                        </span>
                    </li>
                    <li className="flex flex-wrap">
                        <strong className="w-1/3">Contact</strong>
                        <span className="w-auto">:</span>
                        <span className="w-full sm:w-1/2">9499915932</span>
                    </li>
                </ul>
            </section>

            {/* Registration Form */}
            <section className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Tournament Registration
                </h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name with initials
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="fideID" className="block text-gray-700 font-semibold mb-2">
                            FIDE ID
                        </label>
                        <input
                            type="text"
                            id="fideID"
                            placeholder="FIDE ID"
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="sex" className="block text-gray-700 font-semibold mb-2">
                                Sex
                            </label>
                            <select
                                id="sex"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fideRating" className="block text-gray-700 font-semibold mb-2">
                                FIDE Rating
                            </label>
                            <input
                                type="number"
                                id="fideRating"
                                placeholder="1500"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="ageGroup" className="block text-gray-700 font-semibold mb-2">
                                Age Group
                            </label>
                            <select
                                id="ageGroup"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            >
                                <option value="Under 8">Under 8 (before 2016)</option>
                                <option value="Under 10">Under 10 (before 2014)</option>
                                <option value="Under 12">Under 12 (before 2012)</option>
                                <option value="Under 14">Under 14 (before 2010)</option>
                                <option value="Under 16">Under 16 (before 2008)</option>
                                <option value="Under 18">Under 18 (before 2006)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fee" className="block text-gray-700 font-semibold mb-2">
                                Fee
                            </label>
                            <input
                                type="text"
                                id="fee"
                                placeholder="1000"
                                className="w-full p-3 border border-gray-300 rounded"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Address"
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Sri Lanka"
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <p className="text-sm text-gray-500 mb-6 text-center">
                        After successful completion of payment, you will receive an SMS from "ECHESS"
                        and an email from "payment-report@payu.lk" as proof of confirmation,
                        mentioning the Payment ID, without which the entry is not confirmed.
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-800 transition duration-300"
                    >
                        Next
                    </button>
                </form>
            </section>

        </div>
    );
};

export default TournamentRegistration;

