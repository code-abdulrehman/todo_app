/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",      // Deep blue (slate-900)
        secondary: "#1e293b",    // Slightly lighter blue (slate-800)
        tertiary: "#38bdf8",     // Sky blue (sky-400)
        accent: "#f59e42",       // Vibrant orange
        highlight: "#f472b6",
      },
    },
  },
  plugins: [],
}

