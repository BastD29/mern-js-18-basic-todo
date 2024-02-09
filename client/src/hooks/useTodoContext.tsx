import { Context, useContext } from "react";

import { TodoContext } from "../context/TodoContext";

import { TodoContextType } from "../models/Todo";

export const useTodoContext = () => {
  const context = useContext(TodoContext as Context<TodoContextType | null>);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
};
