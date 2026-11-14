/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#253e32",
        forest: "#244733",
        moss: "#527452",
        leaf: "#dce8c6",
        cream: "#fcf8ed",
        sand: "#f3ebd8",
        honey: "#f4c854",
        marigold: "#e4a832",
        apricot: "#f8dec4",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: { soft: "0 24px 60px -30px rgba(36,71,51,.28)" },
    },
  },
  plugins: [],
};
