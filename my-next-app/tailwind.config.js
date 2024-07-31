/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FCFCFC',
        complimentaryRed: '#EF4444',
        hoverRed: '#D62828',
        backgroundColor: '#FEF2F2',
        darkGray: '#5A5F70',
        offWhite: '#F3F3F3',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        secondary: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};