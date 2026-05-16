import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "trust-purple": "#a855f7",
        "trust-blue": "#3b82f6",
        "trust-glow": "rgba(168, 85, 247, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.6",
            boxShadow:
              "0 0 30px rgba(168, 85, 247, 0.35), 0 0 60px rgba(59, 130, 246, 0.2)",
          },
          "50%": {
            opacity: "1",
            boxShadow:
              "0 0 50px rgba(168, 85, 247, 0.55), 0 0 90px rgba(59, 130, 246, 0.35)",
          },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(6px, -8px)" },
          "66%": { transform: "translate(-4px, 6px)" },
        },
        "drift-slow-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(-8px, 5px)" },
          "66%": { transform: "translate(5px, -6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "drift-slow": "drift-slow 8s ease-in-out infinite",
        "drift-slow-2": "drift-slow-2 9s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
