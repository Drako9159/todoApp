import { useState } from "react";
import Todo from "./todo";
import "./todoApp.css";


export default function TodoApp() {
  const [title, setTitle] = useState("lol"); //Se especifica en string vacio
  //primer valor es un getEr, segundo el setEr
  const [todos, setTodos] = useState([]);
  function handleClick(e) {
    e.preventDefault();
  }
  function handleChange(e) {
    const value = e.target.value; //Esto manda el evento a set
    setTitle(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(), //genera una id random
      title: title,
      completed: false,
    };
    //setTodos([...todos, newTodo]); //1ra forma
    const temp = [...todos]; //2da forma
    //unshift manda un elemento al inicio
    //push manda un elemento al final
    temp.unshift(newTodo);
    setTodos(temp);
    setTitle("");
  }
  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((e) => e.id === id);
    item.title = value;
    setTodos(temp);
  }
  function handleDelete(id) {
    const temp = todos.filter((e) => e.id !== id);
    setTodos(temp);
  }
  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input onChange={handleChange} className="todoInput" value={title} />
        <input
          onClick={handleSubmit}
          type="submit"
          value="Create todo"
          className="buttonCreate"
        />
      </form>
      <div className="todosContainer">
        {todos.map((e) => (
          <Todo
            key={e.id}
            item={e}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
