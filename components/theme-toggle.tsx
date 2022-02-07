import React, { useEffect, useState } from "react";
import { UilMoon, UilSun } from "@iconscout/react-unicons";

import { motion } from "framer-motion";
import { useThemeStore } from "../store";

interface ThemeToggleProps {
  isHidden?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isHidden }) => {
  const { theme, checkTheme, setTheme } = useThemeStore((state) => ({
    theme: state.theme,
    checkTheme: state.checkTheme,
    setTheme: state.setTheme,
  }));

  useEffect(() => {
    setTheme(checkTheme());
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light");
      });
  }, [setTheme, checkTheme]);

  return (
    <>
      {isHidden ? (
        <></>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 alternate"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <UilMoon /> : <UilSun />}
        </motion.button>
      )}
    </>
  );
};

ThemeToggle.defaultProps = {
  isHidden: false,
};

export default ThemeToggle;
