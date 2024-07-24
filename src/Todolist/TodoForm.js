import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = async () => {
    if (inputValue.trim()) {
      try {
        await axios.post('http://localhost:3000/todos', { text: inputValue });
        setInputValue(''); // Clear input after adding
      } catch (error) {
        console.error('Error adding TODO:', error);
      }
    }
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddClick}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
