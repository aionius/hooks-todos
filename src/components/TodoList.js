import React, { useContext } from "react";
import TodoContext from "../context";
import axios from "axios";

export default function TodoList() {
  const { state, dispatch } = useContext(TodoContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
            key={todo.id}
          >
            <span
              className={`flex-1 ml-12 cursor-pointers ${todo.complete &&
                "line-through text-grey-darkest"}`}
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `http://localhost:3000/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: "TOGGLE_TODO", payload: response.data });
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button
              onClick={() => {
                axios.delete(`http://localhost:3000/todos/${todo.id}`);
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
