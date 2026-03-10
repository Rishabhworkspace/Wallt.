/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ["DM Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
        display: ["Outfit", "sans-serif"],
      },
      colors: {
        accent: "#85C341",
        surface: "#141414",
        elevated: "#1E1E1E",
      },
      boxShadow: {
        'card': '0px 1px 3px rgba(0, 0, 0, 0.04), 0px 4px 12px rgba(0, 0, 0, 0.02)',
        'card-hover': '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 12px 32px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 48px 0 rgba(0, 0, 0, 0.06)',
      }
    }
  },
  plugins: [],
}
