import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#FAFBFF",
          alt: "#F0F3FA",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          border: "#E4E8F5",
        },
        ink: {
          DEFAULT: "#0F1229",
          soft: "#5B6178",
        },
        brand: {
          indigo: "#4F5DFF",
          violet: "#7C3AED",
          cyan: "#22D3EE",
        },
        navy: {
          DEFAULT: "#0A0E17",
          light: "#151925",
        },
        accent: {
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #4F5DFF 0%, #7C3AED 50%, #22D3EE 100%)",
        "brand-gradient-soft": "linear-gradient(120deg, rgba(79,93,255,0.12) 0%, rgba(124,58,237,0.12) 50%, rgba(34,211,238,0.12) 100%)",
      },
      boxShadow: {
        glow: "0 8px 40px -8px rgba(79,93,255,0.35)",
        "glow-lg": "0 20px 60px -15px rgba(79,93,255,0.4)",
      },
      animation: {
        blob: "blob 12s infinite ease-in-out",
        "blob-delay": "blob 14s infinite ease-in-out 2s",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
