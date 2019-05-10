import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import TodosContext from "../context";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      const response = await axios.post(
        `http://localhost:3000/todos/${currentTodo.id}`,
        {
          text: todo
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const response = await axios.post("http://localhost:3000/todos", {
        id: uuid(),
        text: todo,
        complete: false
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  return (
    <form action="" className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
