/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Hahmlet'", "cursive"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(0.9) rotate(-3deg)" },
          "50%": { transform: "scale(1.1) rotate(3deg)" },
          "75%": { transform: "scale(0.9) rotate(-3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
