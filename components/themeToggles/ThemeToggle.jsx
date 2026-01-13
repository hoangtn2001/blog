"use client";
import Image from "next/image";
import styles from "./ThemeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { container, ball } = styles;
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div
      className={container}
      onClick={toggle}
      style={
        theme === "dark" ? { background: "#0f172a" } : { background: "white" }
      }
    >
      <Image src="/images/sun.png" alt="" width={14} height={14} />
      <div
        className={ball}
        style={
          theme === "dark"
            ? { left: "1px", background: "white" }
            : { right: "1px", background: "#0f172a" }
        }
      ></div>
      <Image src="/images/moon.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
