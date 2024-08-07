/* eslint-disable no-undef */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        color: {
          primary: "var(--background-color-primary)",
          secondary: "var(--background-color-secondary)",
          custom: "var(--background-color-custom)",
          button: "var(--button-color)",
          buttonHover: "var(--button-hover-color)",
        },
      },
      ringColor: {
        color: {
          buttonRing: "var(--button-hover-ring)",
        },
      },
      borderColor: {
        color: {
          border: "var( --border-color)",
        },
      },

      textColor: {
        color: {
          headerPrimary: "var(--text-header-primary)",
          headerSecondary: "var(--text-header-secondary)",
          text: "var(--text-color)",
          primary: "var(--text-color-primary)",
          secondary: "var(--text-color-secondary)",
        },
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
  },
  plugins: [],
});
