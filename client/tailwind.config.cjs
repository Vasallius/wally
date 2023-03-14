/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize:{
        'header2':'24px',
        'header5':'16px',
        'small-arian': '12px',
      },
      colors:{
        'agray-700': '#3E3E3E',
        'agray-600': '#6A6A6A'
      },
    }
  },
  plugins: []
};
