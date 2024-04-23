import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Game4.css";

const LogicMaze = () => {
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState(generateMaze(5, 5));
  const [question, setQuestion] = useState(getNextQuestion());
  const [timer, setTimer] = useState(0);
  const [mazeFinished, setMazeFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (!mazeFinished) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Stop the timer if the maze is finished
    }
    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, [mazeFinished]);

  const handleMove = (direction) => {
    let newX = currentPosition.x;
    let newY = currentPosition.y;

    switch (direction) {
      case 'up': if (newY > 0 && maze[newY - 1][newX] === 0) newY -= 1; break;
      case 'down': if (newY < maze.length - 1 && maze[newY + 1][newX] === 0) newY += 1; break;
      case 'left': if (newX > 0 && maze[newY][newX - 1] === 0) newX -= 1; break;
      case 'right': if (newX < maze[0].length - 1 && maze[newY][newX + 1] === 0) newX += 1; break;
      default: break;
    }

    if (newX !== currentPosition.x || newY !== currentPosition.y) {
      setCurrentPosition({ x: newX, y: newY });
      if (isMazeFinished()) {
        setMazeFinished(true);
      }
    }
  };

  const handleAnswer = (answer) => {
    if (answer === correctAnswerForCurrentQuestion(question)) {
      // Unlock adjacent paths
      const newMaze = [...maze];
      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      directions.forEach(([dx, dy]) => {
        const newX = currentPosition.x + dx;
        const newY = currentPosition.y + dy;
        if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length) {
          newMaze[newY][newX] = 0; // Unlock path
        }
      });
      setMaze(newMaze);

      setQuestion(getNextQuestion());
      // Optionally, display a message for correct answer
    } else {
      // Handle incorrect answer
      // Optionally, display a message for incorrect answer
    }
  };

  const isMazeFinished = () => {
    // Check if all paths in the maze have been traversed
    return maze.every(row => row.every(cell => cell === 0));
  };

  return (
    <div className="logic-maze">
      <p className='col'><b>Benefits:</b> The Logic maze combines problem-solving challenges with arithmetic operations, providing benefits such as enhanced logical reasoning, mathematical skills, and critical thinking development.</p>
      <div><b>Note</b>: When Maze is finished click on any button <b>Left,Right,Up,Down</b> to stop timer</div>
      <div>Timer: {timer} seconds</div>
      <MazeGrid maze={maze} currentPosition={currentPosition} />
      <QuestionPanel question={question} onAnswer={handleAnswer} />
      <Controls onMove={handleMove} />
      {mazeFinished && (
        <div className="maze-finished">Congratulations! You finished the maze in {timer} seconds.</div>
      )}
      <Link to="/play-game" className="back-to-home">
        Return
      </Link>
    </div>
  );
};

const MazeGrid = ({ maze, currentPosition }) => {
  return (
    <div className="maze-grid">
      {maze.map((row, rowIndex) => (
        row.map((cell, cellIndex) => (
          <div key={`${rowIndex}-${cellIndex}`} className={`cell ${cell === 1 ? 'wall' : 'path'} ${currentPosition.x === cellIndex && currentPosition.y === rowIndex ? 'current' : ''}`}>
          </div>
        ))
      ))}
    </div>
  );
};

const QuestionPanel = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswer(parseInt(answer, 10)); // Ensure answer is an integer
    setAnswer('');
  };

  return (
    <div className="question-panel">
      <form onSubmit={handleSubmit}>
        <p>{question.question}</p>
        <input type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Controls = ({ onMove }) => {
  return (
    <div className="controls">
      <button onClick={() => onMove('up')}>Up</button>
      <button onClick={() => onMove('down')}>Down</button>
      <button onClick={() => onMove('left')}>Left</button>
      <button onClick={() => onMove('right')}>Right</button>
    </div>
  );
};

export default LogicMaze;

function generateMaze(width, height) {
  let maze = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        row.push(1); // Border walls
      } else {
        row.push(Math.random() > 0.7 ? 1 : 0); // Random walls
      }
    }
    maze.push(row);
  }
  return maze;
}

function getNextQuestion() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return {
    question: `What is ${num1} + ${num2}?`,
    answer: num1 + num2,
  };
}

function correctAnswerForCurrentQuestion(currentQuestion) {
  return currentQuestion.answer;
}
