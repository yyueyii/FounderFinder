/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],  
  theme: {
    extend: {
      colors: {
        darkBlue: '#4A0AFF',
        lightBlue: '#43B0FF',
        gray: '#E1E6E8',
      },
    },
  },
  plugins: [],
}

