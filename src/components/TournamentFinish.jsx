import React, { useEffect, useState } from "react";

const TournamentFinished = () => {
  // **Prototype Tournament Data (Static)**
  const tournament = {
    name: "National Chess Championship 2025",
    location: "Grand Hotel Conference Hall, New York",
    startDate: "2025-04-15",
    endDate: "2025-04-20",
    finishedDate: "2025-04-20",
  };

  // **Animation for Header**
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      {/* Tournament Finished Section */}
      <div
        className={`bg-gray-800 text-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-1000 ${
          fadeIn ? "opacity-100 scale-105" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex flex-col items-center">
          <img src="/trophy.png" alt="Tournament Finished Icon" className="h-32 mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold animate-pulse">🏆 Tournament Finished 🏆</h1>
        </div>
      </div>

      {/* Tournament Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Tournament Details</h2>
        <ul className="space-y-2 text-lg">
          <li><strong>Name:</strong> {tournament.name}</li>
          <li><strong>Venue:</strong> {tournament.location}</li>
          <li><strong>Date:</strong> {tournament.startDate} - {tournament.endDate}</li>
          <li><strong>Finished Date:</strong> {tournament.finishedDate}</li>
        </ul>
      </section>
    </div>
  );
};

export default TournamentFinished;
