import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease forwards",
        "blob": "float-blob 10s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        chatdark: {
          "primary":           "#6366f1",
          "primary-content":   "#ffffff",
          "secondary":         "#8b5cf6",
          "secondary-content": "#ffffff",
          "accent":            "#38bdf8",
          "accent-content":    "#0c4a6e",
          "neutral":           "#1e293b",
          "neutral-content":   "#cbd5e1",
          "base-100":          "#0a0f1e",
          "base-200":          "#0d1526",
          "base-300":          "#111827",
          "base-content":      "#e2e8f0",
          "info":              "#38bdf8",
          "success":           "#10b981",
          "warning":           "#f59e0b",
          "error":             "#ef4444",
        },
      },
      "dark",
      "light",
      "night",
      "dracula",
      "dim",
      "luxury",
      "synthwave",
    ],
    defaultTheme: "chatdark",
  },
};