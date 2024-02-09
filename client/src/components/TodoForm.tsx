import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { TodoItemResult } from "../models/Todo";

import { addTodo } from "../services/todo.service";

import { useTodoContext } from "../hooks/useTodoContext";

function TodoForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");

  const { dispatch } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (text === "") {
      inputRef.current?.focus();
    }
  }, [text]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);

    const result: TodoItemResult = await addTodo(text);

    if (result.success && result.data) {
      dispatch({ type: "CREATE_TODO", payload: result.data });
      setText("");
      setError(null);
    } else {
      console.log("result.success:", result.success);
      console.log("result.data:", result.data);

      setError(result.error ?? "There was a problem creating the todo");
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add a new todo"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Add todo
      </button>
      {isLoading && <p>Adding...</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TodoForm;
