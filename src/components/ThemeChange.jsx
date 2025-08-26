import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeChange = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 shadow-sm ${
        theme === "dark" ? "btn-light" : "btn-dark"
      }`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <>
          <i className="fa-solid fa-moon"></i>
          <span>Açık Mod</span>
        </>
      ) : (
        <>
          <i className="fa-solid fa-sun"></i>
          <span>Karanlık Mod</span>
        </>
      )}
    </button>
  );
};

export default ThemeChange;
