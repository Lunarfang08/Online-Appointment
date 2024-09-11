// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');  // To allow requests from your frontend

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Allow cross-origin requests

// // MongoDB connection
// mongoose.connect('mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/todolist', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Define Todo model
// const TodoSchema = new mongoose.Schema({
//   text: { type: String, required: true },
// });

// const Todo = mongoose.model('Todo', TodoSchema);

// // Routes
// app.post('/todos', async (req, res) => {
//   try {
//     // Check if the text field is present
//     if (!req.body.text) {
//       return res.status(400).send('Text field is required');
//     }

//     const newTodo = new Todo({
//       text: req.body.text,
//     });

//     await newTodo.save();
//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.error('Error saving todo:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Additional route to get todos (for testing and future expansion)
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.status(200).json(todos);
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));



// FOR BACKEND
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // To allow requests from your frontend

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests

// MongoDB connection
mongoose.connect('mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define Todo model
const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Routes
// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body; // Destructure text from req.body
    if (!text) {
      return res.status(400).send('Text field is required');
    }

    const newTodo = new Todo({
      text: text, // Use the destructured text
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error saving todo:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).send('Text field is required');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.status(200).send('Todo deleted');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Toggle a todo's completion status
app.patch('/todos/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).send('Todo not found');
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
