/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'tablet': '640px',

      'laptop': '1024px',
    
      'desktop': '1280px'
    },
    extend: {},
  },
  plugins: [],
}
