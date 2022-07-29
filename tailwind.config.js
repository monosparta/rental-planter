/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      desktop: { min: "769px", max: "1920px" },
      tablet: { min: "376px", max: "768px" },
      phone: { min: "375px", max: "375px" },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};