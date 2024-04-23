import React, { useState, useEffect } from "react";
import "./Game2.css";
import { Link } from "react-router-dom";

const CountingObjectsGame = () => {
  const [targetCount, setTargetCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const generateRandomCount = () => {
    return Math.floor(Math.random() * 20) + 1; // Generates a random count between 1 and 20
  };

  const handleCountSelection = (count) => {
    setSelectedCount(count);

    if (count === targetCount) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextRound = () => {
    setTargetCount(generateRandomCount());
    setSelectedCount("");
    setIsCorrect(null);
  };

  useEffect(() => {
    handleNextRound();
  }, []); // Initial setup

  return (
    <div className="nn">
    <div className="game-container">
      <h1 className="COG">Counting Objects Game</h1>
      <p className="col"><b>Benefits:</b> Counting objects game fosters numerical fluency, enhances attention to detail, improves counting skills, promotes cognitive development, and encourages problem-solving abilities, making it an effective tool for early math learning and development.</p>
      <p className="COUNT2">Select the correct count:</p>

      <div className="object-display">
        {[...Array(targetCount)].map((_, index) => (
          <div key={index} className="object" style={{ "--i": index }}></div>
        ))}
      </div>

      <div className="count-options">
        {[...Array(20).keys()].map((count) => (
          <div
            key={count + 1}
            className={`count ${selectedCount === count + 1 ? "selected" : ""}`}
            onClick={() => handleCountSelection(count + 1)}
          >
            {count + 1}
          </div>
        ))}
      </div>

      {isCorrect !== null && (
        <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}

      <div className="action-button" onClick={handleNextRound}>
        Next
      </div>
      <Link to="/play-game" className="back-to-home1">
        Return
      </Link>
    </div>
    </div>
  );
};

export default CountingObjectsGame;
