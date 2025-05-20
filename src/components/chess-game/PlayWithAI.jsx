import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import axios from "axios";
import { Chess } from "chess.js";

const PlayWithAI = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const lichessApiToken = import.meta.env.VITE_LICHESS_API_TOKEN;

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const newGame = new Chess(g.fen());
      modify(newGame);
      return newGame;
    });
  };

  const makeAIMove = async () => {
    if (game.game_over() || game.in_draw()) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    try {
      const response = await axios.get("https://lichess.org/api/cloud-eval", {
        params: {
          fen: game.fen(),
          multiPv: 1,
        },
        headers: {
          Authorization: `Bearer ${lichessApiToken}`,
        },
      });

      console.log("Lichess API Response:", response.data); // Log the response

      // Safely access the first move from the `pvs` array
      const bestMoveString = response.data?.pvs?.[0]?.moves;
      if (!bestMoveString) {
        console.error("No valid move found in the API response.");
        return;
      }

      // Split the moves string into an array and get the first move
      const bestMove = bestMoveString.split(" ")[0];
      if (!bestMove) {
        console.error("No valid move found after splitting the moves string.");
        return;
      }

      // Apply the move to the game
      safeGameMutate((game) => {
        const move = game.move(bestMove);
        if (move) {
          setMoveHistory((prev) => [...prev, move.san]);
        }
      });
    } catch (error) {
      console.error("Error fetching move from Lichess API:", error);
    }
  };

  const onDrop = (source, target) => {
    if (gameOver) return false;

    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: source,
      to: target,
      promotion: "q",
    });

    if (!move) return false;
    setGame(newGame);
    setMoveHistory((prev) => [...prev, move.san]);
    setTimeout(makeAIMove, 200);
    return true;
  };

  const restartGame = () => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setMoveHistory([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex-1 flex items-center justify-center bg-white p-4 rounded-xl shadow-lg border border-gray-300">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>

      <div className="w-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-300 text-gray-800">
        <h3 className="text-lg font-semibold text-center mb-2">
          📜 Move History
        </h3>
        <div className="h-64 overflow-y-auto border-t border-gray-300 pt-2">
          {moveHistory.length === 0 ? (
            <p className="text-gray-500 text-center">No moves yet</p>
          ) : (
            <ol className="list-decimal pl-5 space-y-1">
              {moveHistory.map((move, index) => (
                <li key={index} className="text-gray-700">
                  {move}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center text-gray-900">
          <h1 className="text-3xl font-bold mb-2">Game Over</h1>
          <p className="text-xl font-semibold mb-4">🏆 Winner: {winner}</p>
          <p className="text-sm">Press Enter to restart</p>
        </div>
      )}
    </div>
  );
};

export default PlayWithAI;
