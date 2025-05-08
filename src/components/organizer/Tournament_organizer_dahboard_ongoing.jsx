import React, { useState } from "react";

const OrganizerDashboardOngoing = () => {
  const [rounds, setRounds] = useState([
    { id: 1, player1: "John Doe", player2: "Jane Smith", started: false },
    { id: 2, player1: "Alice Brown", player2: "Bob Johnson", started: false },
  ]);
  const [nextRoundTime, setNextRoundTime] = useState("");

  const handleStartRound = (id) => {
    setRounds((prevRounds) =>
      prevRounds.map((round) =>
        round.id === id ? { ...round, started: true } : round
      )
    );
  };

  const handleAddRound = () => {
    setRounds((prevRounds) => [
      ...prevRounds,
      { id: prevRounds.length + 1, player1: "", player2: "", started: false },
    ]);
  };

  const handleDeleteRound = (id) => {
    setRounds((prevRounds) => prevRounds.filter((round) => round.id !== id));
  };

  const handleFinishTournament = () => {
    alert("Tournament Finished!");
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
              <a href="/organizer-dashboard" className="text-black hover:underline">
                Tournaments
              </a>
            </li>
            <li>
              <a href="/ppay" className="text-black hover:underline">
                Payments
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-4 sm:mt-0 flex items-center">
          <img src="/User.png" alt="User Icon" className="h-10" />
        </div>
      </header>
      <header className="bg-red-100 p-6 rounded-lg shadow-lg mt-6 text-black text-center">
        <h1 className="text-2xl font-bold">Ongoing Tournament</h1>
      </header>

      {/* Rounds Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Ongoing Rounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rounds.map((round) => (
            <div
              key={round.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <input
                type="text"
                className="block w-full mb-2 p-2 border rounded"
                value={round.player1}
                onChange={(e) => {
                  setRounds((prevRounds) =>
                    prevRounds.map((r) =>
                      r.id === round.id ? { ...r, player1: e.target.value } : r
                    )
                  );
                }}
              />
              <p className="text-center text-lg font-semibold">VS</p>
              <input
                type="text"
                className="block w-full mt-2 p-2 border rounded"
                value={round.player2}
                onChange={(e) => {
                  setRounds((prevRounds) =>
                    prevRounds.map((r) =>
                      r.id === round.id ? { ...r, player2: e.target.value } : r
                    )
                  );
                }}
              />
              <div className="flex justify-between mt-4">
                <button
                  className={`p-2 rounded text-white ${
                    round.started ? "bg-gray-400 cursor-not-allowed" : "bg-blue hover:bg-blue-600"
                  }`}
                  onClick={() => handleStartRound(round.id)}
                  disabled={round.started}
                >
                  {round.started ? "Round Started" : "Start Round"}
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteRound(round.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddRound}
        >
          Add Round
        </button>
      </section>

      {/* Next Round Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Next Round Start Time</h2>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={nextRoundTime}
          onChange={(e) => setNextRoundTime(e.target.value)}
        />
      </section>

      {/* Finish Tournament Button */}
      <section className="mt-6 text-center">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          onClick={handleFinishTournament}
        >
          Finish Tournament
        </button>
      </section>
    </div>
  );
};

export default OrganizerDashboardOngoing;
