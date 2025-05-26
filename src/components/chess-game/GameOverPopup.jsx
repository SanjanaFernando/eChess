// Add this above ChessboardComponent or in a separate file and import it
import React from "react";
import "./GameOverPopup.css"; // Create this CSS file for animations

const GameOverPopup = ({
  message,
  subMessage,
  onRematch,
  onBackToSetup,
  winnerColor,
}) => (
  <div className="gameover-popup-overlay">
    <div className="gameover-popup animate-popup">
      <h2 className={`popup-title ${winnerColor}`}>{message}</h2>
      {subMessage && <p className="popup-sub">{subMessage}</p>}
      <div className="popup-buttons">
        <button className="popup-btn rematch" onClick={onRematch}>
          🔄 Rematch
        </button>
        <button className="popup-btn back" onClick={onBackToSetup}>
          🏁 Back to Setup
        </button>
      </div>
    </div>
  </div>
);

export default GameOverPopup;
