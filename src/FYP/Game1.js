import React, { useState, useEffect } from 'react';
import './Game1.css';
import { Link } from 'react-router-dom';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8']; 

const Game1 = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [previousScores, setPreviousScores] = useState([]);
  const [userComment, setUserComment] = useState('');
  const [sliderIndex, setSliderIndex] = useState(0); // Slider index to track visible scores

  const shuffleCards = () => {
    const shuffledNumbers = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map(number => ({ number, id: Math.random(), matched: false, flipped: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledNumbers);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!disabled && !card.flipped) {
      card.flipped = true;
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };
  
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.number === choiceTwo.number) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.number === choiceOne.number) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prevCards => {
            return prevCards.map(card => {
              return {...card, flipped: false};
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    const storedScores = sessionStorage.getItem('previousScores');
    if (storedScores) {
      setPreviousScores(JSON.parse(storedScores));
    }
  }, []);

  const saveScore = () => {
    const newScore = { score: turns, date: new Date().toLocaleString() };
    const storedScores = JSON.parse(sessionStorage.getItem('previousScores')) || [];
    const updatedScores = [...storedScores, newScore];
    sessionStorage.setItem('previousScores', JSON.stringify(updatedScores));

    if (turns >= 1 && turns <= 30) {
      setUserComment('You have a good attention span. No short-term issues whatsoever.');
    } else if (turns > 30 && turns <= 50) {
      setUserComment('You need to work harder. More practice is required.');
    } else {
      setUserComment('Your performance suggests a need for additional support and practice.');
    }
  };

  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched) {
      saveScore();
    }
  }, [cards]);

  const handleSliderChange = (event) => {
    setSliderIndex(parseInt(event.target.value));
  };

  return (
    <div className="game1">
      <h2 className='MMM'>Memory Match Game</h2>
      <p className='hint'><b>Benefits</b>: Playing memory match games can improve cognitive functions such as memory retention, attention to detail, and concentration. These skills are crucial for individuals with difficulties in numerical processing as they help in better comprehension and retention of numerical concepts.</p>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <div 
            className={`card ${card.flipped || card.matched ? 'flipped' : ''}`} 
            key={card.id} 
            onClick={() => !disabled && !card.matched && handleChoice(card)}
          >
            <div className="number">{card.flipped || card.matched ? card.number : ''}</div>
          </div>
        ))}
      </div>

      <p className='MMM'>Turns: {turns}</p>

      <Link to="/play-game" className="back-to-home">
        Return
      </Link>

      {userComment && (
        <div className="user-comment">
          <p>{userComment}</p>
        </div>
      )}

      <div className="previous-scores">
        <h3>Previous Scores</h3>
        <input 
          type="range" 
          min="0" 
          max={previousScores.length - 1} 
          value={sliderIndex} 
          onChange={handleSliderChange} 
        />
        <ul>
          {previousScores.map((score, index) => (
            <li key={index} style={{ display: index >= sliderIndex && index < sliderIndex + 5 ? 'block' : 'none' }}>
              Score:{score.score} - {score.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game1;
