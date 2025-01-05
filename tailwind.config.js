/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#007AFF",
        backcolor: "#F1F0EE", 
      },
    },
  },
  plugins: [],
}