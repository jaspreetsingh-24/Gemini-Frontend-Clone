import { create } from "zustand";

type Theme = "light" | "dark";

interface UiState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: ((): Theme => {
    // Try localStorage first
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;

    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  })(),

  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  },

  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(newTheme);
  },
}));
