import { NavLink } from "react-router-dom";
import './About.css'; 
import React, { useState } from "react";
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
  
const About = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="about-container">
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


      <section className="about-hero">
        <h1 className="about-title">Understanding Dyscalculia</h1>
        <p className="about-tagline">A journey into accessible learning and support for numerical challenges.</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>What is Dyscalculia?</h2>
          <p>Dyscalculia is a specific learning difficulty that affects a person's ability to understand numbers and learn math facts. It is akin to dyslexia for numbers. Our mission is to provide resources and tools to help those with Dyscalculia excel in learning.</p>
        </div>
        <div className="about-statistics">
          {/* Statistics could be animated counters that count up to a certain number when scrolled into view */}
          <div className="statistic">
            <h3>5%</h3>
            <p>of the population is estimated to have Dyscalculia.</p>
          </div>
          <div className="statistic">
            <h3>1 in 20</h3>
            <p>children struggle with some form of Dyscalculia.</p>
          </div>
          <div className="statistic">
            <h3>80%</h3>
            <p>improvement in comprehension with tailored learning approaches.</p>
          </div>
        </div>
      </section>
      
      {/* Other sections like 'Our Mission', 'Our Team', 'Testimonials' could be added similarly */}
      
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>To create a supportive community and develop engaging tools that empower individuals with Dyscalculia to achieve their full potential in mathematics and beyond.</p>
      </section>
      
      <section className="about-cta">

      <div className="loader">
      <div className="text">Loading...</div>
      <div className="spinner">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
      </div>
    </div>
    <div className="dyscalculia-container">
      <section className="dyscalculia-section">
        <h2 className="dyscalculia-title">Understanding Dyscalculia</h2>
        <p className="dyscalculia-text">
        Dyscalculia is a condition characterized by difficulties with math and numbers. Individuals with dyscalculia may struggle with basic arithmetic operations, understanding numerical concepts, and applying mathematical reasoning. This learning disorder can impact academic performance and everyday tasks that involve numbers, such as managing finances or telling time. Our mission is to increase awareness about dyscalculia and provide effective strategies and support to help individuals overcome challenges and succeed in mathematics.

        </p>
        <ul className="dyscalculia-characteristics">
          <li>Difficulty understanding and manipulating numbers</li>
          <li>Struggling with basic arithmetic operations</li>
          <li>Difficulty with concepts of time and money</li>
          <li>Challenges with spatial awareness and measurement</li>
        </ul>
      </section>
    </div>

  <h2>Join Our Community</h2>
  <a href="https://www.reddit.com/r/dyscalculia/" target="_blank" rel="noopener noreferrer">
    <button className="cta-button">Get Involved</button>
  </a>
</section>
    </div>
  );
};

export default About;
