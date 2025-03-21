/** @type {import('tailwindcss').Config} */
export default {
  future: {
    useOkLch: false, // Disable OKLCH colors
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
