/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fe5d00", // your orange
        dark: "#131314", // your main background
      },
    },
  },
  plugins: [],
};
