import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* ── SonoPrep Brand Colors ──────────────────────────────────── */
      colors: {
        /* Core palette — Clinical Authority */
        obsidian: "#0a0e14",
        charcoal: "#141a24",
        slate: "#1e2a3a",
        cobalt: "#1e3a5f",
        teal: {
          DEFAULT: "#0d9488",
          dim: "#0f766e",
          glow: "#14b8a6",
        },
        amber: {
          DEFAULT: "#f59e0b",
          dim: "#d97706",
        },
        cream: {
          DEFAULT: "#e8e4df",
          dim: "#a8a29e",
        },
        mist: "rgba(232, 228, 223, 0.08)",
        border: "rgba(232, 228, 223, 0.12)",

        /* Functional */
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
      },

      /* ── Typography ─────────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-display)", "'Playfair Display'", "Georgia", "serif"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "Consolas", "monospace"],
        body: ["var(--font-body)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },

      /* ── Spacing Scale ──────────────────────────────────────────── */
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
        "88": "22rem",
      },

      /* ── Shadows ────────────────────────────────────────────────── */
      boxShadow: {
        glow: "0 0 40px rgba(13, 148, 136, 0.15)",
        "glow-lg": "0 0 60px rgba(13, 148, 136, 0.25)",
        card: "0 4px 12px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.5)",
      },

      /* ── Animation & Transition ─────────────────────────────────── */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "wave-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "wave-scroll": "wave-scroll 6s linear infinite",
      },

      /* ── Border Radius ──────────────────────────────────────────── */
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
