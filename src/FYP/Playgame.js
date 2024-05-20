import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Playgame.css';
import { FaGamepad } from 'react-icons/fa';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Game4 from './Game4';
import Game5 from './Game5';
import Game6 from './Game6';
import Game7 from './Game7';
import Game8 from './Game8';
import Game9 from './Game9';

const Playgame = () => {
  const navigate = useNavigate();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [showDropdown, setShowDropdown] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/Sign');
  //   }
  // }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const moveX = ((clientX - screenWidth / 2) / screenWidth) * 30;
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
          <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
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

      <Routes>
        {games.map((game, index) => (
          <Route key={index} path={`/Game${index + 1}`} element={<game.component />} />
        ))}
      </Routes>
    </div>
  );
};

export default Playgame;
