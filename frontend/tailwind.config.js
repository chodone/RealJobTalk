/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        intro: {
          from: { transform: "rotateY(0deg) scale(2.0)" },
          to: { transform: "rotateY(360deg) scale(1.0)" },
        },
      },
      animation: {
        intro: "intro 2s ease-in-out",
      },

    },
  },
  plugins: [require('tailwindcss-animated')],
}
