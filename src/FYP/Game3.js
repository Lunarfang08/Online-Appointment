import React, { useState, useEffect } from 'react';
import './Game3.css'; // Import the external CSS file for styling
import { Link } from 'react-router-dom';

const DragonBoxNumbers = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [level, setLevel] = useState(1);
  const [sessionScore, setSessionScore] = useState(0);
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    generateNumbers();
  }, [level]);

  useEffect(() => {
    const storedScores = localStorage.getItem('dragonBoxNumbersScores');
    if (storedScores) {
      setPreviousScores(JSON.parse(storedScores));
    } else {
      setPreviousScores([]);
    }
  }, []);

  useEffect(() => {
    const savedSessionScore = localStorage.getItem('dragonBoxNumbersSessionScore');
    if (savedSessionScore) {
      setSessionScore(parseInt(savedSessionScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dragonBoxNumbersSessionScore', sessionScore.toString());
  }, [sessionScore]);

  const generateNumbers = () => {
    setA(Math.floor(Math.random() * (10 * level)) + 1);
    setB(Math.floor(Math.random() * (10 * level)) + 1);
    setOperator(getRandomOperator());
  };

  const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  };

  const handleOperatorChange = () => {
    setOperator(getRandomOperator());
    generateNumbers();
  };

  const checkAnswer = () => {
    const correctAnswer = calculateCorrectAnswer();
    const userAnswerFloat = parseFloat(userAnswer);
    const tolerance = 0.01; // Define a tolerance for floating-point comparisons
    const isCorrect = Math.abs(userAnswerFloat - correctAnswer) < tolerance;
    setIsCorrect(isCorrect);

    // No need to update sessionScore here
    // Only update sessionScore if the answer is correct
    if (isCorrect) {
      setLevel(level + 1);
      setSessionScore(sessionScore + 1); // Update the session score
      saveScore(sessionScore + 1); // Save the score
    }

    setTimeout(() => {
      setIsCorrect(null);
      generateNumbers();
      setUserAnswer('');
    }, 2000);
  };

  const calculateCorrectAnswer = () => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return 0;
    }
  };

  const saveScore = (score) => {
    const newScore = { score, date: new Date().toLocaleString() };
    const updatedScores = [...previousScores, newScore];
    setPreviousScores(updatedScores);
    localStorage.setItem('dragonBoxNumbersScores', JSON.stringify(updatedScores));
  };

  // Save the initial session score when the component mounts
  useEffect(() => {
    localStorage.setItem('dragonBoxNumbersSessionScore', sessionScore.toString());
  }, []);

  return (
    <div className="img3">
      <div className="dragon-box">
        <h2 className="Title">DragonBox Numbers Game</h2>
        <p className="hint">
          <b>Benefits:</b> Improves mathematical reasoning and problem-solving skills.
        </p>
        <p className="equation">{`${a} ${operator} ${b} = ?`}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => {
            const regex = /^[0-9*\/+-.]*$/;
            if (regex.test(e.target.value)) {
              setUserAnswer(e.target.value);
            }
          }}
          className="answer-input"
        />
        <button onClick={checkAnswer} className="check-btn">
          Check Answer
        </button>
        <button onClick={handleOperatorChange} className="change-operator-btn">
          Change Operator
        </button>
        <p className="level-indicator">Level: {level}</p>
        {isCorrect !== null && (
          <p className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect.Try again!'}
          </p>
        )}
        <div className="previous-scores">
          <h3>Previous Scores</h3>
          <ul>
            {previousScores.map((score, index) => (
              <li key={index}>{score.score}</li>
            ))}
          </ul>
        </div>
        <Link to="/play-game" className="back-to-home">
          Return
        </Link>
      </div>
    </div>
  );
};

export default DragonBoxNumbers;