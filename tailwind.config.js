/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        code: [
          "source-code-pro",
          "Menlo",
          "Monaco",
          "Consolas",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        primary: "#f7e1e1",
        darkWhite: "#e0e0e0", 
        // posible modo oscuro
        darkBackground: "#333333",
        darkText: "#f0f0f0",
        // posible modo oscuro
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
