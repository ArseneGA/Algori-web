/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'dark': {
          DEFAULT: '#000000',
          secondary: '#1a1a1a',
        },
        'gray': {
          '0': '#ffffff'
        }
      },
      textColor: {
        'dark': {
          DEFAULT: '#ffffff',
          secondary: '#a0a0a0',
        }
      }
    },
  },
  plugins: [],
};
