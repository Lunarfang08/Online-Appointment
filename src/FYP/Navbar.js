// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/contact" style={linkStyle}>Contact Us</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <Link to="/play-game" style={linkStyle}>Play Game</Link>
        </nav>
    );
};

// Basic inline styling
const navStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around'
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
};

export default Navbar;
