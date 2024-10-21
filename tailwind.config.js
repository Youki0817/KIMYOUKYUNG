/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': {
          light: '#FF8F8F',
          DEFAULT: '#FF6363',
          dark: '#C63C3C',
        }
      },
    },
  },
  plugins: [],
}

