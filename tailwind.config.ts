import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141210",
        surface: "#1c1815",
        line: "#35302a",
        cream: "#ece5d6",
        "cream-dim": "#b8ac97",
        gold: "#c8a24c",
        "gold-dim": "#8a6a34",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        wrap: "1080px",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1400" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        rise: "rise 0.9s ease forwards",
        draw: "draw 1.6s cubic-bezier(0.2,0.7,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
