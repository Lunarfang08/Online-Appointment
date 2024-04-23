import React, { useState, useEffect } from 'react';
import './Game1.css';
import { Link } from 'react-router-dom';
// Example numbers for card data structure
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8']; // Use strings for comparison

const Game1 = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards for a new game
  const shuffleCards = () => {
    const shuffledNumbers = [...numbers, ...numbers] // Duplicate numbers for pairs
      .sort(() => Math.random() - 0.5)
      .map(number => ({ number, id: Math.random(), matched: false, flipped: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledNumbers);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!disabled && !card.flipped) { // Check if the game is not currently disabled and the card is not already flipped
      card.flipped = true; // Mark the card as flipped
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };
  
  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // Disable any further clicks
      if (choiceOne.number === choiceTwo.number) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.number === choiceOne.number) {
              return {...card, matched: true}; // Mark both cards as matched
            } else {
              return card;
            }
          });
        });
        resetTurn(); // Reset the turn after a short delay
      } else {
        // No match found, flip the cards back over after a delay
        setTimeout(() => {
          setCards(prevCards => {
            return prevCards.map(card => {
              return {...card, flipped: false}; // Flip the card back over
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

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
    </div>
  );
};

export default Game1;
