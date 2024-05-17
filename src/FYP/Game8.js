import React, { useState, useEffect } from "react";
import "./Game8.css";
import { Link } from "react-router-dom";

const BOARD_SIZE = 3;

const initialBoard = () => {
  let board = [];
  let count = 1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    let row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (count === BOARD_SIZE * BOARD_SIZE) {
        row.push(0); // Empty cell
      } else {
        row.push(count);
      }
      count++;
    }
    board.push(row);
  }
  return board;
};

const shuffleEmptyBlock = (board) => {
  let shuffledBoard = [...board];
  const emptyX = Math.floor(Math.random() * BOARD_SIZE);
  const emptyY = Math.floor(Math.random() * BOARD_SIZE);
  // Swap empty cell with a random cell
  [
    shuffledBoard[emptyX][emptyY],
    shuffledBoard[BOARD_SIZE - 1][BOARD_SIZE - 1],
  ] = [
    shuffledBoard[BOARD_SIZE - 1][BOARD_SIZE - 1],
    shuffledBoard[emptyX][emptyY],
  ];
  return shuffledBoard;
};

const isSolvable = (board) => {
  let inversions = 0;
  let array = board.flat().filter((num) => num !== 0);
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

const isSolved = (board) => {
  let value = 1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] !== value % (BOARD_SIZE * BOARD_SIZE)) {
        return false;
      }
      value++;
    }
  }
  return true;
};

const Tile = ({ value, onClick }) => {
  return (
    <button className="tile" onClick={onClick}>
      {value === 0 ? "" : value}
    </button>
  );
};

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <Tile key={cellIndex} value={cell} onClick={() => onClick(cell)} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard());
  const [goalBoard, setGoalBoard] = useState(initialBoard()); // New state for the goal board
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [solved, setSolved] = useState(false); // New state to track if puzzle is solved
  const [previousScores, setPreviousScores] = useState(() => {
    // Load previous scores from local storage
    const scoresFromStorage = localStorage.getItem("previousScores");
    return scoresFromStorage ? JSON.parse(scoresFromStorage) : [];
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    let shuffledBoard = shuffleEmptyBlock(initialBoard());
    while (!isSolvable(shuffledBoard)) {
      shuffledBoard = shuffleEmptyBlock(initialBoard());
    }
    setBoard(shuffledBoard);
    setGoalBoard(initialBoard()); // Set the goal board
    setMoves(0);
    setStartTime(Date.now());
    setSolved(false); // Reset solved state
  }, []);

  const handleTileClick = (value) => {
    const emptyPos = findEmptyPosition(board);
    const tilePos = findTilePosition(board, value);
    if (isValidMove(emptyPos, tilePos)) {
      const newBoard = swapTiles(board, emptyPos, tilePos);
      setBoard(newBoard);
      setMoves(moves + 1);
      if (isSolved(newBoard)) {
        setEndTime(Date.now());
        setSolved(true); // Puzzle is solved
        setMessage(getMessage(moves + 1, (Date.now() - startTime) / 1000)); // Set message
        // Save the completed game's score to previous scores
        const finalScore = {
          move: moves + 1,
          time: (Date.now() - startTime) / 1000,
        };
        setPreviousScores((prevScores) => [...prevScores, finalScore]);
        localStorage.setItem(
          "previousScores",
          JSON.stringify([...previousScores, finalScore])
        );
      }
    }
  };

  const findEmptyPosition = (board) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === 0) {
          return { x: i, y: j };
        }
      }
    }
  };

  const findTilePosition = (board, value) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === value) {
          return { x: i, y: j };
        }
      }
    }
  };

  const isValidMove = (emptyPos, tilePos) => {
    const dx = Math.abs(emptyPos.x - tilePos.x);
    const dy = Math.abs(emptyPos.y - tilePos.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  const swapTiles = (board, pos1, pos2) => {
    const newBoard = board.map((row) => [...row]);
    const temp = newBoard[pos1.x][pos1.y];
    newBoard[pos1.x][pos1.y] = newBoard[pos2.x][pos2.y];
    newBoard[pos2.x][pos2.y] = temp;
    return newBoard;
  };

  const getMessage = (moves, time) => {
    if (moves <= 5 && time <= 60) {
      return "Wow! You solved it quickly with very few moves. Excellent!";
    } else if (moves <= 10 && time <= 120) {
      return "Great job! You solved it with relatively few moves and time.";
    } else if (moves <= 15 && time <= 180) {
      return "Nice work! You managed to solve it within a reasonable time.";
    } else if (moves <= 20 && time <= 240) {
      return "Well done! You solved it, though it took a bit longer.";
    } else {
      return "Keep practicing to improve your skills. You'll get there!";
    }
  };

  return (
    <div className="game">
      <h1>8 Puzzle Game</h1>
      <b>Benefits:</b>Experience the 8 Puzzle Game, where you can sharpen your
      spatial reasoning and logical thinking skills while having fun. It
      enhances problem-solving abilities and numerical understanding, making it
      ideal for learners seeking to boost their cognitive skills.
      <div className="goal-board">
        <h2>Goal Board</h2>
        <Board board={goalBoard} onClick={() => {}} />
      </div>
      <div className="current-board">
        <h2>Current Board</h2>
        <Board board={board} onClick={handleTileClick} />
        <p>Moves: {moves}</p>
        <p>Time: {(Date.now() - startTime) / 1000} seconds</p>
      </div>
      <div className="message-container">
        <h3>Message:</h3>
        <p>{message}</p>
      </div>
      <div className="previous-scores-container">
        <h2 className="previous-scores-heading">Previous Scores</h2>
        <div className="slider-container">
          <div className="slider">
            {previousScores.map((score, index) => (
              <div key={index} className="previous-score-item">
                Move: <span className="move">{score.move}</span> , Time:{" "}
                <span className="time">{score.time} seconds</span> ,
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link to="/play-game" className="back-to-home">
        Return
      </Link>
    </div>
  );
};

export default Game;
