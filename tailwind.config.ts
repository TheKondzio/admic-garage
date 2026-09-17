import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // System kolorów marki ADMIC GARAGE — używaj TYCH tokenów zamiast np. bg-blue-600,
        // żeby zmiana koloru marki w jednym miejscu przełożyła się na całą stronę.
        ink: {
          950: "#0a0b0d", // tło główne (prawie czarne)
          900: "#111318", // tło sekcji / kart
          800: "#1a1d24",
          700: "#262a33",
          600: "#3a3f4b",
        },
        paper: {
          100: "#f5f6f7", // tekst podstawowy na ciemnym tle
          200: "#dde0e3", // stan hover dla tekstu drugorzędnego (Footer, Navbar)
          300: "#c7cbd1", // tekst drugorzędny
          400: "#a7abb4", // tekst drugorzędny, nieco stonowany
          500: "#8b909b", // tekst wyciszony / meta
          600: "#5f6470", // bardzo wyciszony — ikony placeholderów
        },
        accent: {
          DEFAULT: "#2f6fed", // niebieski akcent marki — jedyne miejsce do zmiany odcienia
          light: "#5b8ff9",
          dark: "#1f4fb8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        DEFAULT: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
