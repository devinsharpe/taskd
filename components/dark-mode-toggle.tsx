import React, { useEffect, useState } from "react";
import { UilMoon, UilSun } from "@iconscout/react-unicons";

import { motion } from "framer-motion";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("taskd-theme");
    if (storedTheme) {
      if (storedTheme === "dark") {
        setIsDark(true);
      }
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIsDark(true);
        window.document.querySelector("html")!.classList.add("dark");
      }
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        localStorage.setItem("taskd-theme", e.matches ? "dark" : "light");
        setIsDark(e.matches);
      });
  }, []);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("taskd-theme", "dark");
      window.document.querySelector("html")!.classList.add("dark");
    } else {
      localStorage.setItem("taskd-theme", "light");
      window.document.querySelector("html")!.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 alternate"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <UilMoon /> : <UilSun />}
    </motion.button>
  );
};

export default DarkModeToggle;
