// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// // Load initial state from session storage
// const loadState = () => {
//   try {
//     const serializedState = sessionStorage.getItem('todos');
//     if (serializedState === null) {
//       return [
//         { id: nanoid(), text: 'Sample Item 1', completed: false },
//         { id: nanoid(), text: 'Sample Item 2', completed: false }
//       ];
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return [
//       { id: nanoid(), text: 'Sample Item 1', completed: false },
//       { id: nanoid(), text: 'Sample Item 2', completed: false }
//     ];
//   }
// };

// // Save state to session storage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     sessionStorage.setItem('todos', serializedState);
//   } catch (err) {
//     console.error('Could not save state', err);
//   }
// };

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState: {
//     items: loadState()
//   },
//   reducers: {
//     addItem(state, action) {
//       state.items.push({ id: nanoid(), text: action.payload, completed: false });
//       saveState(state.items);
//     },
//     deleteItem(state, action) {
//       state.items = state.items.filter(item => item.id !== action.payload);
//       saveState(state.items);
//     },
//     updateItem(state, action) {
//       const { id, text } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         existingItem.text = text;
//       }
//       saveState(state.items);
//     },
//     toggleItem(state, action) {
//       const existingItem = state.items.find(item => item.id === action.payload);
//       if (existingItem) {
//         existingItem.completed = !existingItem.completed;
//       }
//       saveState(state.items);
//     }
//   }
// });

// export const { addItem, deleteItem, updateItem, toggleItem } = todoSlice.actions;
// export default todoSlice.reducer;









// for backend
// src/Todolist/todoSlice.jsimport { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  items: [],
  status: 'idle',
  error: null
};

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:3000/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await axios.post('http://localhost:3000/todos', { text });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, text }) => {
  const response = await axios.put(`http://localhost:3000/todos/${id}`, { text });
  return response.data; // Ensure the updated item is returned
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
  return id;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
  const response = await axios.patch(`http://localhost:3000/todos/${id}/toggle`);
  return response.data;
});

// Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { _id, text } = action.payload; // Destructure the _id and text from the payload
        const index = state.items.findIndex(item => item._id === _id);
        if (index !== -1) {
          state.items[index].text = text; // Update the text of the existing item
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const existingItem = state.items.find(item => item._id === updatedItem._id);
        if (existingItem) {
          existingItem.completed = updatedItem.completed;
        }
      });
  }
});

export default todoSlice.reducer;