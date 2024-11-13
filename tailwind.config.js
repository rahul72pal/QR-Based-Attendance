/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        title: ["Kadwa", "sans-serif"], // Ensure 'Kadwa' is spelled correctly and includes a fallback
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1025px" },
        md: { max: "770px" },
        sm: { max: "639px" },
        esm: { max: "380px" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
