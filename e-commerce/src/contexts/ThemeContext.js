import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Store the NEW theme
      return newTheme; // Return the NEW theme to update state
    });
  };

  useEffect(() => {
    document.body.className = `app-${theme}`; // Apply theme to body class
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};