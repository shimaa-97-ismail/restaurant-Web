import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { lightTheme ,darkTheme} from './../../theme';
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "../../styles/GlobalStyle";
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // document.body.className = theme === "dark" ? "dark-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const themeObject = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
     <StyledThemeProvider theme={themeObject}>
         <GlobalStyle /> 
        {children}
        </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
