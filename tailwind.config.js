/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        UniBg: "url('./src/assets/FondoLogi.svg')",
      },
      colors: {
        primary: {
          DEFAULT: "#490000",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#490000",
          700: "#3a0000",
          800: "#2d0000",
          900: "#1c0000",
        },
        secondary: {
          DEFAULT: "#6b0f1a",
          light: "#841225",
        },
        background: {
          DEFAULT: "#ffffff",
          dark: "#1a0000",
          card: "#f8fafc",
        },
        text: {
          DEFAULT: "#1e293b",
          light: "#64748b",
          dark: "#0f172a",
        },
      },
    },
  },
  plugins: [],
});
