import React, { useState } from "react";
import "./Location.css";

const Location = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>   {/* Navbar */}
    <nav className="navbar">
      <div className="logo">
        <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3656336_zcctflg10vp5lq513zlwjhv9yl6dmujqhvysf8t9_monogram-an-logo-design.jpg" alt="Clinic Logo" />
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
      <li><a href="/">Book Now</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/location">Location</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <div className="location-container">
      {/* Location Content */}
      <header className="location-header">
        <h1>Our Location</h1>
        <p>Visit our clinic at the heart of Wellness City.</p>
      </header>

      <div className="location-content">
        <div className="map-section">
          <h2>Find Us Here</h2>
          <iframe
            className="location-map"
            src="https://maps.google.com/maps?q=g-9+islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
            title="Clinic Location"
          ></iframe>
        </div>

        <div className="address-section">
          <h2>Address</h2>
          <p><strong>Clinic Name:</strong> Wellness Clinic</p>
          <p><strong>Address:</strong> Street 99, G-9, Islamabad</p>
          <p><strong>Phone:</strong> +92 321 5200901</p>
          <p><strong>Email:</strong> info@wellnessclinic.com</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Location;
