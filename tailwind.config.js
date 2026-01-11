import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          0: '#FFFFFF',  // white
          50: '#E6E5F4',   // Lightest blue-gray
          100: '#D9E2EC',  // Very light blue-gray
          200: '#C5D4E3',  // Light blue-gray
          300: '#A8B8CC',  // Light-medium blue-gray
          400: '#7A8FA8',  // Medium-light blue-gray
          500: '#5A6B7F',  // Base medium blue-gray
          600: '#4A5A6B',  // Medium-dark blue-gray
          700: '#3A4757',  // Dark blue-gray
          800: '#2A3442',  // Darker blue-gray
          900: '#1A2332',  // Darkest blue-gray
          1000: '#000000',  // black
        },
        primary: {
          DEFAULT: '#2A3442', // 800
          light: '#3A4757',   // 700
          dark: '#1A2332',    // 900
        },
        secondary: {
          DEFAULT: '#5A6B7F', // 500
          light: '#7A8FA8',   // 400
          dark: '#4A5A6B',    // 600
        },
        tertiary: {
          DEFAULT: '#A8B8CC', // 300
          light: '#C5D4E3',   // 200
          dark: '#7A8FA8',    // 400
        },
      },
      fontFamily: {
        geologica: ['Geologica Cursive', 'cursive'],
      },
    },
  },
  plugins: [
    typography,
    forms,
  ],
}
