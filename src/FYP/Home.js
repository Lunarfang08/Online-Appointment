import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you have Bootstrap CSS imported

const Home = () => {
  // Inline styles
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
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    brand: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    carouselContent: {
      height: "400px",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
  };
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">NumBuddy</span>
        <button className="navbar-toggler" onClick={handleNavCollapse}>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>
        <div className={"nav-menu " + (isNavCollapsed ? "collapsed" : "")}>
          <NavLink to="/" exact className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/contact" className="nav-link" activeClassName="active">
            Contact Us
          </NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">
            About
          </NavLink>
          <NavLink
            to="/play-game"
            className="nav-link"
            activeClassName="active"
          >
            Play Game
          </NavLink>
        </div>
      </nav>

      {/* Parallax Section with Carousel */}
      <div className="parallax">
        <Carousel indicators={false} controls={false} interval={2500}>
          <Carousel.Item>
            <div style={styles.carouselContent}>
              <h2>Understanding Dyscalculia</h2>
              <p>
                Dyscalculia is a learning difficulty that affects numerical and
                mathematical ability.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={styles.carouselContent}>
              <h2>Personalized Learning</h2>
              <p>We provide resources tailored to individual learning needs.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div style={styles.carouselContent}>
              <h2>Engaging Activities</h2>
              <p>
                Explore games and exercises designed to enhance mathematical
                understanding.
              </p>
            </div>
          </Carousel.Item>
          {/* ... more carousel items ... */}
        </Carousel>
      </div>

      {/* Learning Topics Section */}
       

      <div class="gallery-section">
  <h2 class="gallery-section-header">Insights to Acquire</h2>
  <div class="image-grid">
    <div class="image">
      <img src="https://static7.depositphotos.com/1003625/752/i/950/depositphotos_7529921-stock-photo-math-symbols.jpg" alt="Image 1"/>
      <h3>Dragon box game</h3>
      <p>Arithmetical operations game with difficulty of your own choice</p>
    </div>
    <div class="image">
      <img src="https://static6.depositphotos.com/1003625/592/i/950/depositphotos_5927449-stock-photo-numbers-on-blackboard.jpg" alt="Image 2"/>
      <h3>Memory match game</h3>
      <p>Flip cards to find matching pairs and challenge your memory!</p>
    </div>
    <div class="image">
      <img src="https://st3.depositphotos.com/12982378/31758/i/450/depositphotos_317588272-stock-photo-high-angle-view-painted-labyrinth.jpg" alt="Image 3"/>
      <h3>Logic Maze</h3>
      <p> Solve questions to navigate through maze and reach the destination!</p>
    </div>
  </div>
</div>






      {/* New Section - Step-by-Step Explanations */}
      <div className="feature-section">
        <div className="feature-text">
          <h2>Get step-by-step explanations</h2>
          <p>
            See how to solve problems and show your work—plus get definitions
            for mathematical concepts.
          </p>
        </div>
        <div className="feature-image">
          {/* Placeholder for feature image, replace with actual image */}
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/56/04/65/1000_F_56046519_FjW7vyqBaND63QepQL51PNQNkMJNOOyU.jpg"
            alt="Step-by-Step Explanation"
          />
        </div>
      </div>

      {/* New Section - Graph Problems */}
      <div className="feature-section">
        <div className="feature-text">
          <h2>Learn and adapt quickly by solving Problems</h2>
          <p>
            Instantly graph any equation to visualize your function and
            understand the relationship between variables.
          </p>
        </div>
        <div className="feature-image">
          {/* Placeholder for feature image, replace with actual image */}
          <img
            src="https://www.speld.org.nz/wp-content/uploads/2018/02/what-is-dyscalculia.jpg"
            alt="Graph Problem"
          />
        </div>
      </div>

      {/* New Section - Practice */}
      <div className="feature-section">
        <div className="feature-text">
          <h2>Discover the world of Maths</h2>
          <p>
            Search for additional learning materials, such as related worksheets
            and video tutorials.
          </p>
        </div>
        <div className="feature-image">
          {/* Placeholder for feature image, replace with actual image */}
          <img
            src="https://as1.ftcdn.net/v2/jpg/05/63/80/20/1000_F_563802086_0GD6ZegkfMzXsdd217wHk7MCegcUPlK5.jpg"
            alt="Practice Material"
          />
        </div>
      </div>

      <section className="dyscalculia-friendly-section">
        <div className="container">
          <h2>Tools for Dyscalculia</h2>
          <p>Explore our resources designed for easy and effective learning.</p>
          <div className="tools-grid">
            <div className="tool-card">
              <div className="icon-holder">
                {/* Replace with actual SVG or image */}
                <img
                  src="https://img.freepik.com/free-vector/math-background_23-2148146941.jpg?w=996&t=st=1703338447~exp=1703339047~hmac=8809bdf9c53346b51e4114ff267842cd145a5018b3219234c4f067f540ada7b0"
                  alt="Visual Aids"
                />
              </div>
              <h3>Visual Aids</h3>
              <p>Use diagrams and visual steps to understand math concepts.</p>
              {/* Use the Link component to specify the navigation */}
              <Link to="/play-game" className="btn">
                Learn More
              </Link>
            </div>
            <div className="tool-card">
              <div className="icon-holder">
                {/* Replace with actual SVG or image */}
                <img
                  src="https://www.impactbnd.com/hs-fs/hubfs/examples-of-seriously-cool-interactive-tools-calculators.jpg?length=1200&name=examples-of-seriously-cool-interactive-tools-calculators.jpg"
                  alt="Interactive Tools"
                />
              </div>
              <h3>Interactive Tools</h3>
              <p>Interactive tools to practice math at your own pace.</p>
              {/* Use the Link component to specify the navigation */}
              <Link to="/play-game" className="btn">
                Try It Out
              </Link>
            </div>
            <div className="tool-card">
              <div className="icon-holder">
                {/* Replace with actual SVG or image */}
                <img
                  src="https://schoolsweek.co.uk/wp-content/uploads/2021/12/Maths-feat.jpg"
                  alt="Custom Exercises"
                />
              </div>
              <h3>Custom Exercises</h3>
              <p>Customized exercises that adapt to your learning style.</p>
              {/* Use the Link component to specify the navigation */}
              <Link to="/play-game" className="btn">
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>
            Dedicated to empowering individuals with dyscalculia through
            innovative learning tools and resources.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/Lunarfang08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://editor.analyticsvidhya.com/uploads/765900ba9-article-200807-github-gitguardbody-text.jpg"
                alt="GitHub"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/arsaladnan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEUMZMX///8AYcQAWcFDf8nL3PIAWrzQ3vMAYcI0eclZjtAucslAgsz6/v3x9/sgbclOhM8AX8QAYsAAX70AV70AWMLm7vgAXb4sdsw5fsoRbsVmltK6z+iUt+AMZcGDrN3c6fNvnddiltWqwuPA0+r0+vyOrt+lweR9pduuyueUst9Lh81pldd1mtYdbcunxOXO4u7Z4fGRyVlRAAAEKUlEQVR4nO3ce1faMBzG8SblEpSCiUUuQrkMhsCc+v7f3Ko4KjW/yLY0WXOez9mf4Ml3vSW1NYoAAAAAAAAAAAAAAAAAAAAAAAAAAADgYiriIsqU72FURcapGnXHk5aMue+xVCCT6n56x960Z2OpMt8jsozz+Xve0Xqc+h6SXbKzYOeSfex7UBap+J591lThHI3awPxw5KGcVFUj0RayaRrI6UaUj8GTpfA9NivknApkvTC2YdwjC9lc+h6dBWpFB7JFCIXx1FDIRr6HZ0Fq2EkZewjgXNMnLhVH34a+x/fPeMdYOK3/gchvTIFsXf/ZKR+bC+u/DcW1cS/d1f84jFobU+H3ANYXadNU2PU9PAvkd0Ngz/forMgMhU/1P5Xm4h0ZmHQCOAzz68WEPNdsg9iE+ZH4QATeBTApPYqf9PvoKIh99E2qOxQ3jVvf47JHDT5fMl5GAQW+3tNvnF/4N3shwrhJc8Ljw/Q0Q13MJ4GcRc8IORjP99vZfpWlQe2gH3EZx7Gs/4IJAADqQ3DJX/+FM38vqHyKlA5Hhx+Pj49X43468P34CheEiz9Z+pTMlrvFaQ6YbNrblRpKf6vNbHRNKX2yT/kwSVd5XluzGGs//Ew9NfIGS/RYs3X2yUGzp7dpnMYu+zPql1mbp46f+XxeSCkVxrpt8+bmWJgJOTPeYP7m5QkWi4Wye0d94t3m3sNmtFao5OyLvle7zPnRaKlQCb6+IDBfXvddJ1oq5BH5WE7JXd/xwWilUKnJpYGM9a7dPk5mpfCWP18cmO+okdOtaKVwYHxm5ZP1wOWNPBuFneUfBTK2dHkzyEbhwfirco3NxOF+aqPw8rPMbzuHV34bhX+h4e6q6KnQ4ZM6ngrZyNlG9FXo7hfMvgp7zt7o8FXIDq52U2+FznbTKgovmgAsalq4mB0mQqjJYfvler98o6sWhevuYPh2C5jz4WD1ReMPR4soi4W91dmtXy7MK469o7mpvcLn8nRaSWPi9PzH/++FCXvW3LuXpoXxi6MllK1tqHtGLBMd0zccLYNtFR60W8T0wkqv7yTQVuGTfpfLuvRXkms3sxo7hQlx/yy7NayOO3Uq3MXExY148PFY6OZyYafwihqsXNJfGteoMCGXQoYfzxo1KmxSO2kkJvTLcXUq3BreraFnp3UqNLwT3aJPpnUqPNBjTV+CKDScFVv0t+pUaLiytegXq1BoCQoLKNRDYfVQWEChHgqrh8ICCvVQWD0UFlCoh8LqobCAQj0UVg+FBRTqobB6KCygUA+F1UNhAYV6KKweCgso1ENh9VBYQKEeCquHwkKAhe1SIf2UoaFwSP+/dB29FtTvUsbnH+Q3VxTDmxOq+zffskqJiOtFpZda+OV/M6uQKepLof0NWAAAAAAAAAAAAAAAAAAAAAAAAAAAgAr8Aj5RWY0PDbn2AAAAAElFTkSuQmCC"
                alt="LinkedIn"
              />
            </a>
            <a href="arsaladnan07@gmail.com">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAfCAMAAACF8f6iAAAA3lBMVEX////qQzU0qFNChfTFIh77vASCqffO5tM7gvQeo0UlpEkse/P7/P+o1LL8vwDziiLpPDbCAADpLRnpMiDpOirkqqnVdHPcjoz56un85bz8z3T80Xz97tTKQD3EFQ/sxMP7ymL7tgD83qjioaDzqKT99vn1nUHUbGnwiYL+68vNeoTtaF/51NHo6c6Tn+HKAADrTUD1trLYtADC5dVlbs76397yl5JVfeTEJCfud3DGtSwTp1a5MUmpsjiqQ26ErkKUUpJkr0nxWVKgxKHD1ftxn/bl8ugAnzjg6f22zPpGNLq5AAABIUlEQVQ4jdXS206DQBAG4BkoSktRd1kVT1TUekQp1XpCrfaEvv8LuSwQoU0WypX97/ZPvkyyMwCrm+2dXXuh3Ns/OCxxR8QhpDNXHrua5p5I3Slp8JCzfNc91+K4UnjhxLBBL/8qe2tzQ8ArGbxOIFo3WePRDN7K4J2fQGS9rigCiins38vg2oPvCIiMDfj7kWIK+811KdSfnh0BEWkHXixM4WtYBlX1jSQQrR7DFL6HSjlUP3zMh8NhqFSB+ictwi/uqkBVD3KSjcYtpSI0wLMyxzdqVodtsJElX8tvaCkIMIolDWBpGC+RelAD8rMZQC0IybnWgLACsFhWgRMjvrhpsZxFAsocH2nohtqeK82o1YykA3m+fyaL5cw0S9h/zi/FhRnJ9oDOrAAAAABJRU5ErkJggg=="
                alt="Email"
              />
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
