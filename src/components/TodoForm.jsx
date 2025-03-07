import React, { useState } from 'react';
import useTodo from '../contexts/TodoContext';

const TodoForm = () => {
  const [todo, setTodo] = useState('');

  const { addTodo } = useTodo();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ id: Date.now(), todo, completed: false });
    setTodo('');
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-600 rounded-lg px-4 py-2 outline-none bg-[#1e293b] text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg cursor-pointer px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;