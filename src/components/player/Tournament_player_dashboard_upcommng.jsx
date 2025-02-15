import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tokenDecode } from "../../utils/token";

const TournamentDashboardUp = () => {
  const { id: tournamentId } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = tokenDecode(token);
  const userId = decodedToken?.id;

  // **Prototype Tournament Data (Static)**
  const tournament = {
    name: "National Chess Championship 2025",
    location: "Grand Hotel Conference Hall, New York",
    startDate: "2025-04-15",
    endDate: "2025-04-20",
    registeredPlayers: 120,
    news: [
      "Round 1 will start at 10 AM sharp.",
      "Please bring your FIDE ID cards for verification.",
      "Prize pool increased to $50,000!",
    ],
  };

  // **Static Registration Status for UI Preview**
  const [registered] = useState(false); // Change this to `true` to test the registered state

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
      <header className="bg-red-100 p-6 rounded-lg shadow-lg mt-6 text-black p-4 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold">{tournament.name}</h1>
      </header>

      {/* Tournament Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
        <ul className="space-y-2">
          <li>
            <strong>Venue:</strong> {tournament.location}
          </li>
          <li>
            <strong>Date:</strong> {tournament.startDate} - {tournament.endDate}
          </li>
          <li>
            <strong>Registered Players:</strong> {tournament.registeredPlayers}
          </li>
        </ul>
      </section>

      {/* Tournament News & Announcements */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Tournament News</h2>
        {tournament.news.length > 0 ? (
          <ul className="list-disc list-inside">
            {tournament.news.map((announcement, index) => (
              <li key={index} className="text-gray-700">
                {announcement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No announcements available.</p>
        )}
      </section>

      {/* User Registration Status */}
      <section className="mt-6">
        {registered ? (
          <p className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            ✅ You are registered for this tournament!
          </p>
        ) : (
          <p className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            ❌ You are not registered.{" "}
            <a
              href={`/register/${tournamentId}`}
              className="text-blue-500 underline"
            >
              Register Now
            </a>
          </p>
        )}
      </section>
    </div>
  );
};

export default TournamentDashboardUp;
