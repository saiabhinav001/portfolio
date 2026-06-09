import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        inset: "rgb(var(--inset) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        canvas: "rgb(var(--diagram-canvas) / <alpha-value>)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
      },
      fontSize: {
        hero: [
          "clamp(2.25rem, 1.3rem + 4vw, 4.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em" },
        ],
        display: [
          "clamp(2.85rem, 1.1rem + 6.6vw, 6rem)",
          { lineHeight: "0.96", letterSpacing: "-0.035em" },
        ],
        headline: [
          "clamp(1.6rem, 1.05rem + 2.5vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        title: [
          "clamp(1.5rem, 1.1rem + 1.7vw, 2.35rem)",
          { lineHeight: "1.1", letterSpacing: "-0.018em" },
        ],
        lede: [
          "clamp(1.125rem, 0.95rem + 0.75vw, 1.5rem)",
          { lineHeight: "1.45", letterSpacing: "-0.01em" },
        ],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        prose: "68ch",
        shell: "82rem",
      },
      spacing: {
        section: "clamp(2rem, 0.5rem + 6vw, 8rem)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
