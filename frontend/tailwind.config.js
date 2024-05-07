/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "big-hero": "url(/src/assets/hero-3.png)",
      },
      background: {
        'underlay-1': 'linear-gradient(98deg,#d9ff00 -9.47%,#00a49d 65.47%)',
      }
    },
  },
  plugins: [],
}

