import { Dispatch } from "react";

export type TodoType = {
  id?: string;
  _id?: string;
  text: string;
  isCompleted: boolean;
  createdAt?: string;
};

export type TodoResult =
  | {
      success: true;
      data?: TodoType[];
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: string;
    };

export type TodoItemResult =
  | {
      success: true;
      data?: TodoType;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: string;
    };

export type TodosState = {
  todos: TodoType[] | null;
};

export type TodoAction =
  | { type: "SET_TODOS"; payload: TodoType[] }
  | { type: "CREATE_TODO"; payload: TodoType }
  | {
      type: "UPDATE_TODO";
      payload: { _id: string; text: string; isCompleted: boolean };
    }
  | { type: "DELETE_TODO"; payload: { _id: string } };

export type TodoContextType = {
  state: TodosState;
  dispatch: Dispatch<TodoAction>;
};
