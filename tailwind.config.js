/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/TS/JSX/TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d7c9ff',
          DEFAULT: '#8b5cf6',
          dark: '#1b0c33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add a modern font
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add forms plugin for better styling
    require('@tailwindcss/typography'), // Add typography plugin for rich text
  ],
}

