/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and TypeScript files in the src directory
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: '#ff69b4', // Custom primary color
        secondary: '#d53f8c', // Custom secondary color
        accent: '#ed64a6', // Custom accent color
        dark: '#1a202c', // Custom dark mode background color
        light: '#f7fafc', // Custom light mode background color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family
      },
      spacing: {
        '128': '32rem', // Custom spacing value
        '144': '36rem', // Additional custom spacing value
      },
      borderRadius: {
        'xl': '1rem', // Custom border radius
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom light box shadow
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.6)', // Custom dark box shadow
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for better form styling
    require('@tailwindcss/typography'), // Plugin for better typography
    require('@tailwindcss/aspect-ratio'), // Plugin for aspect ratio utilities
    require('@tailwindcss/line-clamp'), // Plugin for line clamping utilities
  ],
}

