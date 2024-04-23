import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css';
import { Link } from 'react-router-dom';
const Sign = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/play-game');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/play-game');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-modal">
        <div className="form-wrapper">
          <form className="form">
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            {isSignUp && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="submit-btn" onClick={isSignUp ? handleSignUp : handleLogin} disabled={loading}>
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <div className="slider-container">
            <div className={isSignUp ? 'slider' : 'slider slide'} onClick={() => setIsSignUp(!isSignUp)}>
              <div className={isSignUp ? 'slider-button' : 'slider-button slide'}></div>
            </div>
            <span className='spn'>{isSignUp ? 'New User? Sign Up' : 'Already have an account? Login'}</span>
          </div>
        </div>
      </div>
      <Link to="/" className="back-to-home">
        Return
      </Link>
    </div>
  );
  
}

export default Sign;
