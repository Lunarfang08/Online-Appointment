import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Contact.css'; 
import axios from 'axios';

const styles = {
    navbar: {
      backgroundColor: "#004d40",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      padding: "10px 15px",
      fontWeight: "bold",
      fontSize: "18px",
      transition: "background-color 0.3s",
    },
    activeNavLink: {
      backgroundColor: "#26a69a",
    },
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = {
            name: e.target.elements.name.value,
            phone: e.target.elements.phone.value,
            email: e.target.elements.email.value,
            subject: e.target.elements.subject.value,
            message: e.target.elements.message.value
        };

        await axios.post('http://192.168.100.8:5000/api/contact', formData);
        alert('Message sent successfully');
        // Optionally reset the form here
    } catch (err) {
        console.error('Error sending message:', err);
        alert('Error sending message');
    }
};

const Contact = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const toggleForm = () => setFormOpen(!isFormOpen);
    
    return (
      <div className="img3">
        <div className="contact-container">
        <nav className="navbar">
        <span className="navbar-brand">NumBuddy</span>
        <button className="navbar-toggler" onClick={handleNavCollapse}>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>
        <div className={"nav-menu " + (isNavCollapsed ? "collapsed" : "")}>
          <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/contact" className="nav-link" activeClassName="active">Contact Us</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
          <NavLink to="/play-game" className="nav-link" activeClassName="active">Play Game</NavLink>
        </div>
      </nav>

        {/* Envelope & Form */}
        <div className={`envelope ${isFormOpen ? "open" : ""}`} onClick={toggleForm}>
                <div className="flap">{isFormOpen ? "↓" : "Open"}</div>
            </div>
            {isFormOpen && (
                <div className="form-container">
                    {/* Contact Form */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" required />
                        <input type="tel" name="phone" placeholder="Phone" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="text" name="subject" placeholder="Subject" required />
                        <textarea name="message" placeholder="Message" required></textarea>
                        <button type="submit">Send Mail</button>
                    </form>
                </div>
            )}
        </div>
        </div>
    );
}
export default Contact;