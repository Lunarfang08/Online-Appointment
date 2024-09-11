import React, { useState } from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="about-page">
      {/* Navbar */}
      <nav className="about-navbar">
        <div className="about-logo">
          <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3656336_zcctflg10vp5lq513zlwjhv9yl6dmujqhvysf8t9_monogram-an-logo-design.jpg" alt="Logo" />
        </div>
        <div className="about-menu-toggle" onClick={toggleMenu}>
          <span className={`about-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`about-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`about-bar ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        <ul className={`about-nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/">Book Now</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/location">Location</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <header className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our online healthcare and management platform, where we prioritize your well-being and efficiency.</p>
      </header>
      
      <section className="about-team-section">
        <h2>Meet the Team</h2>
        <div className="about-team-members">
          <div className="about-team-member">
            <div className="about-member-photo" style={{backgroundImage: 'url(https://t4.ftcdn.net/jpg/05/94/38/27/360_F_594382716_SA2EelKT0OuHMO78lYv3JRXWMuCwkTLD.jpg)'}}></div>
            <h3>Arsal</h3>
            <p>Co-Founder & Lead Developer</p>
            <p>Arsal is passionate about developing innovative solutions to improve healthcare management and enhance user experience.</p>
          </div>
          <div className="about-team-member">
            <div className="about-member-photo" style={{backgroundImage: 'url(https://www.shutterstock.com/shutterstock/photos/2195809163/display_1500/stock-vector-n-logo-letter-design-on-luxury-background-nn-logo-monogram-initials-letter-concept-n-nn-icon-2195809163.jpg)'}}></div>
            <h3>Najaf</h3>
            <p>Co-Founder & UX/UI Designer</p>
            <p>Najaf focuses on creating intuitive and visually appealing interfaces that make our platform easy to use and accessible to everyone.</p>
          </div>
        </div>
      </section>

      <section className="about-mission-section">
        <h2>Our Mission</h2>
        <p>Our mission is to revolutionize the healthcare management experience by providing a user-friendly platform that integrates seamlessly with healthcare providers and offers comprehensive tools for managing appointments, patient records, and more.</p>
      </section>

      <footer className="about-footer">
        <p>&copy; 2024 Healthcare Appointments. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
