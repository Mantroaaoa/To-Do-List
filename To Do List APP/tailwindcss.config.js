/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pastikan Anda menambahkan 'class' di sini
  darkMode: 'class', 
  
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}