import React, { useEffect, useState } from 'react';
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState('all');


  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const editTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const localTodo = JSON.parse(localStorage.getItem('todos'))

    if (localTodo && localTodo.length > 0) {

      setTodos(localTodo);
    }


  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])



  return (
    <TodoProvider value={{ todos, addTodo, editTodo, deleteTodo, toggleTodo }}>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">📝 Todo List</h1>
          <TodoForm />

          <div className="flex justify-evenly  gap-4 mt-6 border-b border-gray-600">
            <button
              className={`py-2 px-4 font-semibold ${activeTab === 'all'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('all')}
            >
              All Todos
            </button>
            <button
              className={`py-2 px-4 font-semibold ${activeTab === 'incomplete'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('incomplete')}
            >
              Incomplete Todos
            </button>
            <button
              className={`py-2 px-4 font-semibold ${activeTab === 'completed'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Todos
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'all' && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {todos.length > 0 ? (
                  todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                ) : (
                  <p className="text-center text-gray-400">No todos yet. Add one! ✨</p>
                )}
              </div>
            )}

            {activeTab === 'incomplete' && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {todos.length > 0 ? (
                  todos
                    .filter((todo) => todo.completed === false)
                    .map((todo) => <TodoItem key={todo.id} todo={todo} />)
                ) : (
                  <p className="text-center text-gray-400">No incomplete todos. 🎉</p>
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {todos.length > 0 ? (
                  todos.filter((todo) => todo.completed === true)
                    .map((todo) => <TodoItem key={todo.id} todo={todo} />)
                ) : (
                  <p className="text-center text-gray-400">No completed todos yet. 🏳️</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;