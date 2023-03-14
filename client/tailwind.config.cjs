/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        'header2': '24px',
        'header5': '16px',
        'small-arian': '12px',
      },
      colors: {
        'agray-700': '#3E3E3E',
        'agray-600': '#6A6A6A',
        'agray-300': '#F5F5F5',
        'agray-500': '#919191',
        'agray-50': '#FAFAFA',
        'agray-200': '#F5F5F5',
        'primary': '#00C09F',
        'secondary': '#F12848',
        'gdark': '#080808',
        'light-green': 'rgba(0, 192, 159, 0.15)'
      },
      fontFamily: {
        'primary': ['Inter'],
      }
    }
  },
  plugins: []
};
