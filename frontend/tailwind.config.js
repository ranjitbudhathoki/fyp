/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'green-shadow': 'rgba(138, 216, 92, 0.4) 0px 7px 29px 0px',
      },
      gridTemplateColumns: {
        responsive: 'repeat(auto-fill,minmax(290px,1fr))',
        'responsive-remove': 'repeat(auto-fill,minmax(350px,1fr))',
      },
      colors: {
        'custom-light-dark': '#27292a',
        'custom-black': '#18191a',
        'dark-gray': '#333',
        'custom-light-green': '#e2b714',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
