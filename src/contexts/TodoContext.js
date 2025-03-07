import { useContext, createContext } from "react";

// Create a context for todos with default values
export const TodoContext = createContext({
  todos: [], // List of todos
  addTodo: (todo) => {}, // Function to add a todo
  editTodo: (id, todo) => {}, // Function to edit a todo
  deleteTodo: (id) => {}, // Function to delete a todo
  toggleTodo: (id) => {}, // Function to toggle todo completion status
});

// Provider component to wrap the app and provide the context
export const TodoProvider = TodoContext.Provider;

// Custom hook to easily access the todo context
export default function useTodo() {
  return useContext(TodoContext);
}