import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // To access passed state
import './Receipt.css'; // Import the CSS file
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation

const Receipt = () => {
  const location = useLocation(); // Get form data from Book.js
  const navigate = useNavigate(); // For navigation

  const { name, email, phone, appointmentDate, appointmentTime, doctor } = location.state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment Receipt", 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text(`Appointment Date: ${appointmentDate}`, 10, 50);
    doc.text(`Appointment Time: ${appointmentTime}`, 10, 60);
    doc.text(`Doctor: ${doctor}`, 10, 70);
    doc.save("appointment_receipt.pdf");
  };

  return (
    <div className="receipt-container">
      <h1 className="receipt-title">Appointment Receipt</h1>
      <div className="receipt-content">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Appointment Date:</strong> {appointmentDate}</p>
        <p><strong>Appointment Time:</strong> {appointmentTime}</p>
        <p><strong>Doctor:</strong> {doctor}</p>
      </div>
      <button className="btn download-btn" onClick={downloadPDF}>Download PDF</button>
      <button className="btn back-btn" onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default Receipt;
