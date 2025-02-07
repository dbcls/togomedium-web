/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8FC31F",
        "primary-dark": "#6FA80C",
      },
      fontFamily: {
        wide: ["Fira Sans", "sans-serif"],
        narrow: ["Fira Sans Condensed", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
