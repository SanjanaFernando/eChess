import React, { useState } from 'react';

const TournamentsPage = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tournamentData = {
    Upcoming: [
      { name: '2024 Michigan Upper Peninsula Open', club: 'Utah Chess Association', district: 'Utah', entry: 'Paid' },
      { name: 'Roger Hale Chess Celebration', club: 'Chess Castle of Minnesota', district: 'Minnesota', entry: 'Free' },
    ],
    Ongoing: [
      { name: '74th Oregon Open', club: 'Oregon Chess Federation', district: 'Oregon', entry: 'Paid' },
    ],
    Completed: [
      { name: '2024 Farewell Bobby Fischer', club: 'Utah Chess Association', district: 'Utah', entry: 'Paid' },
    ],
  };

  const TournamentTable = ({ tournaments }) => (
    <div className="bg-white mt-4 p-6 rounded-md shadow-md">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-pink-100">
          <tr>
            <th className="text-left p-4 text-gray-600 font-semibold border-b">Tournament Name</th>
            <th className="text-left p-4 text-gray-600 font-semibold border-b">Club</th>
            <th className="text-left p-4 text-gray-600 font-semibold border-b">District</th>
            <th className="text-left p-4 text-gray-600 font-semibold border-b">Entry Type</th>
            <th className="p-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament, index) => (
            <tr key={index} className="border-t">
              <td className="p-4 text-gray-700">{tournament.name}</td>
              <td className="p-4 text-gray-700">{tournament.club}</td>
              <td className="p-4 text-gray-700">{tournament.district}</td>
              <td className="p-4 text-gray-700">{tournament.entry}</td>
              <td className="p-4 text-blue-500 text-right">
                <button className="flex items-center space-x-1">
                  <span>✏️</span>
                  <span>Edit</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 flex justify-between items-center">
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

      {/* Search and Filters */}
      <div className="bg-pink-100 p-4 rounded-md mt-4">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">Search for Tournaments</h2>
  <div className="flex items-center space-x-4">
    <select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
      <option>District</option>
      <option>North District</option>
      <option>South District</option>
      <option>East District</option>
      <option>West District</option>
    </select>

    <select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
      <option>Club</option>
      <option>Chess Club A</option>
      <option>Chess Club B</option>
      <option>Chess Club C</option>
    </select>

    <select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
      <option>Entry Type</option>
      <option>Free</option>
      <option>Paid</option>
    </select>

    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search"
        className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-full"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        🔍
      </button>
    </div>
  </div>
</div>


      {/* Tabs */}
      <div className="bg-gray-200 p-4  items-centerbg-gray-200 flex space-x-8 mt-6">
        {['Upcoming', 'Ongoing', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-gray-700 font-medium ${activeTab === tab ? 'border-b-2 border-gray-700' : 'text-gray-500'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tournament Table based on Active Tab */}
      {activeTab === 'Upcoming' && <TournamentTable tournaments={tournamentData.Upcoming} />}
      {activeTab === 'Ongoing' && <TournamentTable tournaments={tournamentData.Ongoing} />}
      {activeTab === 'Completed' && <TournamentTable tournaments={tournamentData.Completed} />}
    </div>
  );
};

export default TournamentsPage;