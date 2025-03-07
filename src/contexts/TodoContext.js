import { useContext , createContext } from "react";

export const TodoContext = createContext({
    todos : [] ,
    addTodo : (todo)=>{},
    editTodo : (id , todo)=>{},
    deleteTodo : (id)=>{},
    toggleTodo : (id)=>{},
})

export const TodoProvider = TodoContext.Provider

export default function useTodo(){
   return useContext(TodoContext)   
}