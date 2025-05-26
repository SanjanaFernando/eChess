import { Chess } from "chess.js";
import React, { useEffect, useState, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import GameOverPopup from "./GameOverPopup";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ChessGame = () => {
  const location = useLocation();
  const { gameMode, color } = location.state || {};
  const [game, setGame] = useState(new Chess());
  const [gameStarted, setGameStarted] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("white"); // Track whose turn it is
  const [moveHistory, setMoveHistory] = useState([]); // Store move history as an array of turns
  const socket = useRef(null);
  const [roomId, setRoomId] = useState(null);
  const [drawRequested, setDrawRequested] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // Track the winner
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [gameOverSubMessage, setGameOverSubMessage] = useState("");
  const [gameOverColor, setGameOverColor] = useState("");

  useEffect(() => {
    if (gameMode === "online") {
      // Connect to the Socket.IO server
      socket.current = io("https://echess-server.onrender.com"); // Update to match the server's port

      // Show waiting message
      socket.current.on("waiting-for-opponent", () => {
        setWaitingForOpponent(true);
      });

      // Listen for matchmaking events
      socket.current.on("match-found", ({ roomId, color }) => {
        setRoomId(roomId);
        setGameStarted(true);
        setWaitingForOpponent(false);
        console.log(`Match found! Room ID: ${roomId}, Your color: ${color}`);
      });

      // Listen for opponent's moves
      socket.current.on("opponent-move", (move) => {
        safeGameMutate((game) => {
          game.move(move);
        });

        // Update move history with the opponent's move
        setMoveHistory((prevHistory) => {
          const lastTurn = prevHistory[prevHistory.length - 1];

          if (color === "black") {
            // If opponent is white, add a new turn
            return [...prevHistory, { white: move.san, black: null }];
          } else {
            // If opponent is black, update the last turn
            if (lastTurn && lastTurn.black === null) {
              // Create a new object for the updated turn
              const updatedTurn = { ...lastTurn, black: move.san };
              return [...prevHistory.slice(0, -1), updatedTurn];
            } else {
              // If no last turn exists, create a new one
              return [...prevHistory, { white: null, black: move.san }];
            }
          }
        });

        // Check for checkmate after opponent's move
        setGame((g) => {
          const newGame = new Chess(g.fen());
          newGame.move(move);
          if (newGame.in_checkmate()) {
            const opponentColor = color === "white" ? "Black" : "White";
            setGameOverMessage(`${opponentColor} Won`);
            setGameOverSubMessage("by checkmate");
            setGameOverColor(color === "white" ? "black" : "white");
            setGameOver(true);
          }
          return newGame;
        });

        // Switch turn
        setCurrentTurn((prevTurn) =>
          prevTurn === "white" ? "black" : "white"
        );
      });

      // Listen for draw request from opponent
      socket.current.on("draw-requested", () => {
        if (
          window.confirm("Your opponent has requested a draw. Do you accept?")
        ) {
          socket.current.emit("draw-accepted", { roomId });
          resetGame();
        } else {
          socket.current.emit("draw-rejected", { roomId });
        }
      });

      // Listen for draw acceptance
      socket.current.on("draw-accepted", () => {
        setGameOverMessage("Game Drawn");
        setGameOverSubMessage("by agreement");
        setGameOverColor("draw");
        setGameOver(true);
      });

      // Listen for resign event
      socket.current.on("opponent-resigned", () => {
        // The local player wins, so show their color as the winner
        setGameOverMessage(`${capitalize(color)} Won`);
        setGameOverSubMessage("by resignation");
        setGameOverColor(color);
        setGameOver(true);
      });

      // Cleanup on component unmount
      return () => {
        if (socket.current) socket.current.disconnect();
      };
    }
  }, [gameMode]);

  const safeGameMutate = (modify) => {
    setGame((g) => {
      const newGame = new Chess(g.fen());
      modify(newGame);
      return newGame;
    });
  };

  const resetGame = () => {
    setGame(new Chess());
    setGameStarted(false);
    setWaitingForOpponent(false);
    setCurrentTurn("white");
    setMoveHistory([]);
    setRoomId(null);
    setGameOver(false);
    setWinner(null);
  };

  const onPieceDrop = (source, target) => {
    if (!gameStarted) return false;

    // Prevent moves if it's not the player's turn
    if (currentTurn !== color) {
      console.log("It's not your turn!");
      return false;
    }

    const move = game.move({
      from: source,
      to: target,
      promotion: "q", // Always promote to a queen for simplicity
    });

    // Prevent moves if the player tries to move the opponent's pieces
    if (!move || move.color !== color[0]) {
      console.log("You can only move your own pieces!");
      return false;
    }

    if (move) {
      // Update local game state
      setGame(new Chess(game.fen()));

      // Emit the move to the opponent
      if (gameMode === "online" && socket.current) {
        socket.current.emit("move", { roomId, move });
      }

      // Update move history with the player's move
      setMoveHistory((prevHistory) => {
        const lastTurn = prevHistory[prevHistory.length - 1];

        if (color === "white") {
          // If it's white's move, add a new turn
          return [...prevHistory, { white: move.san, black: null }];
        } else {
          // If it's black's move, update the last turn
          if (lastTurn && lastTurn.black === null) {
            // Create a new object for the updated turn
            const updatedTurn = { ...lastTurn, black: move.san };
            return [...prevHistory.slice(0, -1), updatedTurn];
          } else {
            // If no last turn exists, create a new one
            return [...prevHistory, { white: null, black: move.san }];
          }
        }
      });

      // Check for checkmate
      if (game.in_checkmate()) {
        const winnerColor = capitalize(color);
        setGameOverMessage(`${winnerColor} Won`);
        setGameOverSubMessage("by checkmate");
        setGameOverColor(color);
        setGameOver(true);
        return true;
      }

      // Switch turn
      setCurrentTurn((prevTurn) => (prevTurn === "white" ? "black" : "white"));

      return true;
    }

    return false;
  };

  const handleDrawRequest = () => {
    if (gameMode === "online" && socket.current) {
      socket.current.emit("request-draw", { roomId });
      alert("Draw request sent to your opponent.");
    }
  };

  const handleResign = () => {
    if (window.confirm("Are you sure you want to resign?")) {
      if (gameMode === "online" && socket.current) {
        socket.current.emit("resign", { roomId });
      }
      // The opponent wins, so show their color as the winner
      const opponentColor = color === "white" ? "Black" : "White";
      setGameOverMessage(`${opponentColor} Won`);
      setGameOverSubMessage("by resignation");
      setGameOverColor(color === "white" ? "black" : "white");
      setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {!gameStarted ? (
        <div className="text-center">
          {waitingForOpponent ? (
            <h1 className="text-2xl font-bold mb-4">
              ⏳ Waiting for an opponent...
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mb-4">
              ⏳ Waiting for an opponent...
            </h1>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-6xl bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          {/* Player Details (Top) */}
          <div className="w-full flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/3">
              <h2
                className={`text-lg font-bold ${
                  currentTurn === "white" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                🧑 Player 2 (Opponent)
              </h2>
              <p>⚪ Color: {color}</p>
            </div>
          </div>

          {/* Chessboard and Move History */}
          <div className="flex w-full">
            {/* Chessboard */}
            <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-300">
              <Chessboard
                position={game.fen()}
                onPieceDrop={onPieceDrop}
                boardOrientation={color === "black" ? "black" : "white"}
              />
            </div>

            {/* Move History */}
            <div className="w-1/4 ml-4 bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-lg font-bold mb-2">📜 Move History</h3>
              <ul className="list-none pl-0 h-64 overflow-y-auto">
                {moveHistory.map((turn, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {index + 1}. {turn.white || ""}
                    </span>
                    <span>{turn.black || ""}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="mt-4">
                <button
                  className="w-full bg-green-500 text-white py-2 rounded-lg mb-2 hover:bg-green-600"
                  onClick={handleDrawRequest}
                >
                  🤝 Offer Draw
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  onClick={handleResign}
                >
                  🏳️ Resign
                </button>
              </div>
            </div>
          </div>

          {/* Player Details (Bottom) */}
          <div className="w-full flex justify-center mt-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/3">
              <h2
                className={`text-lg font-bold ${
                  currentTurn === "black" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                🧑 Player 1 (You)
              </h2>
              <p>⚫ Color: {color === "white" ? "black" : "white"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Popup */}
      {gameOver && (
        <GameOverPopup
          message={gameOverMessage}
          subMessage={gameOverSubMessage}
          winnerColor={gameOverColor}
          onRematch={() => {
            setGameOver(false);
            resetGame();
          }}
          onBackToSetup={() => (window.location.href = "/chess-game-setup")}
        />
      )}
    </div>
  );
};

export default ChessGame;
