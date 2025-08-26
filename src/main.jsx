import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </ThemeProvider>
);
