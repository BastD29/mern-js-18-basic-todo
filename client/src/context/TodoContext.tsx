import { FC, ReactNode, createContext, useReducer } from "react";

import { TodoAction, TodoContextType, TodosState } from "../models/Todo";

export const TodoContext = createContext<TodoContextType | null>(null);

const initialState: TodosState = {
  todos: null,
};

export const todosReducer = (
  state: TodosState,
  action: TodoAction
): TodosState => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...(state.todos || [])],
      };
    case "UPDATE_TODO":
      return {
        todos:
          state.todos?.map((todo) =>
            todo._id === action.payload._id ? action.payload : todo
          ) || null,
      };
    case "DELETE_TODO":
      return {
        todos:
          state.todos?.filter((todo) => todo._id !== action.payload._id) ||
          null,
      };
    default:
      return state;
  }
};

export type TodoContextProviderProps = {
  children: ReactNode;
};

export const TodoContextProvider: FC<TodoContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
