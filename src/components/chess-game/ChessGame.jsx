import { Chess } from "chess.js";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ChessGame = () => {
  const location = useLocation();
  const { gameMode, difficulty, timeControl, color } = location.state || {};
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  // Dummy player data
  const players = {
    white: {
      name: "John Doe",
      rating: 1450,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    black: {
      name: "AI Stockfish",
      rating: 2500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Stockfish_Logo.png",
    },
  };

  useEffect(() => {
    if (color === "black" && gameStarted) {
      makeStockfishMove();
    }
  }, [color, gameStarted]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && gameOver) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const newGame = new Chess(g.fen());
      modify(newGame);
      return newGame;
    });
  };

  const makeStockfishMove = async () => {
    if (game.game_over() || game.in_draw()) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    try {
      const response = await axios.get(
        "https://stockfish.online/api/s/v2.php",
        {
          params: {
            fen: game.fen(),
            depth: difficulty,
          },
        }
      );

      if (response.data.success) {
        const bestMove = response.data.bestmove.split(" ")[1];
        safeGameMutate((game) => {
          const move = game.move({
            from: bestMove.slice(0, 2),
            to: bestMove.slice(2, 4),
            promotion: "q",
          });
          if (move) {
            setMoveHistory((prev) => [...prev, move.san]);
          }
        });
      } else {
        console.error(
          "Error fetching move from Stockfish API:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error connecting to Stockfish API:", error);
    }
  };

  const onDrop = (source, target) => {
    if (gameOver || !gameStarted) return false;

    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: source,
      to: target,
      promotion: "q",
    });

    if (!move) return false;
    setGame(newGame);
    setMoveHistory((prev) => [...prev, move.san]);
    setTimeout(makeStockfishMove, 200);
    return true;
  };

  const restartGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setMoveHistory([]);
    setGameStarted(false);
    setModalMessage(null);
  };

  const handlePlayClick = () => {
    setGameStarted(true);
  };

  const handleDrawClick = () => {
    setModalMessage("Opponent says no draw, keep playing!");
  };

  const handleResignClick = () => {
    setGameOver(true);
    setWinner(color === "white" ? "Black" : "White"); // Determine winner based on the assigned color
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Players Info */}
      <div className="flex justify-between w-full max-w-3xl bg-white p-4 rounded-xl mb-4 shadow-lg border border-gray-300">
        {/* White Player */}
        <div className="flex items-center space-x-3">
          <img
            src={players.white.image}
            alt="White Player"
            className="w-12 h-12 rounded-full border-2 border-gray-400"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {players.white.name}
            </h3>
            <p className="text-gray-600">♔ {players.white.rating}</p>
          </div>
        </div>

        <span className="text-gray-500 text-sm">VS</span>

        {/* Black Player */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800">
              {players.black.name}
            </h3>
            <p className="text-gray-600">♚ {players.black.rating}</p>
          </div>
          <img
            src={players.black.image}
            alt="Black Player"
            className="w-12 h-12 rounded-full border-2 border-gray-400"
          />
        </div>
      </div>

      {/* Chessboard + Move History */}
      <div className="flex w-full max-w-5xl space-x-6">
        {/* Chessboard */}
        <div className="flex-1 flex items-center justify-center bg-white p-4 rounded-xl shadow-lg border border-gray-300">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation={color === "black" ? "black" : "white"} // Set board orientation
          />
        </div>

        {/* Move History */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-300 text-gray-800">
          {!gameStarted ? (
            <button
              onClick={handlePlayClick}
              className="w-full bg-blue text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Play
            </button>
          ) : (
            <div className="flex justify-between space-x-2">
              <button
                className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-400 transition"
                onClick={handleDrawClick}
              >
                Draw
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                onClick={handleResignClick}
              >
                Resign
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold text-center mt-4 mb-2">
            📜 Move History
          </h3>
          <div className="h-64 overflow-y-auto border-t border-gray-300 pt-2">
            {moveHistory.length === 0 ? (
              <p className="text-gray-500 text-center">No moves yet</p>
            ) : (
              <table className="w-full text-left text-gray-700">
                <thead>
                  <tr>
                    <th className="px-2 py-1">#</th>
                    <th className="px-2 py-1">Your Move</th>
                    <th className="px-2 py-1">Opponent's Move</th>
                  </tr>
                </thead>
                <tbody>
                  {moveHistory
                    .reduce((rows, move, index) => {
                      if (index % 2 === 0) {
                        rows.push([move]); // Start a new row for each turn
                      } else {
                        rows[rows.length - 1].push(move); // Add opponent's move to the same row
                      }
                      return rows;
                    }, [])
                    .map((turn, index) => (
                      <tr key={index}>
                        <td className="px-2 py-1">{index + 1}</td>
                        <td className="px-2 py-1">{turn[0] || "-"}</td>
                        <td className="px-2 py-1">{turn[1] || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
            <p className="text-lg font-semibold text-gray-800">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Game Over</h1>
            <p className="text-xl font-semibold mb-4 text-gray-800">
              🏆 Winner: {winner}
            </p>
            <p className="text-sm text-gray-600">
              Press <span className="font-bold">Enter</span> to restart
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
