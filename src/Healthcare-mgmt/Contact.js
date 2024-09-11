import React, { useState } from "react";
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState(''); // To show success or error message

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message); // Message sent successfully!
        setFormData({ name: '', email: '', message: '' }); // Clear the form after submission
      } else {
        setResponseMessage('Error: ' + data.error);
      }
    } catch (error) {
      setResponseMessage('Failed to send the message. Please try again.');
    }
  };

  return (
    <div>
      {/* Navbar */}
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

      <div className="contact-container">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>We would love to hear from you. Reach out with any questions or concerns.</p>
        </header>

        <div className="contact-content">
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="contact-input" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="contact-input" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="contact-textarea" 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <button type="submit" className="contact-submit">Send Message</button>
            </form>
            {/* Show response message */}
            {responseMessage && <p className="response-message">{responseMessage}</p>}
          </div>

          <div className="contact-info">
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> info@healthcareapp.com</p>
            <p><strong>Phone:</strong> +92 321 520918</p>
            <p><strong>Address:</strong> 123 Healthcare St, Wellness City, Healthland</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
