import React, { useState } from "react";
import useTodo from "../contexts/TodoContext";

const TodoItem = ({ todo }) => {
  // Access functions from the context to manage todos
  const { deleteTodo, editTodo, toggleTodo } = useTodo();

  // State to manage whether the todo is in edit mode
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  // State to store the current todo message (used during editing)
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  // Function to toggle the completion status of the todo
  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  // Function to update the todo message and exit edit mode
  const updateTodo = () => {
    editTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex items-center py-2 rounded-lg shadow-sm transition-all duration-200 ${
        todo.completed ? "bg-[#2d4a3e]" : "bg-[#1e293b]"
      }`}
    >
      {/* Checkbox to toggle completion status */}
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-blue-500"
          checked={todo.completed}
          onChange={toggleCompleted}
        />

        {/* Input field for editing the todo */}
        {isTodoEditable ? (
          <input
            type="text"
            className={`w-full bg-transparent outline-none text-white border-b border-blue-500 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
          />
        ) : (
          // Display the todo message
          <div
            className={`w-full break-words bg-transparent text-white ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todoMsg}
          </div>
        )}
      </div>

      {/* Buttons for editing and deleting the todo */}
      <div className="flex md:flex-row sm:text-base text-sm flex-col md:gap-2 gap-0 shadow-lg">
        <button
          className={`p-2 rounded-lg text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer ${
            todo.completed ? "opacity-50 cursor-not-allowed" : ""
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
          {isTodoEditable ? "💾 Save" : "✏️ Edit"}
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