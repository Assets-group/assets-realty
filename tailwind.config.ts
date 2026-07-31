import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14141A",
        maroon: "#730F10",
        rose: "#E63A56",
        gold: "#B08D57",
        paper: "#FFFFFF",
        ivory: "#FBFAF7",
        cream: "#F6F5F2",
        stone: "#EDE7DC",
        line: "rgba(20,20,26,0.10)",
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
