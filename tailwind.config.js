module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"],
        playfair: ['"Playfair Display"', "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        sparkle: "sparkle 2s linear infinite",
        "fade-in": "fadeIn 2s ease-in forwards",
        typing: "typing 3.5s steps(40, end)",
        "blink-caret": "blink-caret .75s step-end infinite",
        balloon: "balloon-float 5s ease-in-out infinite",
        twinkle: "twinkle 2.2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        "balloon-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(-4deg)" },
          "50%": { transform: "translateY(-28px) rotate(4deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.75)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        "glow-pulse": {
          "0%, 100%": { textShadow: "0 0 8px rgba(236,72,153,0.6)" },
          "50%": { textShadow: "0 0 24px rgba(236,72,153,1), 0 0 48px rgba(167,139,250,0.8)" },
        },
      },
    },
  },
  plugins: [],
};
