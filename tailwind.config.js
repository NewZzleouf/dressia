/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: { 50: '#faf8f3', 100: '#f5f0e6', 200: '#ede4d0', 300: '#e0d0b0', 400: '#c9b080', 500: '#b8965a' },
        sand: { 50: '#fdfcf9', 100: '#f9f6ef', 200: '#f0e9d8', 300: '#e4d5b8' },
        ink: { 900: '#0f0e0c', 800: '#1a1917', 700: '#252320', 600: '#3a3835', 500: '#5a5754', 400: '#7a7773', 300: '#9a9793' }
      }
    }
  },
  plugins: []
}
