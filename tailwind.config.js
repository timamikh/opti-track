/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': '#FFFFFF',
        'text-highlight': '#FFFF00',
        'bg-primary': '#0E111B',
        'bg-secondary': '#FFFFFF',
        'accent': '#2A84D3',
        'input-button': '#181C28'
      },
      fontFamily: {
        'product': ['Orbitron', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
        'button': ['Roboto', 'sans-serif']
      },
      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px'
      }
    },
  },
  plugins: [],
} 