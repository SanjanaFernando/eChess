import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPlayerTournamentRegistrations } from "../state/player-api";
import { tokenDecode } from "../utils/token";

const PlayerExpensePage = () => {
  const token = localStorage.getItem("token");
  const decodedToken = tokenDecode(token);
  const userId = decodedToken.id;

  const location = useLocation();
  const isPlayerPaymentTab = location.pathname === "/ppay";

  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentRegistrations = async () => {
      try {
        const res = await getPlayerTournamentRegistrations(userId);
        setRegisteredTournaments(res);
      } catch (err) {
        console.error("Error fetching player tournament registrations: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentRegistrations();
  }, [userId]);

  const totalExpenses = registeredTournaments.reduce(
    (total, tournament) => total + tournament.fee,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-200 p-4 flex justify-between items-center shadow mb-8">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
        </h1>
        <div className="flex space-x-8">
          <a href="/chessgame" className="text-gray-800 font-medium">
            Play
          </a>
          <a href="/player-dashboard" className="text-gray-800 font-medium">
            Tournaments
          </a>
          <a
            href="#"
            className={`text-gray-800 font-medium ${
              isPlayerPaymentTab ? "font-extrabold" : ""
            }`}
          >
            Payments
          </a>
        </div>
        <div className="relative">
          <img src="/User.png" alt="User Icon" className="h-10" />
        </div>
      </nav>

      {/* Expense Tracking Section */}
      <div className="bg-white p-6 rounded-md shadow mx-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Registered Tournament Expenses
        </h2>
        <div className="space-y-4">
          {registeredTournaments.map((tournament, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{tournament.name}</p>
              </div>
              <div>
                <p
                  className={`text-white text-sm px-2 py-1 rounded-md ${
                    tournament.paymentStatus === "PENDING"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {tournament.paymentStatus}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Fee: Rs.{tournament.fee}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Expenses: Rs.{totalExpenses}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PlayerExpensePage;
