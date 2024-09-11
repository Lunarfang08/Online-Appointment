import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Book.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    doctor: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Define navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (/\d/.test(formData.name)) {
      newErrors.name = 'Name should not contain numbers.';
    }

    // Validate phone number
    if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should only contain digits.';
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate other fields
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required.';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required.';
    if (!formData.doctor) newErrors.doctor = 'Doctor selection is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop form submission if validation fails

    try {
      const response = await axios.post('http://localhost:5000/api/book', formData);
      navigate('/receipt', { state: formData }); // Pass formData to Receipt.js
    } catch (error) {
      setMessage('Failed to book appointment.');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close
  };

  return (
    <div className="appointment-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3656336_zcctflg10vp5lq513zlwjhv9yl6dmujqhvysf8t9_monogram-an-logo-design.jpg" alt="Logo" />
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/">Book Now</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/location">Location</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1>Book an Appointment</h1>
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
            {errors.appointmentDate && <p className="error">{errors.appointmentDate}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
            {errors.appointmentTime && <p className="error">{errors.appointmentTime}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="doctor">Select Doctor</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select a Doctor</option>
              <option value="Dr. John Doe -- Skin specialist">Dr. John Doe -- Skin specialist</option>
              <option value="Dr. Jane Smith -- Cardiology">Dr. Jane Smith -- Cardiology</option>
              <option value="Dr. Emily Brown -- Dentist">Dr. Emily Brown -- Dentist</option>
              <option value="Dr. Aisha -- Neurologist">Dr. Aisha -- Neurologist</option>
            </select>
            {errors.doctor && <p className="error">{errors.doctor}</p>}
          </div>

          <button type="submit" className="submit-btn">Book Appointment</button>
        </form>
        {message && <p>{message}</p>}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Healthcare Appointments. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/location">Location</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default BookAppointment;
