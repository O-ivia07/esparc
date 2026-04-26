import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B3B8C",
          50: "#EEF3FB",
          100: "#D4E0F3",
          200: "#A3BDE4",
          300: "#7298CF",
          400: "#3F6EB7",
          500: "#0B3B8C",
          600: "#0A3481",
          700: "#082966",
          800: "#061F4D",
          900: "#041634",
        },
        accent: {
          DEFAULT: "#F4A736",
          50: "#FEF5E7",
          100: "#FCE6C1",
          200: "#F9CF85",
          300: "#F7BB55",
          400: "#F4A736",
          500: "#DB8E1E",
          600: "#A76D17",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          soft: "#64748B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAF7",
          subtle: "#F4F5F1",
        },
        hairline: "rgb(15 23 42 / 0.08)",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        info: "#2563EB",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Instrument Sans", "Inter", "ui-sans-serif", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 1px 3px rgb(0 0 0 / 0.05), 0 8px 24px rgb(0 0 0 / 0.04)",
        hover: "0 2px 6px rgb(0 0 0 / 0.06), 0 14px 36px rgb(0 0 0 / 0.06)",
      },
      maxWidth: {
        content: "1440px",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 200ms ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
