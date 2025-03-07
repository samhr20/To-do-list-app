import React, { useState } from "react";
import useTodo from "../contexts/TodoContext";

const TodoForm = () => {
  // State to manage the input value for a new todo
  const [todo, setTodo] = useState("");

  // Access the addTodo function from the context
  const { addTodo } = useTodo();

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // If the input is empty, return early
    if (!todo) return;

    // Add the new todo to the list
    addTodo({ id: Date.now(), todo, completed: false });
    setTodo(""); // Clear the input field
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-5 mb-6"
    >
      {/* Input field for the todo */}
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-600 rounded-lg px-4 py-2 outline-none bg-[#1e293b] text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* Button to submit the form */}
      <button
        type="submit"
        className="rounded-lg sm:static fixed z-20 bottom-5 right-5 cursor-pointer px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;