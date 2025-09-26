/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        // fundo dark menos agressivo (dracula-ish)
        surface: {
          900: '#0e0e12', // base
          800: '#14131a', // sutil variação
        },
        // seu roxo de marca
        brand: {
          300: '#9b84cf',
          500: '#7f48e4',
          700: '#4c2b89',
        },
        // acento frio (opcional p/ “code”)
        accent: {
          300: '#9ae6ff',
          500: '#7dd3fc',
        },
        // cor das linhas no dark
        gridline: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.10)',
        },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
