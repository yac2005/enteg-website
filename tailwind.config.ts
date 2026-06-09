import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#5A3A24",
          secondary: "#9A8A7B",
          beige: "#F5F0EB",
          text: "#2D2D2D",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Tajawal", "sans-serif"],
        heading: ["Montserrat", "Tajawal", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
