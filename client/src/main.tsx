import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TodoContextProvider } from "./context/TodoContext.tsx";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);
