

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./FYP/Home";
import "./FYP/Home.css";
import Contact from "./FYP/Contact";
import About from "./FYP/About";
import PlayGame from "./FYP/Playgame";
import Game1 from "./FYP/Game1"; 
import Game2 from "./FYP/Game2";
import Game3 from "./FYP/Game3";
import Game4 from "./FYP/Game4";
import Game5 from "./FYP/Game5";
import Game6 from "./FYP/Game6";
import Game7 from "./FYP/Game7";
import Game8 from "./FYP/Game8";
import Game9 from "./FYP/Game9";
import Sign from "./FYP/Sign";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/play-game" element={<PlayGame />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/game5" element={<Game5 />} />
        <Route path="/game6" element={<Game6 />} />
        <Route path="/game7" element={<Game7 />} />
        <Route path="/game8" element={<Game8 />} />
        <Route path="/game9" element={<Game9 />} />
        <Route path="/Sign" element={<Sign />} />
      </Routes>
    </Router>
  );
};

export default App;
