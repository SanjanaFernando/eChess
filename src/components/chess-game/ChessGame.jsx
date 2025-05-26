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
  const [currentTurn, setCurrentTurn] = useState("white");
  const [moveHistory, setMoveHistory] = useState([]);
  const socket = useRef(null);
  const [roomId, setRoomId] = useState(null);
  const [drawRequested, setDrawRequested] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [gameOverSubMessage, setGameOverSubMessage] = useState("");
  const [gameOverColor, setGameOverColor] = useState("");

  // Sounds
  const moveSelfSound = new Audio("/sounds/move-self.mp3");
  const moveOpponentSound = new Audio("/sounds/move-opponent.mp3");
  const captureSound = new Audio("/sounds/capture.mp3");
  const castleSound = new Audio("/sounds/castle.mp3");
  const drawOfferSound = new Audio("/sounds/drawoffer.mp3");
  const gameDrawSound = new Audio("/sounds/game-draw.mp3");
  const gameEndSound = new Audio("/sounds/game-end.mp3");
  const gameLoseSound = new Audio("/sounds/game-lose.mp3");
  const gameWinSound = new Audio("/sounds/game-win.mp3");
  const illegalSound = new Audio("/sounds/illegal.mp3");
  const checkSound = new Audio("/sounds/move-check.mp3");
  const notificationSound = new Audio("/sounds/notification.mp3");
  const promoteSound = new Audio("/sounds/promote.mp3");
  const gameStartSound = new Audio("/sounds/game-start.mp3");

  const playSound = (type) => {
    switch (type) {
      case "move":
        moveSelfSound.play();
        break;
      case "opponent-move":
        moveOpponentSound.play();
        break;
      case "capture":
        captureSound.play();
        break;
      case "castle":
        castleSound.play();
        break;
      case "draw-offer":
        drawOfferSound.play();
        break;
      case "draw":
        gameDrawSound.play();
        break;
      case "checkmate":
        gameEndSound.play();
        break;
      case "win":
        gameWinSound.play();
        break;
      case "lose":
      case "defeat":
        gameLoseSound.play();
        break;
      case "illegal":
      case "error":
        illegalSound.play();
        break;
      case "check":
        checkSound.play();
        break;
      case "notification":
        notificationSound.play();
        break;
      case "promote":
        promoteSound.play();
        break;
      case "start":
        gameStartSound.play();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameMode === "online") {
      socket.current = io("http://localhost:8000");

      socket.current.on("waiting-for-opponent", () => {
        setWaitingForOpponent(true);
      });

      socket.current.on("match-found", ({ roomId, color }) => {
        setRoomId(roomId);
        setGameStarted(true);
        setWaitingForOpponent(false);
        playSound("start");
        console.log(`Match found! Room ID: ${roomId}, Your color: ${color}`);
      });

      socket.current.on("opponent-move", (move) => {
        safeGameMutate((game) => {
          game.move(move);
        });

        // Play opponent move sound
        playSound("opponent-move");

        // Play capture/castle/promote/check if applicable
        if (move.flags && move.flags.includes("c")) playSound("capture");
        if (
          move.flags &&
          (move.flags.includes("k") || move.flags.includes("q"))
        )
          playSound("castle");
        if (move.flags && move.flags.includes("p")) playSound("promote");

        // Check for check
        const tempGame = new Chess(game.fen());
        tempGame.move(move);
        if (tempGame.in_check()) playSound("check");

        // Update move history with the opponent's move
        setMoveHistory((prevHistory) => {
          const lastTurn = prevHistory[prevHistory.length - 1];
          if (color === "black") {
            return [...prevHistory, { white: move.san, black: null }];
          } else {
            if (lastTurn && lastTurn.black === null) {
              const updatedTurn = { ...lastTurn, black: move.san };
              return [...prevHistory.slice(0, -1), updatedTurn];
            } else {
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
            playSound("checkmate");
            playSound("lose");
          }
          return newGame;
        });

        setCurrentTurn((prevTurn) =>
          prevTurn === "white" ? "black" : "white"
        );
      });

      socket.current.on("draw-requested", () => {
        playSound("draw-offer");
        if (
          window.confirm("Your opponent has requested a draw. Do you accept?")
        ) {
          socket.current.emit("draw-accepted", { roomId });
          setGameOverMessage("Game Drawn");
          setGameOverSubMessage("by agreement");
          setGameOverColor("draw");
          setGameOver(true);
          playSound("draw");
        } else {
          socket.current.emit("draw-rejected", { roomId });
        }
      });

      socket.current.on("draw-accepted", () => {
        setGameOverMessage("Game Drawn");
        setGameOverSubMessage("by agreement");
        setGameOverColor("draw");
        setGameOver(true);
        playSound("draw");
      });

      socket.current.on("opponent-resigned", () => {
        setGameOverMessage(`${capitalize(color)} Won`);
        setGameOverSubMessage("by resignation");
        setGameOverColor(color);
        setGameOver(true);
        playSound("checkmate");
        playSound("win");
      });

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
    if (!gameStarted) {
      playSound("illegal"); // changed from "notification" to "illegal"
      return false;
    }

    if (currentTurn !== color) {
      playSound("illegal"); // changed from "notification" to "illegal"
      return false;
    }

    const move = game.move({
      from: source,
      to: target,
      promotion: "q",
    });

    if (!move || move.color !== color[0]) {
      playSound("illegal");
      return false;
    }

    if (move) {
      setGame(new Chess(game.fen()));

      if (gameMode === "online" && socket.current) {
        socket.current.emit("move", { roomId, move });
      }

      setMoveHistory((prevHistory) => {
        const lastTurn = prevHistory[prevHistory.length - 1];
        if (color === "white") {
          return [...prevHistory, { white: move.san, black: null }];
        } else {
          if (lastTurn && lastTurn.black === null) {
            const updatedTurn = { ...lastTurn, black: move.san };
            return [...prevHistory.slice(0, -1), updatedTurn];
          } else {
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
        playSound("checkmate");
        playSound("win");
        return true;
      }

      playSound("move");

      if (move.flags && move.flags.includes("c")) playSound("capture");
      if (move.flags && (move.flags.includes("k") || move.flags.includes("q")))
        playSound("castle");
      if (move.flags && move.flags.includes("p")) playSound("promote");

      const tempGame = new Chess(game.fen());
      tempGame.move(move);
      if (tempGame.in_check()) playSound("check");

      setCurrentTurn((prevTurn) => (prevTurn === "white" ? "black" : "white"));

      return true;
    }

    return false;
  };

  const handleDrawRequest = () => {
    if (gameMode === "online" && socket.current) {
      socket.current.emit("request-draw", { roomId });
      playSound("draw-offer");
      alert("Draw request sent to your opponent.");
    }
  };

  const handleResign = () => {
    if (window.confirm("Are you sure you want to resign?")) {
      if (gameMode === "online" && socket.current) {
        socket.current.emit("resign", { roomId });
      }
      const opponentColor = color === "white" ? "Black" : "White";
      setGameOverMessage(`${opponentColor} Won`);
      setGameOverSubMessage("by resignation");
      setGameOverColor(color === "white" ? "black" : "white");
      setGameOver(true);
      playSound("checkmate");
      playSound("lose");
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
