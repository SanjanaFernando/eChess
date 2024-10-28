import React from 'react';

const CreateTournament = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="flex items-center">
            <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
          </div>
        </h1>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-800 font-medium">Create</a>
          <a href="#" className="text-gray-800 font-medium">Tournaments</a>
          <a href="#" className="text-gray-800 font-medium">Payments</a>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center">
          <img src="/User.png" alt="User Icon" className="h-10 mr-4" />
        </div>
      </nav>

      {/* Form Section */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Create a new Tournament</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="tournamentName">Tournament Name</label>
              <input
                type="text"
                id="tournamentName"
                placeholder="Tournament Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="tournamentDescription">Tournament Description</label>
              <textarea
                id="tournamentDescription"
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">Start Date</label>
                <input
                  type="text"
                  id="startDate"
                  placeholder="DD/MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="endDate">End Date</label>
                <input
                  type="text"
                  id="endDate"
                  placeholder="DD/MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="startTime">Start Time</label>
                <input
                  type="text"
                  id="startTime"
                  placeholder="00 : 00 : 00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="endTime">End Time</label>
                <input
                  type="text"
                  id="endTime"
                  placeholder="00 : 00 : 00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="timeControl">Time Control</label>
                <select
                  id="timeControl"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option>10 min</option>
                  <option>15 min</option>
                  <option>30 min</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="rounds">Rounds</label>
                <select
                  id="rounds"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option>00</option>
                  <option>05</option>
                  <option>10</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="gameType">Game Type</label>
              <select
                id="gameType"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option>Variant</option>
                <option>Standard</option>
                <option>Blitz</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <p className="text-sm text-gray-500">
              By submitting this form, you confirm that the tournament details provided are accurate and comply with the Terms and Conditions of ECHESS.com. As the organizer, you agree to adhere to ECHESS.com's guidelines for tournament management, ensuring a fair and secure experience for all participants.
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-800 transition duration-300"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
