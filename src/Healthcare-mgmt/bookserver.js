const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
mongoose.connect('mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/healthcareDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  doctor: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Routes
app.post('/api/book', async (req, res) => {
  const { name, email, phone, appointmentDate, appointmentTime, doctor } = req.body;

  try {
    // Create a new appointment
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      doctor,
    });

    // Save appointment to the database
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment.' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Healthcare Appointment API is running.');
});

// Server listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
