import { useState, KeyboardEvent } from "react";

import { TodoItemResult, TodoType } from "../models/Todo";

import { deleteTodo, updateTodo } from "../services/todo.service";

import { useTodoContext } from "../hooks/useTodoContext";

type TodoItemProps = {
  todo: TodoType;
};

function TodoItem({ todo }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<TodoType["text"]>(todo.text);
  const [originalText, setOriginalText] = useState<TodoType["text"]>(todo.text);

  const { dispatch } = useTodoContext();

  // console.log("todo", todo);

  const date = new Date(todo.createdAt || new Date());
  const formattedDate = date.toLocaleString();

  const handleDelete = async (id: string): Promise<void> => {
    setIsLoading(true);

    const result: TodoItemResult = await deleteTodo(id);

    if (result.success) {
      dispatch({ type: "DELETE_TODO", payload: { _id: id } });
      setError(null);
    } else {
      setError(result.error ?? null);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, newText: string): Promise<void> => {
    setIsLoading(true);

    const result: TodoItemResult = await updateTodo(id, newText);

    if (result.success) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { _id: id, text: newText, isCompleted: false },
      });
      setError(null);
    } else {
      setError(result.error ?? null);
    }

    setIsLoading(false);
  };

  const handleEdit = async () => {
    if (isEditing && todo._id) {
      try {
        await handleUpdate(todo._id, editText);
        setOriginalText(editText);
      } catch (error) {
        console.error("Failed to update todo:", error);

        setEditText(originalText);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditText(originalText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEdit();
    } else if (event.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="todo-item">
      {error && <p className="error">{error}</p>}
      <div className="details">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h1>todo: {todo.text}</h1>
        )}
        <p>id: {todo._id}</p>
        <p>created at: {formattedDate}</p>
      </div>
      <button
        className="delete-btn"
        onClick={() => {
          if (todo._id !== undefined) handleDelete(todo._id);
        }}
        disabled={isLoading}
      >
        X
      </button>
      {isEditing ? (
        <>
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Update</button>
      )}
    </div>
  );
}

export default TodoItem;
