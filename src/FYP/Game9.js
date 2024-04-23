import React, { useState, useEffect } from 'react';
import './Game9.css';
import { Link } from 'react-router-dom';
const mathProblems = [
  {
    problem: "You are on a journey through the enchanted forest. You encounter 5 friendly elves. Each elf gives you 3 magical stones. How many stones do you have in total?",
    answer: "15"
  },
  {
    problem: "You stumble upon a treasure chest guarded by 4 sleeping dragons. If you manage to sneak past 2 dragons, how many dragons are left guarding the treasure?",
    answer: "2"
  },
  {
    problem: "In the depths of a mystical cave, you find 3 glowing crystals. If each crystal can light up 4 rooms, how many rooms can all the crystals illuminate?",
    answer: "12"
  },
  {
    problem: "You come across a magical potion that can be shared among 6 friends equally. If you pour the potion into 2 cups, how much potion does each cup contain?",
    answer: "3"
  },
  {
    problem: "You meet a group of 7 wizards, each carrying 4 spell books. How many spell books are there in total?",
    answer: "28"
  },
  {
    problem: "You find a basket with 9 apples. If you give 3 apples to each of your 3 friends, how many apples do you have left?",
    answer: "0"
  },
  {
    problem: "You discover a treasure chest containing 10 bags of gold coins. Each bag contains 8 coins. How many gold coins are there in total?",
    answer: "80"
  },
  {
    problem: "You have 5 boxes of chocolates, and each box contains 6 chocolates. How many chocolates do you have in total?",
    answer: "30"
  },
  {
    problem: "You encounter a group of 4 knights, each riding on 3 horses. How many horses are there in total?",
    answer: "12"
  },
  {
    problem: "You find a magic potion that triples your strength. If you can lift 7 barrels without the potion, how many barrels can you lift with the potion?",
    answer: "21"
  },
  {
    problem: "You discover a treasure map with 12 secret locations marked on it. If you explore 4 locations each day, how many days will it take to explore all the locations?",
    answer: "3"
  },
  {
    problem: "You have 6 baskets, and each basket contains 9 apples. How many apples do you have in total?",
    answer: "54"
  },
  {
    problem: "You meet a group of 8 fairies, and each fairy has 5 wings. How many wings are there in total?",
    answer: "40"
  },
  {
    problem: "You find a chest filled with 15 gemstones. If you divide the gemstones equally among 3 friends, how many gemstones does each friend receive?",
    answer: "5"
  },
  {
    problem: "You discover a magic wand that grants you 4 wishes. If you have already used 2 wishes, how many wishes do you have left?",
    answer: "2"
  },
  {
    problem: "You find a garden with 7 rows of flowers, and each row has 6 flowers. How many flowers are there in total?",
    answer: "42"
  },
  {
    problem: "You encounter a group of 9 wizards, and each wizard has 7 magical spells. How many magical spells are there in total?",
    answer: "63"
  },
  {
    problem: "You come across a chest containing 8 bags of magic beans. If each bag contains 10 magic beans, how many magic beans are there in total?",
    answer: "80"
  },
  {
    problem: "You meet a group of 6 knights, and each knight is wearing 5 pieces of armor. How many pieces of armor are there in total?",
    answer: "30"
  },
  {
    problem: "You find a treasure chest with 11 golden coins. If you give 3 coins to each of your 4 friends, how many coins do you have left?",
    answer: "11"
  },
  {
    problem: "You discover a magic potion that can heal 5 wounds. If you have 4 wounds, how many wounds will remain after taking the potion?",
    answer: "1"
  },
  {
    problem: "You come across a garden with 6 apple trees, and each tree has 8 apples. How many apples are there in total?",
    answer: "48"
  },
  {
    problem: "You encounter a group of 10 fairies, and each fairy has 6 wings. How many wings are there in total?",
    answer: "60"
  },
  {
    problem: "You find a chest filled with 14 gemstones. If you divide the gemstones equally among 2 friends, how many gemstones does each friend receive?",
    answer: "7"
  },
  {
    problem: "You discover a magic wand that grants you 6 wishes. If you have already used 3 wishes, how many wishes do you have left?",
    answer: "3"
  },
  {
    problem: "You find a garden with 8 rows of flowers, and each row has 7 flowers. How many flowers are there in total?",
    answer: "56"
  },
  {
    problem: "You encounter a group of 12 wizards, and each wizard has 8 magical spells. How many magical spells are there in total?",
    answer: "96"
  },
];

function MathGame() {
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
  
    const totalProblems = mathProblems.length;
  
    const handleAnswerChange = (event) => {
      setAnswer(event.target.value);
    };
  
    const handleAnswerSubmit = () => {
      if (answer === mathProblems[currentProblemIndex].answer) {
        setShowFeedback(true);
        setScore(score + 1);
      } else {
        setShowFeedback(false);
      }
    };
  
    const handleNextProblem = () => {
      if (currentProblemIndex + 1 < totalProblems) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setAnswer("");
        setShowFeedback(false);
      } else {
        alert(`Congratulations! You've completed all the problems.Your score is ${score}`);
      }
    };
  
    useEffect(() => {
      if (showFeedback && answer === mathProblems[currentProblemIndex].answer) {
        const timeoutId = setTimeout(() => {
          handleNextProblem();
        }, 500); // Adjust the delay time as needed (in milliseconds)
        return () => clearTimeout(timeoutId);
      }
    }, [showFeedback]);
  
    return (
      <div className="math-game-container">
        <div className="math-game">
          <h4 className='gamen'><b>Enchanted Math Quest</b></h4>
          <p><b>Benifit:</b> "Enchanted Math Quest" helps individuals with dyscalculia by offering structured practice in numerical concepts within an interactive setting, boosting both math proficiency and confidence.</p>
          <div className="problem">
            <p>{mathProblems[currentProblemIndex].problem}</p>
            <input
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              disabled={showFeedback}
              className="answer-input"
            />
            <button onClick={handleAnswerSubmit} disabled={showFeedback} className="submit-button">
              Submit
            </button>
            {showFeedback && <p className="feedback">Correct!</p>}
          </div>
          <div className="score">Score: {score}/{totalProblems}</div>
          {!showFeedback && (
            <button onClick={handleNextProblem} className="next-button">Next Problem</button>
          )}
        </div>
        <Link to="/play-game" className="back-to-home">
        Return
      </Link>
      </div>
    );
  }
  
  export default MathGame;