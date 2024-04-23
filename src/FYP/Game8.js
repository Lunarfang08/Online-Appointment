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
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null); // New state for time taken
  const [solved, setSolved] = useState(false); // New state to track if puzzle is solved

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

  // Calculate time taken when endTime changes
  useEffect(() => {
    if (endTime) {
      setTimeTaken((endTime - startTime) / 1000);
    }
  }, [endTime, startTime]);

  const handleTileClick = (value) => {
    const emptyPos = findEmptyPosition(board);
    const tilePos = findTilePosition(board, value);
    if (isValidMove(emptyPos, tilePos)) {
      const newBoard = swapTiles(board, emptyPos, tilePos);
      setBoard(newBoard);
      setMoves(moves + 1);
    }
    if (isSolved(board)) {
      setEndTime(Date.now());
      setSolved(true); // Puzzle is solved
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

  // Move alert to a separate useEffect
  useEffect(() => {
    if (isSolved(board)) {
      alert(`Congratulations! You have completed the puzzle in ${moves} move`);
    }
  }, [solved, moves, timeTaken, board]);

  return (
    <div className="game">
      <h1>8 Puzzle Game</h1>
      <b>Benefits:</b>Experience the 8 Puzzle Game, where you can sharpen your spatial
        reasoning and logical thinking skills while having fun. It enhances problem-solving
        abilities and numerical understanding, making it ideal for learners
        seeking to boost their cognitive skills.
      <div className="goal-board">
        <h2>Goal Board</h2>
        <Board board={goalBoard} onClick={() => {}} />
      </div>
      <div className="current-board">
        <h2>Current Board</h2>
        <Board board={board} onClick={handleTileClick} />
        <p>Moves: {moves}</p>
      </div>
      <Link to="/play-game" className="back-to-home">
        Return
      </Link>
    </div>
  );
};

export default Game;
