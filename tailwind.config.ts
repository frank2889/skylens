import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand: deep teal — distinctive, trust-forward, not drone-industry orange/black.
        brand: {
          50: "#ECFBFB",
          100: "#CFF4F5",
          200: "#A2E8EB",
          300: "#6AD6DC",
          400: "#2FBCC6",
          500: "#119AAB",
          600: "#0D7E8C",
          700: "#106573",
          800: "#13525E",
          900: "#14454F",
          950: "#062A33",
        },
        ink: {
          DEFAULT: "#0B1620",
          soft: "#33414E",
          muted: "#5C6B79",
          faint: "#8595A2",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          soft: "#F4F8F9",
          tint: "#EAF3F4",
        },
        line: "#E1E9EB",
        signal: "#F4A23B", // warm accent, used sparingly (badges/highlights)
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,22,32,0.04), 0 8px 24px -12px rgba(11,22,32,0.14)",
        lift: "0 2px 4px rgba(11,22,32,0.05), 0 24px 48px -20px rgba(13,126,140,0.28)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        sweep: "sweep 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
