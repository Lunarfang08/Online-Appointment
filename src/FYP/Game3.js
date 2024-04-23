import React, { useState, useEffect } from 'react';
import './Game3.css'; // Import the external CSS file for styling
import { Link } from "react-router-dom";
const DragonBoxNumbers = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    generateNumbers();
  }, [level]);

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
    setTimeout(() => {
      if (isCorrect) {
        setLevel(level + 1);
      }
      setIsCorrect(null);
      generateNumbers();
      setUserAnswer('');
    }, 2000);
  };

 const calculateCorrectAnswer = () => {
  switch (operator) {
    case '+':
      return (a + b).toFixed(2); // Round the sum to two decimal places
    case '-':
      return (a - b).toFixed(2); // Round the difference to two decimal places
    case '*':
      return (a * b).toFixed(2); // Round the product to two decimal places
    case '/':
      return (a / b).toFixed(2); // Round the quotient to two decimal places
    default:
      return 0;
  }
};

  return (
    <div className='img3'>
    <div className="dragon-box">
      <h2 className='Title'>DragonBox Numbers Game</h2>
      <p className='hint'><b>Benefits:</b> Improves mathematical reasoning and problem-solving skills.</p>
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
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </p>
      )}
      <Link to="/play-game" className="back-to-home">
        Return
      </Link>
    </div>
    </div>
  );
};

export default DragonBoxNumbers;
