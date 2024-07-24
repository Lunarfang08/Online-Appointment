import React from 'react';
import { useDispatch } from 'react-redux';
import './TodoItem.scss';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    // Example action to toggle todo completion
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const handleDelete = () => {
    // Example action to delete a todo
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      </div>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
