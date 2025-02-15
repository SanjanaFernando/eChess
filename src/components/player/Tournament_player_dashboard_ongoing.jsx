import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tokenDecode } from "../../utils/token";

const TournamentDashboardOn = () => {
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

  // **Ongoing Round Data (Mock Data)**
  const ongoingRound = {
    roundNumber: 3,
    players: [
      { player1: "Magnus Carlsen", player2: "Hikaru Nakamura" },
      { player1: "Ian Nepomniachtchi", player2: "Fabiano Caruana" },
    ],
  };

  // **Next Round Data (Mock Data)**
  const nextRound = {
    players: [
      { player1: "Ding Liren", player2: "Levon Aronian" },
      { player1: "Alireza Firouzja", player2: "Wesley So" },
    ],
    startTime: "16:00 UTC",
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

      {/* Tournament Name */}
      <header className="bg-red-100 p-6 rounded-lg shadow-lg mt-6 text-black text-center">
        <h1 className="text-2xl font-bold">{tournament.name}</h1>
      </header>

      {/* Tournament Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
        <ul className="space-y-2">
          <li><strong>Venue:</strong> {tournament.location}</li>
          <li><strong>Date:</strong> {tournament.startDate} - {tournament.endDate}</li>
          <li><strong>Registered Players:</strong> {tournament.registeredPlayers}</li>
        </ul>
      </section>

      {/* Ongoing Round Section */}
      <section className="bg-blue-100 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Ongoing Round</h2>
        <p className="text-lg font-semibold">Round {ongoingRound.roundNumber}</p>
        <ul className="list-disc list-inside mt-2">
          {ongoingRound.players.map((match, index) => (
            <li key={index} className="text-gray-700">
              <strong>{match.player1}</strong> vs <strong>{match.player2}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Next Round Section */}
      <section className="bg-green-100 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Next Round</h2>
        <p className="text-lg font-semibold">Start Time: {nextRound.startTime}</p>
        <ul className="list-disc list-inside mt-2">
          {nextRound.players.map((match, index) => (
            <li key={index} className="text-gray-700">
              <strong>{match.player1}</strong> vs <strong>{match.player2}</strong>
            </li>
          ))}
        </ul>
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
            <a href={`/register/${tournamentId}`} className="text-blue-500 underline">
              Register Now
            </a>
          </p>
        )}
      </section>
    </div>
  );
};

export default TournamentDashboardOn;
