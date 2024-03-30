/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", ...fontFamily.sans],
        merriweather: ["var(--font-merriweather)", ...fontFamily.sans],
      },
      colors: {
        navy: "#102059",
        primary: {
          200: "#5c9cff",
          500: "#4b8eff",
          900: "#0366FF",
        },
        secondary: {
          100: "#9091A0",
          200: "#2d363a",
          500: "#313537",
          900: "#071522",
          50: "#07152280",
        },
        tertiary: {
          100: "#FEF7E0",
          200: "#FFEA9C",
          500: "#FFE275",
          900: "#FFD846",
        },
        quaternary: {
          100: "#959595",
          200: "#969696",
          500: "#808080",
          700: "#898989",
          800: "#464646",
          900: "#283848",
        },
        gray: {
          100: "#F9FAFA",
          200: "#F5F5F5",
          300: "#E9E9EB",
          400: "#CFD0D3",
          500: "#A9A9AC",
          600: "#797980",
          700: "#60626C",
          800: "#41454C",
          900: "#1E2229",
        },
        divider: {
          100: "#EBEBEB",
          200: "#E0E0E0",
        },
        blue: {
          100: "#659AEB",
        },
        silver: {
          100: "#F8F8F8",
        },
        bg: {
          100: "#EEEEEE",
          200: "#F1F8FF",
          300: "#EDF6FE",
          400: "#ECF3FF",
          500: "#F1F1F1",
          600: "#F3F8FF",
          700: "#F7F7F7",
        },
      },
      height: {
        "screen-90": "90vh",
        "screen-50": "50vh",
        "screen-60": "60vh",
        "screen-70": "70vh",
        "screen-80": "80vh",
        100: "30rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "screen-lg": "75rem",
      },
      minWidth: {
        4: "4rem",
        10: "10rem",
        20: "20rem",
        40: "40rem",
      },
      minHeight: {
        4: "4rem",
        10: "10rem",
        40: "40rem",
        "screen-70": "70vh",
        "screen-80": "80vh",
      },
      width: {
        "screen-xl": "35rem",
        "screen-md": "48rem",
        dropdown: "50rem",
        "screen-lg": "75rem",
      },
      boxShadow: {
        "3xl": "2px 3px 31px 2px rgba(0, 0, 0, 0.08)",
        "4xl":
          "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
        search: "rgb(102 54 27 / 18%) 0px 2px 2px",
        "quiz-sidebar": "inset -7px 0 9px -7px rgb(0 0 0 / 20%)",
        card: "4px 5px 5px 0px rgba(0, 0, 0, 0.05)",
      },
      gridTemplateColumns: {
        userInviteTable: "50fr 33fr 17fr",
      },
      screens: {
        tablet: "600px",
      },
    },
  },
  plugins: [],
  variants: {
    fill: ["hover", "focus"],
    extend: {
      animation: ["group-hover"],
    },
  },
};
