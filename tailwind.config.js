/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          'purple-darker': '#240115ff',
          'shine-2': '#de3c4bff',
          'shine-1': '#87f5fbff',
          'purple-dark': '#2f131eff',
          'light': '#cec3c1ff',
          'lighter': '#efe1de',
          'lightest': '#f2f2f2'
        },
      }
    },
  },
  plugins: [],
}

