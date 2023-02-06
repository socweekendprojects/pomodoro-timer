/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ligth theme
        light: {
          primary: "#A42324",
          secondary: "#38858A",
          tertiary: "#FCD431",
          hot: "#F6593D",
          text: "#3A373C",
        },
      },
    },
  },
  plugins: [],
};
