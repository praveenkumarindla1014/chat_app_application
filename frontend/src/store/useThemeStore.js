import { create } from "zustand";

const THEMES = [
  "chatdark",
  "dark",
  "light",
  "night",
  "dracula",
  "dim",
  "luxury",
  "synthwave",
];

function getSavedTheme() {
  const saved = localStorage.getItem("chat-theme");
  if (saved && THEMES.includes(saved)) return saved;
  return "chatdark";
}

export const useThemeStore = create((set) => ({
  theme: getSavedTheme(),
  themes: THEMES,
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));