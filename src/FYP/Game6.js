import React, { useState, useEffect } from "react";
import "./Game6.css";
import { Link } from "react-router-dom";

const NumberDisplay = ({ number }) => {
  return <div className="number1">{number}</div>; // Apply CSS class for styling
};

const Game = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0); // Default time is 0
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty
  const [timerInput, setTimerInput] = useState(""); // Separate state for timer input
  const [isTimeUp, setIsTimeUp] = useState(false); // Flag to track if time is up
  const [previousScores, setPreviousScores] = useState(() => {
    const storedScores = localStorage.getItem("previousScores");
    return storedScores ? JSON.parse(storedScores) : [];
  });

  useEffect(() => {
    localStorage.setItem("previousScores", JSON.stringify(previousScores));
  }, [previousScores]);

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      // Game over logic
      alert(`Time's up! You have scored ${score} answers`);
      setIsTimeUp(true);
      saveScore();
    }

    return () => clearTimeout(timer);
  }, [time, score]);

  const generateRandomNumber = () => {
    let maxNumber = 10;
    if (difficulty === "medium") {
      maxNumber = 50;
    } else if (difficulty === "hard") {
      maxNumber = 100;
    }
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    setCurrentNumber(randomNumber);
  };

  const handleAnswer = () => {
    if (!isTimeUp) {
      const selectedNumber = parseInt(userInput);
      if (!isNaN(selectedNumber) && selectedNumber === currentNumber) {
        setScore(score + 1);
      }
      generateRandomNumber();
      setUserInput("");
    }
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    generateRandomNumber();
  };

  const startCustomTimer = () => {
    setTime(parseInt(timerInput) || 0); // Start timer with custom input time or default to 0 if not a valid number
    setIsTimeUp(false); // Reset time up flag
  };

  const resetTimer = () => {
    setTime(0); // Reset timer to 0
    setScore(0); // Reset score to 0
    setIsTimeUp(false); // Reset time up flag
  };

  const saveScore = () => {
    if (score > 0) {
      const newScore = { score, date: new Date().toLocaleString() };
      setPreviousScores((prevScores) => [...prevScores, newScore]);
    }
  };
  

  return (
    <div className="im3">
      <div className="game-container">
        <p>
          <b>Benefit:</b>{" "}
          <i>
            Number recognition games provide dyscalculic individuals with
            structured practice, multi-sensory learning experiences, and
            positive reinforcement to improve numerical skills and confidence.
          </i>
        </p>
        <NumberDisplay number={currentNumber} />
        <div className="info-container">
          <div className="score">Score: {score}</div>
          <div className="time">Time: {time}</div>
        </div>
        <div className="input-container">
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the number"
            disabled={isTimeUp} // Disable input field when time is up
          />
          <button onClick={handleAnswer} disabled={isTimeUp}>
            Submit
          </button>{" "}
          {/* Disable button when time is up */}
        </div>
        <div className="difficulty-container">
          Difficulty:
          <button onClick={() => changeDifficulty("easy")}>Easy</button>
          <button onClick={() => changeDifficulty("medium")}>Medium</button>
          <button onClick={() => changeDifficulty("hard")}>Hard</button>
        </div>
        <div className="timer-controls">
          <input
            type="number"
            value={timerInput}
            onChange={(e) => setTimerInput(e.target.value)}
            placeholder="Enter time (seconds)"
          />
          <button onClick={startCustomTimer}>Start Timer</button>
          <button onClick={resetTimer}>Reset Timer</button>
        </div>
      </div>
      <div className="previous-scores">
        <h3>Previous Scores:</h3>
        <div className="previous-scores-slider">
          {previousScores.map((prevScore, index) => (
            <div key={index} className="previous-score-item">Score:{`${prevScore.score} (${prevScore.date})`}</div>
          ))}
        </div>
      </div>
      <Link to="/play-game" className="back-to-home">
        Return
      </Link>
    </div>
  );
};

export default Game;
