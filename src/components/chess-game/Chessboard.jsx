import React, { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./Chessboard.css";
import LichessWorker from "../../utils/lichessWorker.js?worker";
import { useLocation, useNavigate } from "react-router-dom";
import GameOverPopup from "./GameOverPopup";

const ChessboardComponent = ({ playerSide: setupSide }) => {
  console.log("setupSide (should be 'white' or 'black'):", setupSide);
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [moveSquares, setMoveSquares] = useState({});
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);
  const stockfishWorker = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPlayerTurn(setupSide === "white");
  }, [setupSide]);

  useEffect(() => {
    stockfishWorker.current = new LichessWorker();

    stockfishWorker.current.onmessage = (e) => {
      const { type, move, message } = e.data;

      if (type === "bestmove" && !isPlayerTurn) {
        const game = gameRef.current;
        const moveResult = game.move(`${move.from}${move.to}`);
        setFen(game.fen());
        setMoveHistory((prev) => [...prev, moveResult.san]);
        setMoveSquares({});
        playSound(moveResult.flags.includes("c") ? "capture" : "move");
        if (game.in_check()) playSound("check");

        if (game.game_over()) {
          setTimeout(() => {
            if (game.isCheckmate()) {
              setGameOverMessage("Checkmate! You lost!");
              playSound("checkmate");
            } else if (game.isDraw()) {
              setGameOverMessage("Game drawn!");
              playSound("draw");
            } else {
              setGameOverMessage("Game over!");
            }
            setGameStarted(false);
          }, 300);
        } else {
          setIsPlayerTurn(true);
        }
      } else if (type === "error") {
        console.error("Lichess Worker Error:", message);
      }
    };

    return () => {
      stockfishWorker.current.terminate();
    };
  }, [isPlayerTurn]);

  // Sounds
  const moveSound = new Audio("/sounds/Move.mp3");
  const captureSound = new Audio("/sounds/Capture.mp3");
  const checkSound = new Audio("/sounds/Check.mp3");
  const checkmateSound = new Audio("/sounds/Checkmate.mp3");
  const drawSound = new Audio("/sounds/Draw.mp3");
  const defeatSound = new Audio("/sounds/Defeat.mp3");
  const errorSound = new Audio("/sounds/Error.mp3");

  const playSound = (type) => {
    switch (type) {
      case "move":
        moveSound.play();
        break;
      case "capture":
        captureSound.play();
        break;
      case "check":
        checkSound.play();
        break;
      case "checkmate":
        checkmateSound.play();
        break;
      case "draw":
        drawSound.play();
        break;
      case "defeat":
        defeatSound.play();
        break;
      case "error":
        errorSound.play();
        break;
      default:
        break;
    }
  };

  const startGame = () => {
    if (!setupSide) {
      alert("Please select a side before starting!");
      playSound("error");
      return;
    }
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setMoveHistory([]);
    setGameStarted(true);
    setGameOverMessage("");
    setMoveSquares({});
    setIsPlayerTurn(setupSide === "white");
  };

  const resetGame = () => {
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setMoveHistory([]);
    setGameStarted(false);
    setGameOverMessage("");
    setMoveSquares({});
    setIsPlayerTurn(true); // Reset to player's turn
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (!gameStarted) {
      playSound("error"); // Play error sound if the game hasn't started
      return false;
    }

    if (!isPlayerTurn) {
      playSound("error"); // Play error sound if it's not the player's turn
      return false;
    }

    const game = gameRef.current;
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to queen
    });

    if (move === null) {
      playSound("error"); // Play error sound if the move is illegal
      return false;
    }

    setFen(game.fen());
    setMoveHistory((prev) => [...prev, move.san]);
    setMoveSquares({});

    playSound(move.flags.includes("c") ? "capture" : "move");
    if (game.in_check()) playSound("check");

    if (game.game_over()) {
      setTimeout(() => {
        if (game.isCheckmate()) {
          setGameOverMessage("Checkmate! You won!");
          playSound("checkmate");
        } else if (game.in_draw()) {
          setGameOverMessage("Game drawn!");
          playSound("draw");
        } else {
          setGameOverMessage("Game over!");
        }
        setGameStarted(false); // Don't reset instantly
      }, 300);
    } else {
      setIsPlayerTurn(false); // Switch to opponent's turn (Lichess)
    }

    return true;
  };

  const handleResign = () => {
    const confirmResign = window.confirm("Are you sure you want to resign?");
    if (confirmResign) {
      setGameOverMessage("You resigned.");
      playSound("defeat");
      setGameStarted(false);
    }
  };

  // Offer draw: randomly accept or refuse
  const handleDraw = () => {
    const confirmDraw = window.confirm("Do you want to offer a draw?");
    if (confirmDraw) {
      // 50% chance to accept the draw
      if (Math.random() < 0.5) {
        setGameOverMessage("Game drawn by agreement.");
        playSound("draw");
        setGameStarted(false);
      } else {
        alert("Draw offer refused by opponent.");
      }
    }
  };

  // Undo: undo last move(s) and set turn to player
  const handleUndo = () => {
    const game = gameRef.current;
    if (moveHistory.length === 0) return;

    // Undo last move (AI or player)
    game.undo();
    let newHistory = [...moveHistory];
    newHistory.pop();

    // If it's not player's turn, undo one more (undo both AI and player moves)
    if (!isPlayerTurn && moveHistory.length > 1) {
      game.undo();
      newHistory.pop();
    }

    setMoveHistory(newHistory);
    setFen(game.fen());
    setGameOverMessage("");
    setGameStarted(true);
    setIsPlayerTurn(true); // Always give turn back to player after undo
  };

  // Move history rows
  const moveRows = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    moveRows.push({
      moveNumber: i / 2 + 1,
      white: moveHistory[i],
      black: moveHistory[i + 1] || "",
    });
  }

  const onPieceClick = (square) => {
    const game = gameRef.current;
    const moves = game.moves({ square, verbose: true });
    const squaresToHighlight = {};
    moves.forEach((move) => {
      squaresToHighlight[move.to] = {
        background: "radial-gradient(circle, #ff0 20%, transparent 20%)",
        borderRadius: "50%",
      };
    });
    setMoveSquares(squaresToHighlight);
  };

  useEffect(() => {
    stockfishWorker.current = new LichessWorker();

    stockfishWorker.current.onmessage = (e) => {
      const { type, move, message } = e.data;

      if (type === "bestmove" && !isPlayerTurn) {
        const game = gameRef.current;

        // Apply the move returned by the Lichess API
        const moveResult = game.move({
          from: move.from,
          to: move.to,
          promotion: "q", // Always promote to queen
        });

        if (moveResult) {
          setFen(game.fen());
          setMoveHistory((prev) => [...prev, moveResult.san]);
          setMoveSquares({});
          playSound(moveResult.flags.includes("c") ? "capture" : "move");
          if (game.in_check()) playSound("check");

          if (game.game_over()) {
            setTimeout(() => {
              if (game.isCheckmate()) {
                setGameOverMessage("Checkmate! You lost!");
                playSound("checkmate");
              } else if (game.isDraw()) {
                setGameOverMessage("Game drawn!");
                playSound("draw");
              } else {
                setGameOverMessage("Game over!");
              }
              setGameStarted(false);
            }, 300);
          } else {
            setIsPlayerTurn(true);
          }
        } else {
          console.error("Invalid move received from Lichess API:", move);
        }
      } else if (type === "error") {
        console.error("Lichess Worker Error:", message);
        alert(`Error: ${message}`); // Notify the user of the error
      }
    };

    return () => {
      stockfishWorker.current.terminate();
    };
  }, [isPlayerTurn]);

  useEffect(() => {
    if (isPlayerTurn || !gameStarted || !stockfishWorker.current) return;

    // Send the current board position to Lichess
    stockfishWorker.current.postMessage({
      type: "position",
      data: { fen: gameRef.current.fen() },
    });
  }, [isPlayerTurn, gameStarted]);

  // Helper to get popup content
  const getGameOverPopup = () => {
    if (!gameOverMessage) return null;

    let message = "";
    let subMessage = "";
    let winnerColor = "";

    if (gameOverMessage.includes("Checkmate")) {
      if (
        gameOverMessage.includes("won") ||
        gameOverMessage.includes("You won")
      ) {
        message = `${
          setupSide.charAt(0).toUpperCase() + setupSide.slice(1)
        } Won`;
        subMessage = "by checkmate";
        winnerColor = setupSide;
      } else {
        const aiColor = setupSide === "white" ? "Black" : "White";
        message = `${aiColor} Won`;
        subMessage = "by checkmate";
        winnerColor = setupSide === "white" ? "black" : "white";
      }
    } else if (gameOverMessage.includes("drawn")) {
      message = "Game Drawn";
      subMessage = "by agreement";
      winnerColor = "draw";
    } else if (gameOverMessage.includes("resigned")) {
      message = `${
        setupSide.charAt(0).toUpperCase() + setupSide.slice(1)
      } Lost`;
      subMessage = "by resignation";
      winnerColor = setupSide;
    } else if (gameOverMessage.includes("lost")) {
      const aiColor = setupSide === "white" ? "Black" : "White";
      message = `${aiColor} Won`;
      subMessage = "by checkmate";
      winnerColor = setupSide === "white" ? "black" : "white";
    } else {
      message = "Game Over";
      subMessage = "";
      winnerColor = "draw";
    }

    return (
      <GameOverPopup
        message={message}
        subMessage={subMessage}
        winnerColor={winnerColor}
        onRematch={startGame}
        onBackToSetup={() => navigate("/chess-game-setup")}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="flex flex-col items-center w-full max-w-6xl bg-white p-4 rounded-lg shadow-lg border border-gray-300">
        {/* Player Details (Top) */}
        <div className="w-full flex justify-center mb-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/3">
            <h2
              className={`text-lg font-bold ${
                isPlayerTurn ? "text-gray-700" : "text-blue-500"
              }`}
            >
              🧑 AI Opponent
            </h2>
            <p>{setupSide === "white" ? "⚫ Black" : "⚪ White"}</p>
          </div>
        </div>

        {/* Chessboard and Move History */}
        <div className="flex w-full">
          {/* Chessboard */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg border border-gray-300">
            <Chessboard
              position={fen}
              onPieceDrop={onDrop}
              onSquareClick={onPieceClick}
              boardWidth={500}
              arePiecesDraggable={gameStarted}
              boardOrientation={setupSide}
              customSquareStyles={moveSquares}
            />
          </div>

          {/* Move History & Controls */}
          <div className="w-1/4 ml-4 bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-2">📜 Move History</h3>
            <ul className="list-none pl-0 h-64 overflow-y-auto">
              {moveRows.map((row, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {row.moveNumber}. {row.white || ""}
                  </span>
                  <span>{row.black || ""}</span>
                </li>
              ))}
            </ul>
            {/* Buttons */}
            <div className="mt-4">
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg mb-2 hover:bg-green-600"
                onClick={handleDraw}
                disabled={!gameStarted}
              >
                🤝 Offer Draw
              </button>
              <button
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                onClick={handleResign}
                disabled={!gameStarted}
              >
                🏳️ Resign
              </button>
              <button
                className="w-full bg-gray-400 text-white py-2 rounded-lg mt-2 hover:bg-gray-500"
                onClick={handleUndo}
                disabled={!gameStarted || moveHistory.length === 0}
              >
                ⬅️ Undo
              </button>
            </div>
          </div>
        </div>

        {/* Player Details (Bottom) */}
        <div className="w-full flex justify-center mt-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/3">
            <h2
              className={`text-lg font-bold ${
                isPlayerTurn ? "text-blue-500" : "text-gray-700"
              }`}
            >
              🧑 You
            </h2>
            <p>{setupSide === "white" ? "⚪ White" : "⚫ Black"}</p>
          </div>
        </div>
      </div>
      {getGameOverPopup()}
    </div>
  );
};

const ChessboardPage = () => {
  const location = useLocation();
  const { color } = location.state || {};
  return <ChessboardComponent playerSide={color} />;
};

export default ChessboardPage;
