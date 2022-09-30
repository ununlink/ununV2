import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";
  
    useEffect(() => {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    return (
      <button
        aria-label={`Change to ${inactiveTheme} mode`}
        title={`Change to ${inactiveTheme} mode`}
        type="button"
        onClick={() => setActiveTheme(inactiveTheme)}
      >
        ⬤
      </button>
    );
  };
  
  // export default ThemeToggle;

         