/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        'dark-secondary': '#1a1a1a',
        'button-dark': '#000000',
        'button-light': '#ffffff',
      },
    },
  },
  plugins: [],
};
