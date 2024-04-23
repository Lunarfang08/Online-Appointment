require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json()); // Use express's built-in body-parser

// Connect to MongoDB
mongoose.connect("mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define a simple schema for contact
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  subject: String,
  message: String,
});

// Create a model
const Contact = mongoose.model('Contact', contactSchema);

// Define POST route for contact form submission
app.post('/api/contact', async (req, res) => {
    console.log(req.body); 
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Set up the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
