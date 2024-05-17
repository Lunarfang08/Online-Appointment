import React, { useEffect, useState, Suspense } from 'react';
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
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [showDropdown, setShowDropdown] = useState(true); // Initialize to true// Added back the state

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

  const handleAgeGroupChange = (event) => {
    setSelectedAgeGroup(event.target.value);
  };

  const games = [
    { name: 'Memory Match Game', age: '5 and above', component: Game1 },
    { name: 'Counting Objects Game', age: '5-7', component: Game2 },
    { name: 'DragonBox Numbers Game', age: '7 and above', component: Game3 },
    { name: 'Logic Maze', age: '8 and above', component: Game4 },
    { name: 'Pattern Recognition', age: '6-10', component: Game5 },
    { name: 'Number Recognition', age: '3-6', component: Game6 },
    { name: 'Number Sorting', age: '4-7', component: Game7 },
    { name: '8 Puzzle Game', age: '6 and above', component: Game8 },
    { name: 'Enchanted Math Quest', age: '7-10', component: Game9 }
  ];

  const filteredGames = selectedAgeGroup === 'all' ? games : games.filter(game => game.age.includes(selectedAgeGroup));

  return (
    <div className="playgame-page">
      <div className="navigation-container">
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
            Select Age Group
          </button>
          <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}> {/* Ensure dropdown visibility is controlled */}
            <select value={selectedAgeGroup} onChange={handleAgeGroupChange}>
              <option value="all">All</option>
              <option value="5 and above">5 and above (severity:easy)</option>
              <option value="5-7">5-7 (severity:easy)</option>
              <option value="7 and above">7 and above (severity:medium)</option>
              <option value="8 and above">8 and above (severity:hard)</option>
              <option value="6-10">6-10 (severity:medium)</option>
              <option value="3-6">3-6 (severity:easy)</option>
              <option value="4-7">4-7 (severity:easy)</option>
              <option value="6 and above">6 and above (severity:medium)</option>
              <option value="7-10">7-10 (severity:medium)</option>
            </select>
          </div>
        </div>

        {/* Display filtered games */}
        {filteredGames.map((game, index) => (
          <Link key={index} to={`/Game${games.indexOf(game) + 1}`} className="game-link">
            <FaGamepad className="icon" />
            <div>
              {game.name}
            </div>
          </Link>
        ))}

        <Link to="/" className="back-to-home">
          Return
        </Link>
        
      </div>

      {/* Suspense for lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Define routes using Routes */}
        <Routes>
          {games.map((game, index) => (
            <Route key={index} path={`/Game${index + 1}`} element={<game.component />} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default Playgame;
