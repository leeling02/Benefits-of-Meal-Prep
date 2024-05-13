/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    fontFamily: {
      'primary':["Poppins","sans-serif"],
      'secondary':["Poetsen One","sans-serif"],
      'pacific':["Pacifico","cursive"]

    },
    extend: {},
  },
  plugins: [require('daisyui'),],
}

