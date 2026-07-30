import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1B1F",
        maroon: "#730F10",
        rose: "#E63A56",
        paper: "#FFFFFF",
        cream: "#F6F5F2",
        line: "rgba(26,27,31,0.12)",
      },
      fontFamily: {
        sans: ["Tajawal", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
