import React, { useState, useEffect } from 'react';
import './Game7.css';
import { Link } from 'react-router-dom';

const NumberSortingGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    const newNumbers = [];
    for (let i = 0; i < 10; i++) {
      newNumbers.push(Math.floor(Math.random() * 150)); // Generate random numbers between 0 and 99
    }
    setNumbers(newNumbers);
    setSortedNumbers([...newNumbers].sort((a, b) => a - b)); // Sort the generated numbers in ascending order
  };

  const handleNumberClick = (index) => {
    // Check if the index is already selected
    const isSelected = selectedIndices.includes(index);
    if (isSelected) {
      // If selected, remove it from the selected indices array
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      // If not selected, add it to the selected indices array
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleSubmit = () => {
    // Check if the selected indices match the indices of sorted numbers
    const isCorrect = JSON.stringify(selectedIndices.sort()) === JSON.stringify(sortedNumbers.map((_, index) => index).sort());
    if (isCorrect) {
      alert('Congratulations! You sorted the numbers correctly.');
      setScore(score + 1); // Increase score if sorted correctly
      setSelectedIndices([]); // Clear selected indices
      generateNumbers(); // Generate new numbers
    } else {
      alert('Sorry, the order is incorrect. Please try again.');
      setSelectedIndices([]); // Clear selected indices
    }
  };

  return (
    <div className='img4'>
      <div className="number-sorting-game-container">
        <h1 className="number-sorting-game-title">Number Sorting Game</h1>
        <p className='hint'><b>Benefits</b>: Sorting games offer valuable practice for individuals with difficulties in numerical processing, enhancing their ability to recognize patterns, sequence information, and correct errors through interactive and visually appealing experiences.</p> 
        <p className="number-sorting-game-instruction">Click the numbers in the correct order:</p>
        <div className="number-container">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`number-item ${selectedIndices.includes(index) ? 'selected' : ''}`}
              onClick={() => handleNumberClick(index)}
            >
              {number}
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="generate-button" onClick={generateNumbers}>
          Generate New Numbers
        </button>
        <div className="score-display">Score: {score}</div> {/* Display the current score */}
        <Link to="/play-game" className="back-to-home">
          Return
        </Link>
      </div>
    </div>
  );
};

export default NumberSortingGame;
