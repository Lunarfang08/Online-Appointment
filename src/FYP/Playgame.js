import React, { useEffect, Suspense } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Playgame.css';
import { FaGamepad } from 'react-icons/fa';

// Lazy load route components
const Game1 = React.lazy(() => import('./Game1'));
const Game2 = React.lazy(() => import('./Game2'));
const Game3 = React.lazy(() => import('./Game3'));
const Game4 = React.lazy(() => import('./Game4'));
const Game5 = React.lazy(() => import('./Game5'));
const Game6 = React.lazy(() => import('./Game6'));
const Game7 = React.lazy(() => import('./Game7'));
const Game8 = React.lazy(() => import('./Game8'));
const Game9 = React.lazy(() => import('./Game9'));

const Playgame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Sign'); // Redirect to sign-in page if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    // Optimized event listener
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const moveX = ((clientX - screenWidth / 2) / screenWidth) * 30; // 30 is the max movement in pixels
      const moveY = ((clientY - screenHeight / 2) / screenHeight) * 30;
    
      const background = document.querySelector('.navigation-container::before');
      if (background) {
        background.style.backgroundPosition = `${moveX}px ${moveY}px`;
      }
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="playgame-page">
      <div className="navigation-container">
        {/* Add links to other games */}
        <Link to="/Game1" className="game-link">
          <FaGamepad className="icon" />
          Memory Match Game
        </Link>
        
        <Link to="/Game2" className="game-link">
          <FaGamepad className="icon" />
          Counting Objects game
        </Link>

        <Link to="/Game3" className="game-link">
          <FaGamepad className="icon" />
          DragonBox Numbers Game
        </Link>

        <Link to="/Game4" className="game-link">
          <FaGamepad className="icon" />
          Logic Maze
        </Link>

        <Link to="/Game5" className="game-link">
          <FaGamepad className="icon" />
         Pattern Recognition
        </Link>

        <Link to="/Game6" className="game-link">
          <FaGamepad className="icon" />
          Number Recognition
        </Link>
        
        <Link to="/Game7" className="game-link">
          <FaGamepad className="icon" />
          Number Sorting
        </Link>

        <Link to="/Game8" className="game-link">
          <FaGamepad className="icon" />
          8 Puzzle Game
        </Link>

        <Link to="/Game9" className="game-link">
          <FaGamepad className="icon" />
          Enchanted Math Quest
        </Link>
        {/* Add more links for other games as needed */}
        
        <Link to="/" className="back-to-home">
          Return
        </Link>
      </div>

      {/* Suspense for lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Define routes using Routes */}
        <Routes>
          <Route path="/Game1" element={<Game1 />} />
          <Route path="/Game2" element={<Game2 />} />
          <Route path="/Game3" element={<Game3 />} />
          <Route path="/Game4" element={<Game4 />} />
          <Route path="/Game5" element={<Game5 />} />
          <Route path="/Game6" element={<Game6 />} />
          <Route path="/Game7" element={<Game7 />} />
          <Route path="/Game8" element={<Game8 />} />
          <Route path="/Game9" element={<Game9 />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Playgame;
