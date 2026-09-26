import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Scheherazade New", "Amiri", "Traditional Arabic", "serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        cream: {
          50: "#fefdf8",
          100: "#fdf9ec",
          200: "#fbf3d5",
          300: "#f7e9b3",
        },
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        glow: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
