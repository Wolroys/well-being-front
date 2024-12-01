/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flyonui/dist/js/*.js',
    '../path/to/fullcalendar/**/*.js'
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("flyonui"),
    require("flyonui/plugin")
  ],
  flyonui: {
    vendors: true
  }
}