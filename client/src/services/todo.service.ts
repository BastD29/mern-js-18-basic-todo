import { BASE_URL, TODOS } from "../constants/urls";

import { TodoItemResult, TodoResult, TodoType } from "../models/Todo";

async function getTodos(): Promise<TodoResult> {
  try {
    const response = await fetch(`${BASE_URL}/${TODOS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const todos: TodoType[] = await response.json();
    return { success: true, data: todos };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      success: false,
      error: "Failed to fetch todos. Please try again.",
    };
  }
}

async function addTodo(text: string): Promise<TodoItemResult> {
  try {
    const response = await fetch(`${BASE_URL}/${TODOS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        isCompleted: false,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const todo: TodoType = await response.json();
    return { success: true, data: todo };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      success: false,
      error: "Failed to create todo. Please try again.",
    };
  }
}

async function updateTodo(id: string, text: string): Promise<TodoItemResult> {
  try {
    const response = await fetch(`${BASE_URL}/${TODOS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        isCompleted: false,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const updatedTodo: TodoType = await response.json();
    return { success: true, data: updatedTodo };
  } catch (error) {
    console.error("Error updating todo:", error);
    return {
      success: false,
      error: "Failed to update todo. Please try again.",
    };
  }
}

async function deleteTodo(id: string): Promise<TodoItemResult> {
  try {
    const response = await fetch(`${BASE_URL}/${TODOS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      error: "Failed to delete todo. Please try again.",
    };
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo };
