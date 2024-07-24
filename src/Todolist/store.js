// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../Todolist/todoSlice'; // Adjust path if needed

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
