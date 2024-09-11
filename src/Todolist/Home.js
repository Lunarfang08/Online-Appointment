// // src/Todolist/Home.js
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addItem, deleteItem, updateItem, toggleItem } from './todoSlice';
// import './Home.scss';

// const Home = () => {
//   const [newItem, setNewItem] = useState('');
//   const [editItem, setEditItem] = useState(null);
//   const [editText, setEditText] = useState('');
//   const dispatch = useDispatch();
//   const items = useSelector((state) => state.todos.items);

//   const handleAddItem = () => {
//     if (newItem.trim()) {
//       dispatch(addItem(newItem));
//       setNewItem('');
//     }
//   };

//   const handleDeleteItem = (id) => {
//     dispatch(deleteItem(id));
//   };

//   const handleEditClick = (item) => {
//     setEditItem(item);
//     setEditText(item.text);
//   };

//   const handleUpdateItem = () => {
//     if (editText.trim() && editItem) {
//       dispatch(updateItem({ id: editItem.id, text: editText }));
//       setEditItem(null);
//       setEditText('');
//     }
//   };

//   const handleToggleItem = (id) => {
//     dispatch(toggleItem(id));
//   };

//   return (
//     <div className="home-container">
//       <h1>Todo List by Arsal</h1>
//       <div className="todo-list">
//         {items.length === 0 ? (
//           <p>No items to display</p>
//         ) : (
//           <ul>
//             {items.map((item) => (
//               <li key={item.id} className={item.completed ? 'completed' : ''}>
//                 <span onClick={() => handleToggleItem(item.id)} className="todo-text">
//                   {item.text}
//                 </span>
//                 <button onClick={() => handleEditClick(item)}>Edit</button>
//                 <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="add-item">
//         <input
//           type="text"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder="Add new item"
//         />
//         <button onClick={handleAddItem}>Add Item</button>
//       </div>
//       {editItem && (
//         <div className="edit-item">
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             placeholder="Edit item"
//           />
//           <button onClick={handleUpdateItem}>Update Item</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;






// BACKEND
// src/Todolist/Home.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo, toggleTodo } from './todoSlice';
import './Home.scss';

const Home = () => {
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState('');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      dispatch(addTodo(newItem.trim())); // Send the string directly
      setNewItem('');
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditText(item.text);
  };

  const handleUpdateItem = () => {
    if (editText.trim() && editItem) {
      dispatch(updateTodo({
        id: editItem._id,
        text: editText.trim()
      }));
      setEditItem(null);
      setEditText('');
    }
  };

  const handleToggleItem = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <div className="todo-list">
        {items.length === 0 ? (
          <p>No items to display</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id} className={item.completed ? 'completed' : ''}>
                <span onClick={() => handleToggleItem(item._id)} className="todo-text">
                  {item.text}
                </span>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      {editItem && (
        <div className="edit-item">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleUpdateItem}>Update</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Home;
