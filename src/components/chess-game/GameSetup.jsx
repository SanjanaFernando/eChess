import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameSetup = () => {
  const [gameMode, setGameMode] = useState("online");
  const [difficulty, setDifficulty] = useState(1);
  const [timeControl, setTimeControl] = useState("unlimited");
  const [color, setColor] = useState("random");
  const navigate = useNavigate();

  const handleStartGame = () => {
    let selectedColor = color;
    if (color === "random") {
      selectedColor = Math.random() < 0.5 ? "white" : "black"; // Randomly assign white or black
    }
    const gameSettings = {
      gameMode,
      difficulty,
      timeControl,
      color: selectedColor,
    };
    navigate("/chess-game", { state: gameSettings });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🎯 Game Setup
        </h1>

        {/* Game Mode */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Game Mode:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="online"
                checked={gameMode === "online"}
                onChange={() => setGameMode("online")}
                className="hidden"
              />
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  gameMode === "online"
                    ? "bg-blue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Play Online
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="machine"
                checked={gameMode === "machine"}
                onChange={() => setGameMode("machine")}
                className="hidden"
              />
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  gameMode === "machine"
                    ? "bg-blue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Play with AI 🤖
              </span>
            </label>
          </div>
        </div>

        {/* Difficulty Level */}
        {gameMode === "machine" && (
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Difficulty Level:
            </label>
            <input
              type="number"
              min="1"
              max="15"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Time Control */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Time Control:
          </label>
          <select
            value={timeControl}
            onChange={(e) => setTimeControl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="unlimited">Unlimited</option>
            <option value="1min">1 minutes</option>
            <option value="3min">3 minutes</option>
            <option value="5min">5 minutes</option>
            <option value="10min">10 minutes</option>
            <option value="30min">30 minutes</option>
          </select>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Choose Your Color:
          </label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="random">♟️ Random</option>
            <option value="white">⚪ White</option>
            <option value="black">⚫ Black</option>
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          className="w-full bg-blue text-white p-3 rounded-lg font-semibold text-lg hover:bg-black transition duration-200 shadow-md"
        >
          🚀 Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
