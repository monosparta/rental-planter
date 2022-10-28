/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      desktop: { min: "1560px" },
      tablet: { min: "768px", max: "1559px" },
      phone: { min: "375px", max: "767px" },
    },
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
