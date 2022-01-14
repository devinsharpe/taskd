import { GetState, SetState, State } from "zustand";

export interface ThemeState extends State {
  theme: string;
  checkTheme: () => "dark" | "light";
  setTheme: (themeString: "dark" | "light") => void;
  toggleTheme: () => "dark" | "light";
}

const ThemeStore = (set: SetState<ThemeState>, get: GetState<ThemeState>) => ({
  theme: "light",
  checkTheme: () => {
    if (typeof window !== undefined) {
      const storedTheme = localStorage.getItem("taskd-theme") as
        | "dark"
        | "light"
        | undefined;
      if (storedTheme) {
        return storedTheme;
      } else {
        return window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    }
    return "light";
  },
  setTheme: (themeString: "dark" | "light") => {
    set((state) => ({ ...state, theme: themeString }));
    if (typeof window !== "undefined") {
      localStorage.setItem("taskd-theme", themeString);
      if (themeString === "dark") {
        window.document.querySelector("html")!.classList.add("dark");
      } else {
        window.document.querySelector("html")!.classList.remove("dark");
      }
    }
  },
  toggleTheme: () => {
    const theme = get().checkTheme();
    get().setTheme(theme === "dark" ? "light" : "dark");
    return theme === "dark" ? "light" : "dark";
  },
});

export default ThemeStore;
