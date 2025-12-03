const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },

      borderRadius: {
        DEFAULT: "8px",
        secondary: "4px",
        container: "12px",
      },

      boxShadow: {
        DEFAULT: "0 1px 4px rgba(0,0,0,0.1)",
        hover: "0 2px 8px rgba(0,0,0,0.12)",
      },

      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
        },
        secondary: {
          DEFAULT: "#6B7280",
          hover: "#4B5563",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
        },
      },

      spacing: {
        "form-field": "16px",
        section: "32px",
      },

      /* ----------------------------------------
         KEYFRAMES
      ---------------------------------------- */
      keyframes: {
        /* Shine – Hero Overlay */
        shine: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "20%": { opacity: "0.25" },
          "50%": { opacity: "0.4" },
          "80%": { opacity: "0.25" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },

        /* Soft Floating */
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },

        /* Fade-Up für Cards */
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        /* ----------------------------------------
           Push-Forward für HOVER auf Cards
        ---------------------------------------- */
        "push-forward": {
          "0%": {
            transform: "scale(1) translateY(0)",
          },
          "60%": {
            transform: "scale(1.30) translateY(-8px)",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
          },
        },
      },

      /* ----------------------------------------
         ANIMATIONS
      ---------------------------------------- */
      animation: {
        shine: "shine 6s linear infinite",
        float: "float 5s ease-in-out infinite",
        "fade-up": "fade-up 650ms ease-out forwards",

        // Push-Forward NUR als kurzer Effekt (z.B. Hover)
        "push-forward": "push-forward 400ms cubic-bezier(.22,.61,.36,1) forwards",
      },
    },
  },

  variants: {
    extend: {
      boxShadow: ["hover", "active"],
    },
  },

  plugins: [],
};
