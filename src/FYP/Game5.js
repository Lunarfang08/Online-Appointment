import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Game5.css';

const generateNextNumber = (pattern) => {
  const length = pattern.length;
  let nextNumber;

  // Check if the sequence is arithmetic
  if (pattern.every((val, i, arr) => i === 0 || val - arr[i - 1] === arr[1] - arr[0])) {
    const difference = pattern[1] - pattern[0];
    nextNumber = pattern[length - 1] + difference;
  }
  // Check if the sequence is geometric
  else if (pattern.every((val, i, arr) => i === 0 || val / arr[i - 1] === arr[1] / arr[0])) {
    const ratio = pattern[1] / pattern[0];
    nextNumber = pattern[length - 1] * ratio;
  }
  // Check if the sequence is squares
  else if (pattern.every((val, i) => Math.sqrt(val) === i + 1)) {
    const nextIndex = Math.sqrt(pattern[length - 1]) + 1;
    nextNumber = nextIndex * nextIndex;
  }
  // Check if the sequence is fibonacci
  else if (length > 2 && pattern[length - 1] === pattern[length - 2] + pattern[length - 3]) {
    nextNumber = pattern[length - 1] + pattern[length - 2];
  }
  // Check if the sequence is prime (very basic check, not efficient for large numbers)
  else if (pattern.every((val) => {
    for (let i = 2, s = Math.sqrt(val); i <= s; i++)
      if (val % i === 0) return false;
    return val > 1;
  })) {
    let i = pattern[length - 1] + 1;
    for (; !pattern.every((val) => i % val !== 0 || val === i); i++);
    nextNumber = i;
  }
  // Check if the sequence is factorial
  else if (pattern.every((val, i) => i === 0 || val === pattern[i - 1] * i)) {
    nextNumber = pattern[length - 1] * length;
  }
  // Add other pattern checks here

  return nextNumber;
};

const getRandomPattern = () => {
  // Example patterns for fibonacci, prime, and factorial
  const fibonacci = [0, 1, 1, 2, 3];
  const primes = [2, 3, 5, 7, 11];
  const factorials = [1, 1, 2, 6, 24];

  // Randomly choose between different sequence types
  const patternType = Math.floor(Math.random() * 6);
  switch (patternType) {
    case 0: // Arithmetic sequence
      return [5, 8, 11, 14, 17];
    case 1: // Geometric sequence
      return [3, 9, 27, 81, 243];
    case 2: // Square sequence
      return [1, 4, 9, 16, 25];
    case 3: // Fibonacci sequence
      return fibonacci;
    case 4: // Prime number sequence
      return primes;
    case 5: // Factorial sequence
      return factorials;
    // Add more cases for different types of sequences
    default:
      return [5, 8, 11, 14, 17]; // Fallback to arithmetic
  }
};
const PatternRecognitionGame = () => {
  const [pattern, setPattern] = useState(getRandomPattern());
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('patternRecognitionScores')) || [];
    setPreviousScores(storedScores);
  }, []);

  const checkAnswer = () => {
    const nextNumberInPattern = generateNextNumber(pattern);
    const userAnswer = parseInt(userInput.trim(), 10);
  
    if (!isNaN(userAnswer) && userAnswer === nextNumberInPattern) {
      setScore(score + 1);
      setPattern(getRandomPattern()); // Change the pattern after a correct answer
      setUserInput('');
      saveScore(); // Call saveScore function after each correct answer
    } else {
      alert('Incorrect! Try again.');
      setPattern(getRandomPattern()); // Reset the pattern on a wrong answer
      setUserInput('');
    }
  };
  


  const saveScore = () => {
    const updatedScores = [...previousScores, score];
    localStorage.setItem('patternRecognitionScores', JSON.stringify(updatedScores));
    setPreviousScores(updatedScores);
  };

  return (
    <div className='img3'>
    <div className="pattern-game-container">
      <h1>Pattern Recognition Game</h1>
      <p><b>Benefit:</b><i> PatternRecognitionGame enhances mathematical reasoning by challenging users to identify and extend sequences, fostering numerical pattern comprehension.</i></p>
      <p>What is the next number in the pattern?</p>
      <div className="pattern-display">{pattern.join(' - ')} - ?</div>
      <input
        className="pattern-input"
        type="text"
        placeholder="Enter your answer"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="pattern-submit-btn" onClick={checkAnswer}>
        Submit
      </button>
      <p className="pattern-score">Score: {score}</p>
      <button className="save-score-btn" onClick={saveScore}>
        Save Score
      </button>
      <div className="previous-scores">
        <h3>Previous Scores</h3>
        <ul>
          {previousScores.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ul>
      </div>
      <Link to="/play-game" className="back-to-home1">
        Return
      </Link>
    </div>
    </div>
  );
};

export default PatternRecognitionGame;