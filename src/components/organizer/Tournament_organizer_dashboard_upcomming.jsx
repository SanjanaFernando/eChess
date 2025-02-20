import React, { useState } from "react";
import { useParams } from "react-router-dom";

const OrganizerTournamentDashboardUp = () => {
  const { id: tournamentId } = useParams();

  // Editable tournament details
  const [tournament, setTournament] = useState({
    name: "National Chess Championship 2025",
    location: "Grand Hotel Conference Hall, New York",
    startDate: "2025-04-15",
    endDate: "2025-04-20",
    registeredPlayers: 120,
    paymentLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournament({ ...tournament, [name]: value });
  };

  const handleStartTournament = () => {
    alert("Tournament Started!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
      {/* Header Section */}
      <header className="bg-red-100 p-6 rounded-lg shadow-lg mt-6 text-black text-center">
        <h1 className="text-xl font-bold">Organizer Dashboard</h1>
      </header>

      {/* Tournament Details (Editable) */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
        <div className="space-y-2">
          <label className="block">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={tournament.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block">
            <strong>Venue:</strong>
            <input
              type="text"
              name="location"
              value={tournament.location}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="block">
            <strong>Date:</strong>
            <input
              type="text"
              name="startDate"
              value={tournament.startDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
            -
            <input
              type="text"
              name="endDate"
              value={tournament.endDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>
      </section>

      {/* Registration & Payment Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Player Registrations</h2>
        <p><strong>Registered Players:</strong> {tournament.registeredPlayers}</p>
        <label className="block mt-4">
          <strong>Payment Link:</strong>
          <input
            type="text"
            name="paymentLink"
            value={tournament.paymentLink}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter payment link here"
          />
        </label>
      </section>

      {/* Start Tournament Button */}
      <section className="mt-6 text-center">
        <button
          onClick={handleStartTournament}
          className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Tournament
        </button>
      </section>
    </div>
  );
};

export default OrganizerTournamentDashboardUp;
