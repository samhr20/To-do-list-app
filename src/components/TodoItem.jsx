import React, { useState } from 'react';
import useTodo from '../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const { deleteTodo, editTodo, toggleTodo } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  const updateTodo = () => {
    editTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-200 ${
        todo.completed ? 'bg-[#2d4a3e]' : 'bg-[#1e293b]'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-blue-500"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`w-full bg-transparent outline-none text-white ${
            isTodoEditable ? 'border-b border-blue-500' : 'border-transparent'
          } ${todo.completed ? 'line-through text-gray-400' : ''}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded-lg text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer ${
            todo.completed ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              updateTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? '💾 Save' : '✏️ Edit'}
        </button>
        <button
          className="p-2 rounded-lg text-white cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;