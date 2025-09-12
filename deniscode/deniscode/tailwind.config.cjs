/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'reveal-x': {
          '0%':   { opacity: '0', 'clip-path': 'inset(0 100% 0 0)' },
          '100%': { opacity: '1', 'clip-path': 'inset(0 0 0 0)' }
        }
      },
      animation: {
        'reveal-x': 'reveal-x 900ms ease-out forwards'
      }
    }
  },
  plugins: []
}
