import { useEffect, useState } from "react";

import TodoItem from "./TodoItem";

import { TodoResult } from "../models/Todo";

import { getTodos } from "../services/todo.service";

import { useTodoContext } from "../hooks/useTodoContext";

function TodoList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    state: { todos },
    dispatch,
  } = useTodoContext();

  console.log("todos", todos);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const result: TodoResult = await getTodos();

      if (result.success && result.data) {
        dispatch({ type: "SET_TODOS", payload: result.data });
      } else {
        setError(result.error ?? null);
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  if (isLoading) return <p>Loading todos...</p>;

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="todo-list">
      {todos?.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
