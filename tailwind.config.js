const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",flowbite.content(),],
  theme: {
    extend: {},
    colors: {
      'rose':'#f43f5e'
    },
  },
  plugins: [flowbite.plugin(),],
}

