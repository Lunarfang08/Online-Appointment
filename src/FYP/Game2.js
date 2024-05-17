import React, { useState, useEffect } from "react";
import "./Game2.css";
import { Link } from "react-router-dom";

const CountingObjectsGame = () => {
  const [targetCount, setTargetCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [previousScores, setPreviousScores] = useState([]);
  const [userComment, setUserComment] = useState("");

  const generateRandomCount = () => {
    return Math.floor(Math.random() * 20) + 1; // Generates a random count between 1 and 20
  };

  const handleCountSelection = (count) => {
    setSelectedCount(count);

    if (count === targetCount) {
      setIsCorrect(true);
      setSessionScore(sessionScore + 1); // Increment session score for correct answer
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

  useEffect(() => {
    const storedScores = sessionStorage.getItem('countingObjectsGameScores');
    if (storedScores) {
      setPreviousScores(JSON.parse(storedScores));
    }
  }, []);

  const saveScore = () => {
    const newScore = { score: sessionScore, date: new Date().toLocaleString() };
    const storedScores = JSON.parse(sessionStorage.getItem('countingObjectsGameScores')) || [];
    const updatedScores = [...storedScores, newScore];
    sessionStorage.setItem('countingObjectsGameScores', JSON.stringify(updatedScores));

    if (sessionScore === 1) {
      setUserComment('Well done! You correctly counted the objects.');
    } else {
      setUserComment(`Well done! You correctly counted ${sessionScore} objects.`);
    }

    // Reset session score for the next session
    setSessionScore(0);
  };

  useEffect(() => {
    if (isCorrect !== null) {
      saveScore();
    }
  }, [isCorrect]);

  const handleNextSlide = () => {
    // Move slider to the left
    const slider = document.querySelector(".previous-scores ul");
    slider.scrollLeft += 100;
  };

  const handlePrevSlide = () => {
    // Move slider to the right
    const slider = document.querySelector(".previous-scores ul");
    slider.scrollLeft -= 100;
  };

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

        {userComment && (
          <div className="user-comment">
            <p>{userComment}</p>
          </div>
        )}

        <div className="previous-scores">
          <h3>Previous Scores</h3>
          <div className="slider">
            <ul>
              {previousScores.map((score, index) => (
                <li key={index}>{score.score} - {score.date}</li>
              ))}
            </ul>
           
          </div>
        </div>

        <Link to="/play-game" className="back-to-home1">
          Return
        </Link>
      </div>
    </div>
  );
};

export default CountingObjectsGame;
