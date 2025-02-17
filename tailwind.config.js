/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          bronze: "#C6822A",
          sage: "#A9B388",
          sunflower: "#FFCE31",
          olive: "#5F7053",
        },
      },
    },
    plugins: [],
  }