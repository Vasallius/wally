/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				header2: '24px',
				header5: '16px',
				'small-arian': '12px',
				'super-sm': '8px'
			},
			colors: {
				'agray-700': 'var(--agray-700)',
				'agray-600': 'var(--agray-600)',
				'agray-500': 'var(--agray-500)',
				'agray-400': 'var(--agray-400)',
				'agray-300': 'var(--agray-300)',
				'agray-200': 'var(--agray-200)',
				'agray-100': 'var(--agray-100)',
				'agray-50': 'var(--agray-50)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)',
				gdark: 'var(--gdark)',
				'light-green': 'rgba(0, 192, 159, 0.15)',
				'accent-green': 'var(--accent-green)',
				'accent-pink': 'var(--accent-pink)',
				'accent-blue': 'var(--accent-blue)',
				'accent-yellow': 'var(--accent-yellow)',
				'accent-violet': 'var(--accent-violet)'
			},
			fontFamily: {
				primary: ['Inter']
			}
		}
	},
	plugins: []
};
