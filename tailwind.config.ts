import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* ── SonoPrep Brand Colors — Premium Palette ────────────────── */
      colors: {
        obsidian: "#0B0D10",
        charcoal: "#151A20",
        slate: "#1e2630",
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
          DEFAULT: "#ffffff",
          dim: "#c2bab0",
        },
        mist: "rgba(255, 255, 255, 0.04)",
        border: "rgba(255, 255, 255, 0.06)",

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

      /* ── Spacing — Editorial Scale ──────────────────────────────── */
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
        "26": "6.5rem",   /* 104px — section spacing */
        "28": "7rem",     /* 112px */
        "32": "8rem",     /* 128px */
        "36": "9rem",     /* 144px */
        "88": "22rem",
      },

      /* ── Shadows — Premium Depth ────────────────────────────────── */
      boxShadow: {
        glow: "0 0 40px rgba(200, 91, 58, 0.12)",
        "glow-lg": "0 0 60px rgba(200, 91, 58, 0.2)",
        card: "0 10px 30px rgba(0, 0, 0, 0.25)",
        "card-hover": "0 16px 40px rgba(0, 0, 0, 0.35)",
        "card-glow": "0 0 0 1px rgba(200,91,58,0.4), 0 10px 30px rgba(200,91,58,0.15)",
        "cta": "0 4px 20px rgba(200, 91, 58, 0.3)",
        "cta-hover": "0 8px 30px rgba(200, 91, 58, 0.4)",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },

      /* ── Border Radius — Subtle, not brutalist ──────────────────── */
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
