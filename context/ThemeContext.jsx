'use client'
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();


export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        setTheme(storedTheme);
    }
}, []);

const toggle = () =>{
    setTheme(theme === "light" ? "dark" : "light");
}
useEffect(() => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
}, [theme]);
    return (
        <ThemeContext.Provider value={{theme, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
};