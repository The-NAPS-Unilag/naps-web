/* eslint-disable no-undef */
// /** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const animate = require('tailwindcss-animate');
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      backgroundColor: {
        main: "#2561ED",
        main_grey: "#353535",
        text_grey: "#47484B"
      },
      colors: {
        main: "#2561ED",
        main_grey: "#353535",
        text_grey: "#47484B",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      fontFamily: {
        GeneralSans: ['"GeneralSans"', "sans-serif"],
        "GeneralSans-Italic": ['"GeneralSans-Italic"', "sans-serif"],
        "GeneralSans-Medium": ['"GeneralSans-Medium"', "sans-serif"],
        "GeneralSans-Semibold": ['"GeneralSans-Semibold"', "sans-serif"],
        "GeneralSans-Bold": ['"GeneralSans-Bold"', "sans-serif"]
      }
    }
  },
  plugins: [
    animate,
    plugin(({ addVariant, e }) => {
      addVariant('user-invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) =>
          `.${e(`user-invalid${separator}${className}`)}:user-invalid`
        )
      })
      addVariant('user-valid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) =>
          `.${e(`user-valid${separator}${className}`)}:user-valid`
        )
      })
    }),
  ],
};
